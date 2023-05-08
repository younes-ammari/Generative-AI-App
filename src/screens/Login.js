import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import LoginImage from '../images/login.png';
import GoogleImage from '../images/google.png';
import FacebookImage from '../images/facebook.png';
import TwitterImage from '../images/twitter.png';

import CustomButton from '../components/button/CustomButton';
import InputField from '../components/input/InputField';
import Colors from '../constants/theme/Colors';
import AppContext from '../hooks/useContext';
import ScreenWrapper from '../ScreenWrapper';
import ReactNativeModal from 'react-native-modal';

// import AuthContext
import { AuthContext } from '../navigation/AuthProvider';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';




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
  const [hasBack, setHasBack] = useState(false)

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


  useEffect(() => {
    setInputs({
      email: "",
      password: ""
    })
    setVisibleLogin(false)

  }, [])



  const LoginModal = () => {

    const styles = StyleSheet.create({
      title: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 7
      },
      subTitle: {
        fontSize: 15,
        fontWeight: "400",
        textAlign: "center",
      },
      loadingContainer: {
        paddingVertical: 22,
      },
      container: {
        padding: 22,
        // paddingVertical:18,
        paddingBottom: 0,
        borderRadius: 9,
        // alignItems: "center",
        justifyContent: "center",
        // height: Dimensions.get("window").height * .3,
        width: Dimensions.get("window").width * .9,
        alignSelf: "center",

      }
    })

    return (
      <ReactNativeModal
        hasBackdrop
        hideModalContentWhileAnimating
        backdropColor={"rgba(10, 10, 10, .6)"}
        animationOut={"pulse"}
        animationIn={"pulse"}
        animationOutTiming={10}
        isVisible={visibleLogin}
        onDismiss={() => setVisibleLogin(false)}
      >
        <View style={[styles.container, {
          backgroundColor: styleColors.placeholder,
        }]}>
          <Text style={[styles.title, { color: styleColors.color, }]}>
            {loading ? "Login in progress ..." : response.message}
          </Text>
          <Text style={[styles.subTitle, { color: styleColors.color }]}>
            {loading ? "waite a while" : String(response.error ? response.details : "")}
          </Text>
          <View style={styles.loadingContainer}>
            {
              loading
                ?
                <ActivityIndicator size={33} color={styleColors.color} />
                :
                // <View>

                response.error &&
                <>
                  {
                    response.goRegister &&
                    <CustomButton noFill labelColor={Colors.primary} style={{ marginBottom: 0, width: "100%", paddingVertical: 11, }} label={"Signup now"} onPress={() => { setVisibleLogin(false); navigation.navigate('Signup'); }} />
                  }
                  <CustomButton noFill labelColor={styleColors.red} style={{ marginBottom: 0, width: "100%", paddingVertical: 11, }} label={"back"} onPress={() => setVisibleLogin(false)} />
                </>
              // </View>
            }
          </View>

        </View>
      </ReactNativeModal>
    )
  }

  const handleLogin = async () => {

    setTimeout(() => {
      setErrors({
        email: "",
        password: ""
      })
    }, 4000);
    console.log("login ");


    if (handleValidation()) {
      setLoading(true)
      setVisibleLogin(true)

      setResponse({
        message: "",
        details: "",
        error: false
      })

      var email = inputs.email
      var password = inputs.password

      //make Request
      try {
        if (email == '' || password == '') {
          // alert("Filling all fields are required ...")
          return
        }
        await auth().signInWithEmailAndPassword(email, password)
          .then(res => {
            // setResponse({ message: "login successfully", error: false })
            console.info(res);
            var uid = res.user.uid;

            firestore().collection('users').doc(auth().currentUser.uid)
              .get()

              .then(res => {
                setResponse({ message: "login successfully", error: false })

                console.info(res);
                setAppData({
                  ...appData, user: {
                    displayName: res["_data"].displayName,
                    email: res["_data"].email,
                    coins: res["_data"].coins,
                    photoURL: res["_data"].photoURL,
                    uid: uid,
                  }
                })
                navigation.navigate("DrawerNav")
                setTimeout(() => {
                  navigation.navigate('Home')
                }, 10)
              })
              .finally(() => {
                setLoading(false)
                setVisibleLogin(false)

              })




              /**
             * ensure we catch any errors at this stage to advise us if something does go wrong
             */
              .catch(error => {
                // alert(error)
                const errorMessage = error.message.split('] ')[1];
                setResponse({ message: "Something went wrong with added user to firestore", details: error, error: true })

                console.log('Something went wrong with added user to firestore: ', error);
              })


          })

          .catch(error => {
            // alert(error)
            // console.log(error)
            const errorMessage = error.message.split('] ')[1];
            console.log(error.message)
            setResponse({ message: "Something went wrong with Login", details: errorMessage, error: true })

            setLoading(false)
            return


            // console.log('Something went wrong with Login: ', error);
          });
      }
      catch (e) {
        // alert(e)
        console.log(e);
        const errorMessage = error.message.split('] ')[1];
        setResponse({ message: "Something went wrong with Login", details: errorMessage, error: true })
        setLoading(false)
        return
      }
      ;


    }


    // setTimeout(() => {
    //   setVisibleLogin(false)


    //   navigation.navigate("DrawerNav")
    //   setTimeout(() => {
    //       navigation.navigate('Home')
    //     }, 20);
    // }, 1000);





  }

  const handleValidation = () => {

    if (inputs.email.match(/\S+@\S+\.\S+/)) {
      if (inputs.password.length > 7) {
        return true
      } else {
        setErrors({ ...errors, password: "enter a valid password, must be at least 8 characters" })
      }
    } else {
      setErrors({ ...errors, email: "enter a valid email" })
    }
    return false



  }




  async function handleGoogleLogin() {
    try {
      // Sign out of Google
      await GoogleSignin.signOut();
      auth().currentUser && await auth().signOut()
      console.log('try')
      /**
     * Getting the users ID token
     */
      const { idToken, user } = await GoogleSignin.signIn();

      setLoading(true)
      setVisibleLogin(true)
      setResponse({ message: "logging in progress", error: false })
      // console.log('googleCredential', googleCredential)
      console.log('user', user)


      // Check if the user is present in a specific Firestore collection

      const email = user.email;
      // Perform a query to find the user with the given email
      firestore().collection('users').where('email', '==', email)
        .get()
        .then(snapshot => {
          // console.log(snapshot)




          // Check if any documents were returned
          if (snapshot.empty) {
            console.log('No user found with email:', email);
            setLoading(false)
            setResponse({ message: "Login Failed!", details: user.name + " you're not registred yet, try to register", error: true, goRegister: true })
          } else {
            const userdata = snapshot["_docs"][0]["_data"]
            console.log(userdata)
            console.log('User found with email:', email);

            setResponse({ message: "login successfully", error: false })

            setAppData({
              ...appData, user: {
                displayName: userdata.displayName,
                email: userdata.email,
                coins: userdata.coins,
                photoURL: userdata.photoURL,
                uid: userdata.uid,
              }
            })
            navigation.navigate("DrawerNav")
            setTimeout(() => {
              navigation.navigate('Home')
            }, 10)
            setLoading(false)
            setVisibleLogin(false)
          }
        })


      // const userRef = firestore().collection('users').get({ email: email });
      // const userDoc = await userRef.get();

      // if (userDoc.exists) {
      //   console.log("firestore", true)
      //   // The user is present in the Firestore collection
      //   // Do something with the user data
      // } else {
      //   console.log("firestore", false)
      //   // The user is not present in the Firestore collection
      //   // Handle the case where the user is not authorized to access your app
      // }

      /**
     * Sign-in the user with the credential
     */

      // const userEmail = user.email
      // const data = firestore().collection('users').doc(auth().currentUser.uid)

      // console.log("firestore", data)



    } catch (error) {
      console.log('catch')
      alert(error)
      console.log({ error });
    }



  }

  return (
    <ScreenWrapper>
      {LoginModal()}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 15, }}
      >
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
            onPress={handleGoogleLogin}
            style={{
              borderColor: styleColors.placeholderTextColor,
              borderWidth: 2,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: 'row',
              marginHorizontal: 3,
              paddingHorizontal: 30,
              paddingVertical: 15,
            }}>
            <Text style={{ color: styleColors.color }}>Login with google   </Text>
            <Image
              source={GoogleImage}
              style={{
                height: 19,
                width: 19
              }}
              resizeMethod="scale"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}

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

      </ScrollView>
    </ScreenWrapper>
  );
};
