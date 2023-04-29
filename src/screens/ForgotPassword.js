
import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
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


export default function ForgotPassword ({navigation}){

  
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setAppData

} = useContext(AppContext)

const deviceMode = useColorScheme()


const mode = displayMode=="auto" ? deviceMode : displayMode


const handleSendCode=()=>{
//   

  navigation.navigate("ResetCode")
}



  return (
    <ScreenWrapper back>
      <View style={{paddingHorizontal: 25,flex:1, paddingBottom:10}}>
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
          Forgot Password
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

        <View style={styles.buttonContainer}>
            <CustomButton label={"Send code"} onPress={handleSendCode} style={{
                marginTop:55,
            }}/>
        </View>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
    buttonContainer:{
        position:"absolute",
        bottom:22,
        width:'100%',
        alignSelf:"center",
    }
})
