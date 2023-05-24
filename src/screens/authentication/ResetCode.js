
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  Pressable,
  useColorScheme,
} from 'react-native';


import PasswordImage from '../../assets/images/password.png';


import { CustomButton, OTPInput, CountDownTimer } from '../../components/Index';
import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';
import ScreenWrapper from '../ScreenWrapper';


export default function ResetCode({ navigation }) {


  const {
    displayMode,
    setMode,
    styleColors,
    appData,
    setAppData

  } = useContext(AppContext)

    // Get Device Display Mode
  const deviceMode = useColorScheme()


  const mode = displayMode == "auto" ? deviceMode : displayMode


  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [resendingTimes, setResendingTimes] = useState(0);
  const maximumCodeLength = 4;


  const handleResending = () => {
    setResendingTimes(resendingTimes + 1)

    if (resendingTimes < 4) {
      setIsResending(true)
      setTimeout(() => {
        setIsResending(false)
      }, 2000);
    }
    console.log('pressed setIsResending')
  }


  const handleSendCode = () => {
    // navigation.navigate("ResetCode");
    console.log('pressed new')
    navigation.navigate('ResetPassword')
  };

  // if (isFinished){
  //   setResendingTimes(0)
  // }



  return (
    <ScreenWrapper back>

      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ paddingHorizontal: 25, flex: 1 }}>
          <View style={{ alignItems: 'center' }}>

            <Image
              source={PasswordImage}
              style={styles.upperImage}
              resizeMethod="scale"
              resizeMode="contain"
            />
          </View>

          <Text
            style={[styles.title, {
              color: styleColors.color,
            }]}>
            Enter the code
          </Text>

          <Text style={styles.subTitle}>
            check your email you'll receive a code of 6-digits
          </Text>


          <OTPInput
            code={otpCode}
            setCode={setOTPCode}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
          />
          <Pressable style={styles.resendButton}

            onPress={handleResending}
            disabled={resendingTimes > 4 || isResending}
          >

            <Text style={styles.resendText}>
              {isResending ? "sending ..." : resendingTimes > 4 ? "waiting .." : `resend code (${4 - resendingTimes} tries)`}

            </Text>
            {
              resendingTimes > 4 &&
              <CountDownTimer secs={10} setFinished={state => { setIsFinished(state); if (state) setResendingTimes(0) }} />
            }
          </Pressable>

          <View style={styles.buttonContainer}>
            <CustomButton
              label={"Check"}
              onPress={handleSendCode}
              disabled={!isPinReady}
              style={{
                marginTop: 55,
                opacity: !isPinReady ? .5 : 1,
              }} />
          </View>

        </View>
      </Pressable>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  upperImage: {
    height: 222,
    width: 222,
    marginTop: 11,
  },
  subTitle: { color: '#666', marginBottom: 20 },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    opacity: .8,
    marginBottom: 5
  },
  resendText: {
    color: '#666',
    fontWeight: "500",
    textAlign: "center",
    marginEnd: 5,
  },
  resendButton: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",

  },
  buttonContainer: {
    position: "absolute",
    bottom: 22,
    width: '100%',
    alignSelf: "center",
  }
})
