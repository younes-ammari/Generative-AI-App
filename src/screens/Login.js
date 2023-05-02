import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
  ActivityIndicator,
  StyleSheet
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


export default function Login ({navigation}){

  
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setAppData

  } = useContext(AppContext)

  const deviceMode = useColorScheme()


  const mode = displayMode=="auto" ? deviceMode : displayMode

  const [visibleLogin, setVisibleLogin] = useState(false)

  const [inputs, setInputs] = useState({
    email:"",
    password:""
  })
  const [errors, setErrors] = useState({
    email:"",
    password:""
  })


  
  const LoginModal=()=>{

    const styles = StyleSheet.create({
      title:{
        fontSize:21, 
        fontWeight:"400",
        textAlign:"center",
      },
      loadingContainer:{
        paddingVertical:22,
      }
    })

    return(
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
        onDismiss={()=>setVisibleLogin(false)}
      >
        <View style={{ 
          backgroundColor:styleColors.placeholder,
          padding:22,
          // paddingVertical:18,
          paddingBottom:15,
          borderRadius:9
        }}>
          <Text style={[styles.title, {color:styleColors.color, fontSize:15,}]}>
            Login in progress ...
          </Text>
          <Text style={[styles.title, {color:styleColors.color, fontSize:15,}]}>
            waite a while
          </Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={33} color={styleColors.color}/>
          </View>

        </View>
      </ReactNativeModal>
    )
  }

  const handleChecking=()=>{
    
    inputs.email.match(/\S+@\S+\.\S+/) && console.log('validEmail')
    inputs.password.length>7 && console.log('validPassword')
    
    if (inputs.email.match(/\S+@\S+\.\S+/)){
      if(inputs.password.length>7){
        //make Request
        console.log('login successfully')
        // return true
      } else{
        setErrors({...errors, password:"enter a valid password, must be at least 8 characters"})
      }
    } else{
      setErrors({...errors, email:"enter a valid email"})
    }
    console.log(errors)


    
  }

  const handleLogin=()=>{
    setAppData({mode:displayMode,
      user:{
          name:'Mabrouk',
          coins:135
      }})
    handleChecking()
    setVisibleLogin(true)
    setTimeout(() => {
      setErrors({
        email:"",
        password:""
      })
    }, 4000);
    
    
    setTimeout(() => {
      setVisibleLogin(false)
      
      
      navigation.navigate("TabNav")
      setTimeout(() => {
          navigation.navigate('Home')
        }, 20);
    }, 1000);
  
  }




  return (
    <ScreenWrapper>
      {LoginModal()}
      <View style={{paddingHorizontal: 25, paddingBottom:15,}}>
        <View style={{alignItems: 'center'}}>
          
        <Image  
            source={LoginImage}
            style={{
            height:222,
            width:222,
            marginTop:11,
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
            opacity:.8,
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
            style={{marginRight: 5}}
          />
          }
          onChangeText={text=>setInputs({...inputs, email:text})}
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
            style={{marginRight: 5}}
            />
          }
          onChangeText={text=>setInputs({...inputs, password:text})}
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {navigation.navigate('ForgotPassword')}}
        />
        
        <CustomButton label={"Login"} onPress={handleLogin} />

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: styleColors.placeholderTextColor,
              borderWidth: 2,
              borderRadius: 10,
              flex:1,
              alignItems:"center",
              justifyContent:"center",
              marginHorizontal:3,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
                <Image  
               source={GoogleImage}
               style={{
                height:22,
                width:22
               }}
               resizeMethod="scale"
               resizeMode="contain"
              />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: styleColors.placeholderTextColor,
              borderWidth: 2,
              borderRadius: 10,
              flex:1,
              alignItems:"center",
              justifyContent:"center",
              marginHorizontal:3,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image  
             source={FacebookImage}
             style={{
              height:22,
              width:22
             }}
             resizeMethod="scale"
             resizeMode="contain"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
              <Image  
               source={TwitterImage}
               style={{
                height:22,
                width:22
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
          <Text style={{color:styleColors.color}}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: Colors.primary, fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};
