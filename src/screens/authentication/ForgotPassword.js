
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import PasswordImage from '../../images/password.png';

import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';
import ScreenWrapper from '../ScreenWrapper';
import { CustomButton, InputField } from '../../components/Index';


export default function ForgotPassword({ navigation }) {


  const {
    displayMode,
    setMode,
    styleColors,
    appData,
    setAppData

  } = useContext(AppContext)

  const deviceMode = useColorScheme()

  const [response, setResponse] = useState({
    message: "",
    details: "",
    error: false
  })

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")


  const mode = displayMode == "auto" ? deviceMode : displayMode

  const handleValidation = () => {

    if (email.match(/\S+@\S+\.\S+/)) {
      return true
    } else {
      setError("enter a valid email")
    }
    return false



  }
  const handleSendCode = () => {
    // setError('error')
    setTimeout(() => {
      setError('')
    }, 2000);
    //   
    if (handleValidation()) {
      auth()
        .sendPasswordResetEmail(email)
        .then((res) => {
          console.log('Password reset email sent successfully', res);
        })
        .catch((error) => {
          console.log(error);
        });

      // navigation.navigate("ResetCode")
    }
  }



  return (
    <ScreenWrapper back>
      <View style={{ paddingHorizontal: 25, flex: 1, paddingBottom: 10 }}>
        <View style={{ alignItems: 'center' }}>

          <Image
            source={PasswordImage}
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
          Forgot Password
        </Text>

        <InputField
          value={email}
          error={error}
          onChangeText={(text) => setEmail(text)}
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={styleColors.placeholderTextColor}
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <View style={styles.buttonContainer}>
          <CustomButton label={"Send code"} onPress={handleSendCode} style={{
            marginTop: 55,
          }} />
        </View>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 22,
    width: '100%',
    alignSelf: "center",
  }
})
