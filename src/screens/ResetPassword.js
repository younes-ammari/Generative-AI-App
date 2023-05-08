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

import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ResetImage from '../images/reset.png';


import CustomButton from '../components/button/CustomButton';
import InputField from '../components/input/InputField';
import Colors from '../constants/theme/Colors';
import AppContext from '../hooks/useContext';
import ScreenWrapper from '../ScreenWrapper';


export default function ResetPassword ({navigation}){

  
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setAppData

} = useContext(AppContext)

const deviceMode = useColorScheme()


const mode = displayMode=="auto" ? deviceMode : displayMode

const [inputs, setInputs] = React.useState({password:"", confirmPassword:""})

const handleSave=()=>{
  setAppData({mode:displayMode,
    user:{
        name:'Mabrouk',
        coins:135
    }})

  navigation.navigate("DrawerNav")
  setTimeout(() => {
    
    navigation.navigate('Home')
  }, 20);
  
}


  console.log(inputs)
  return (
    <ScreenWrapper back onBack={()=>navigation.navigate('Login')}>
      <View style={{paddingHorizontal: 25, paddingBottom:15,}}>
        <View style={{alignItems: 'center'}}>
          
        <Image  
            source={ResetImage}
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
          Reset your Password
        </Text>

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
          onChangeText={text=>setInputs({...inputs, password:text})}
        />
        
        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color={styleColors.placeholderTextColor}
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          onChangeText={text=>setInputs({...inputs, confirmPassword:text})}
          // fieldButtonLabel={"Forgot?"}
          fieldButtonIcon={
            inputs.confirmPassword.length>7
            ?
            inputs.confirmPassword==inputs.password
            ?
            <Ionicons name='ios-checkmark-done-sharp' size={22} color={Colors.green} />
            :
            <Octicons name='x' size={22} color={Colors.red} />
            :
            <></>
          }
          // fieldButtonFunction={() => {navigation.navigate('ForgotPassword')}}
        />
        
        <CustomButton label={"Save"} onPress={handleSave} style={{marginTop:55}}/>

      </View>
    </ScreenWrapper>
  );
};
