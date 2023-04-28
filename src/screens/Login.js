import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
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


const handleLogin=()=>{
  setAppData({mode:displayMode,
    user:{
        name:'Mabrouk',
    }})

  navigation.navigate("TabNav")
  setTimeout(() => {
    
    navigation.navigate('Home')
  }, 20);
  
}



  return (
    <ScreenWrapper>
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
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color={styleColors.placeholderTextColor}
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color={styleColors.placeholderTextColor}
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
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
