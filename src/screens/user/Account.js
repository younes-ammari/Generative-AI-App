import { Pressable, StyleSheet, Text, useColorScheme, ScrollView, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ScreenWrapper from '../ScreenWrapper'
import Colors from '../../constants/theme/Colors'
import AppContext from '../../hooks/useContext'
import { useKeyboard } from '../../hooks/useKeyboard'

import { CustomButton, InputField } from '../../components/Index';
import Layout from '../../constants/theme/Layout';

export default function Settings({ navigation }) {


  const Keyboard = useKeyboard()

  const {
    displayMode,
    styleColors,
    appData,

  } = useContext(AppContext)


    // Get Device Display Mode
  const deviceMode = useColorScheme()
  const mode = displayMode == "auto" ? deviceMode : displayMode

  const user = {
    displayName: appData.user.displayName,
    email: "mail@demo.com",
    password: "123456789"
  }

  const [userData, setUserData] = React.useState({
    displayName: appData.user.displayName,
    email: appData.user.email,
    password: "123456789"
  })


  const [buttonAction, setButtonAction] = React.useState('')
  const [show, setShow] = React.useState(false)
  const [visible, setVisible] = React.useState(false)


  const handleShow = () => {
    if (show == false) {

      setShow(true)
      console.log('show')
      setTimeout(() => {
        console.log('hide')
        setShow(false)

      }, 2500);
    }
    else {
      setShow(false)

    }
  }

  const ActionElement = ({ label, labelColor, ...props }) => {

    return (
      <Pressable style={{
        width: '100%',
        marginBottom: 2,
        paddingVertical: 12,
        backgroundColor: styleColors.backgroundColor,
        paddingHorizontal: 11,
        alignItems: "center",
        justifyContent: "center",
      }}
        android_ripple={{ color: styleColors.androidRippleColor }}
        {...props}
      >
        <Text style={{
          color: labelColor ? labelColor : styleColors.color,
          fontSize: Layout.font.h2,
        }}>{label}</Text>
      </Pressable>
    )
  }

  const ModalView = () => {

    return (
      <Modal
        animationOut={"pulse"}
        animationIn={"pulse"}
        animationOutTiming={10}
        isVisible={visible}
        onDismiss={() => setVisible(false)}
      >
        <View style={{
          backgroundColor: styleColors.placeholder,
          padding: 22,
          paddingBottom: 15,
          borderRadius: 9
        }}>
          <Text style={[styles.title, { color: styleColors.color, fontSize: Layout.font.h2, }]}>
            Are you sure that you wanna delete your account?
          </Text>

          <View style={{
            flexDirection: 'row',
            marginTop: 22,
            justifyContent: "space-evenly"
          }}>
            <CustomButton
              outline label={'Yes sure'} style={{ flex: 1, marginHorizontal: 5, paddingVertical: 11 }} />
            <CustomButton
              onPress={() => { setVisible(false); console.log('pressed') }}
              label={'No'} style={{ flex: 1, marginHorizontal: 5, paddingVertical: 11 }} />
          </View>
        </View>
      </Modal>
    )
  }

  const changed = !JSON.stringify(userData) === JSON.stringify(user);

  return (
    <ScreenWrapper fill drawer title="Account"
      button={
        <View>

          <TouchableOpacity
            style={{
              zIndex: 66,
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              paddingHorizontal: 8,
            }}
            onPress={() => { handleShow() }}
          >
            <MaterialCommunityIcons name={"dots-vertical"} size={22} color={mode == "dark" ? Colors.lighter : Colors.primary}
            />
          </TouchableOpacity>
          {
            show
            &&
            <View style={{
              position: "absolute",
              top: 41,
              right: 10,
              zIndex: 33,
              backgroundColor: 'red',
              minWidth: 120,
              width: 'auto',
              borderRadius: 4,
              backgroundColor: mode == "dark" ? styleColors.placeholderTextColor : styleColors.backgroundColor,
              elevation: 2,

            }}>
              <ActionElement label={"Feedback"} onPress={() => {

              }} />
              {/* <ActionElement label={""}/> */}
              <ActionElement label={"Delet account"} labelColor={'red'} onPress={() => {
                setShow(false)
                setVisible(true)

              }} />
            </View>
          }
        </View>

      }
    >
      {ModalView()}
      <Pressable
        onPress={() => setShow(false)}
        onLongPress={() => setShow(false)}
      >

        <ScrollView contentContainerStyle={{
          width: "100%",
          paddingHorizontal: 25,
          paddingBottom: 15,
        }}
        >


          <View
            style={{
              padding: 22,
              width: "auto",
              borderRadius: 9,
              backgroundColor: styleColors.placeholder,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                padding: 22,
                width: "auto",
                borderRadius: 55,
                backgroundColor: `rgba(${Colors.rgb.primary}, .2)`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={"person"} size={55} color={mode == "dark" ? Colors.lighter : Colors.primary} />
            </View>
          </View>


          <View style={{
            paddingTop: 15,

          }}>

            <Text style={{
              marginBottom: 12,
              fontSize: 17,
              textAlign: "center",
              color: styleColors.color
            }}>Full name</Text>

            <InputField
              disabled={true}
              value={userData.displayName}
              onChangeText={(text) => setUserData({ ...userData, displayName: text })}
              label={'Full Name'}
              icon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={styleColors.placeholderTextColor}
                  style={{ marginRight: 5 }}
                />
              }
            />

            <Text style={{
              marginBottom: 12,
              fontSize: 17,
              textAlign: "center",
              color: styleColors.color
            }}>Email</Text>

            <InputField
              disabled={true}
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
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


          </View>
          <View style={{ height: 95, bottom: 0 }} />

          <CustomButton label={"Save"} onPress={() => {
            console.log('check')
            console.log(JSON.stringify(userData) === JSON.stringify(user));
          }} />
          {
            JSON.stringify(userData) == JSON.stringify(user)
              ?
              <></>
              :
              <CustomButton label={"Cancel"} outline />
          }

          <View style={{
            height: Keyboard.isVisible ? Keyboard.height : 11
          }} />
        </ScrollView>
      </Pressable>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "400",
    color: Colors.darker,
    marginBottom: 15,
    textAlign: "center"

  }
})