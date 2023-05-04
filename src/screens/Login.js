import React, { useContext, useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import LoginImage from '../images/login.png';
import GoogleImage from '../images/google.png';
import FacebookImage from '../images/facebook.png';
import TwitterImage from '../images/twitter.png';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import Colors from '../constants/Colors';
import AppContext from '../hooks/useContext';
import ScreenWrapper from '../ScreenWrapper';
import ReactNativeModal from 'react-native-modal';

// import AuthContext
import { AuthContext } from '../navigation/AuthProvider';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';




export default function Login({ navigation }) {


  const { login, googleLogin, fbLogin } = useContext(AuthContext);


  const {
    displayMode,
    setMode,
    styleColors,
    appData,
    setAppData

  } = useContext(AppContext)

  const deviceMode = useColorScheme()


  const mode = displayMode == "auto" ? deviceMode : displayMode

  const [visibleLogin, setVisibleLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  const [response, setResponse] = useState({
    message: "",
    details: "",
    error: false
  })

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })



  const LoginModal = () => {

    const styles = StyleSheet.create({
      title: {
        fontSize: 21,
        fontWeight: "400",
        textAlign: "center",
      },
      loadingContainer: {
        paddingVertical: 22,
      }
    })

    return (
      <ReactNativeModal
        hasBackdrop
        hideModalContentWhileAnimating
        backdropColor={"rgba(10, 10, 10, .6)"}
        // animationOut={"zoomOut"}
        animationOut={"pulse"}
        animationIn={"pulse"}
        animationOutTiming={10}
        // animationIn={"pulse"}
        isVisible={visibleLogin}
        onDismiss={() => setVisibleLogin(false)}
      >
        <View style={{
          backgroundColor: styleColors.placeholder,
          padding: 22,
          // paddingVertical:18,
          paddingBottom: 15,
          borderRadius: 9,
          alignItems: "center",
          justifyContent: "center",
          height: Dimensions.get("window").height * .2,
        }}>
          <Text style={[styles.title, { color: styleColors.color, fontSize: 17, marginBottom: 7 }]}>
            {loading ? "Login in progress ..." : response.message}
          </Text>
          <Text style={[styles.title, { color: styleColors.color, fontSize: 14, }]}>
            {loading ? "waite a while" : String(response.error ? response.message : "")}
          </Text>
          {
            loading
            &&
            <>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={33} color={styleColors.color} />
              </View>
            </>
          }

        </View>
      </ReactNativeModal>
    )
  }

  const handleChecking = async () => {

    inputs.email.match(/\S+@\S+\.\S+/) && console.log('validEmail')
    inputs.password.length > 7 && console.log('validPassword')
    var email = inputs.email
    var password = inputs.password

    if (inputs.email.match(/\S+@\S+\.\S+/)) {
      if (inputs.password.length > 7) {
        //make Request
        setLoading(true)
        setVisibleLogin(true)
        try {
          if (email == '' || password == '') {
            // alert("Filling all fields are required ...")
            return
          }
          await auth().signInWithEmailAndPassword(email, password)
            .then(res => {
              setResponse({ message: "login successfully", error: false })
              console.info(res);
              var uid = res.user.uid;

              firestore().collection('users').doc(auth().currentUser.uid)
                .get()

                .then(res => {
                  // setResponse({ message: "register successfully", error: false })

                  console.info(res);
                  setAppData({
                    ...appData, user: {
                      displayName: res["_data"].displayName,
                      email: res["_data"].email,
                      coins:res["_data"].coins,
                      photoURL: res["_data"].userImg,
                      uid: uid,
                    }
                  })
                  navigation.navigate("TabNav")
                  setTimeout(() => {
                    navigation.navigate('Home')
                  }, 10)
                })




                /**
               * ensure we catch any errors at this stage to advise us if something does go wrong
               */
                .catch(error => {
                  // alert(error)
                  setResponse({ message: "Something went wrong with added user to firestore", details: error, error: true })

                  console.log('Something went wrong with added user to firestore: ', error);
                })

              
            })

            .catch(error => {
              // alert(error)
              setResponse({ message: "Something went wrong with Login", details: error, error: true })


              // console.log('Something went wrong with Login: ', error);
            });
        }
        catch (e) {
          // alert(e)
          console.log(e);
          setResponse({ message: "Something went wrong with Login", details: e, error: true })
        }

        setLoading(false)
        setTimeout(() => {

          setVisibleLogin(false)
        }, 1300);

        // console.log('login successfully')
        // return true
      } else {
        setErrors({ ...errors, password: "enter a valid password, must be at least 8 characters" })
      }
    } else {
      setErrors({ ...errors, email: "enter a valid email" })
    }
    console.log(errors)



  }

  const handleLogin = () => {
    setResponse({
      message: "",
      details: "",
      error: false
    })
    // setAppData({mode:displayMode,
    //   user:{
    //       name:'Mabrouk',
    //       coins:135
    //   }})

    handleChecking()
    setTimeout(() => {
      setErrors({
        email: "",
        password: ""
      })
    }, 4000);


    // setTimeout(() => {
    //   setVisibleLogin(false)


    //   navigation.navigate("TabNav")
    //   setTimeout(() => {
    //       navigation.navigate('Home')
    //     }, 20);
    // }, 1000);

  };

  




  return (
    <ScreenWrapper>
      {LoginModal()}
      <View style={{ paddingHorizontal: 25, paddingBottom: 15, }}>
        <View style={{ alignItems: 'center' }}>

          <Image
            source={LoginImage}
            style={{
              height: 222,
              width: 222,
              marginTop: 11,
            }}
            resizeMethod="scale"
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: styleColors.color,
            opacity: .8,
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          error={errors.email}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={styleColors.placeholderTextColor}
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={text => setInputs({ ...inputs, email: text })}
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          error={errors.password}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color={styleColors.placeholderTextColor}
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={text => setInputs({ ...inputs, password: text })}
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { navigation.navigate('ForgotPassword') }}
        />

        <CustomButton label={"Login"} onPress={handleLogin} />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('WebViewer', {url:"google.com"})}}
            style={{
              borderColor: styleColors.placeholderTextColor,
              borderWidth: 2,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 3,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image
              source={GoogleImage}
              style={{
                height: 22,
                width: 22
              }}
              resizeMethod="scale"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: styleColors.placeholderTextColor,
              borderWidth: 2,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 3,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image
              source={FacebookImage}
              style={{
                height: 22,
                width: 22
              }}
              resizeMethod="scale"
              resizeMode="contain"
            />
          </TouchableOpacity>
          
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{ color: styleColors.color }}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ color: Colors.primary, fontWeight: '700' }}> Sign up</Text>
          </TouchableOpacity>
        </View>
      
      </View>
    </ScreenWrapper>
  );
};
