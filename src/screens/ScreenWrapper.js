import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../constants/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../hooks/useContext';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";

import {
  useDrawerStatus,
} from '@react-navigation/drawer';
import CustomButton from '../components/button/CustomButton';


export default function ScreenWrapper({
  drawer,
  scroll,
  back,
  title,
  fill,
  onBack,
  icon,
  backIconColor,
  button,
  drawerIconColor,
  ...props }) {

  const navigation = useNavigation();
  var status
  if (drawer) {

    status = useDrawerStatus()
  }



  const {
    displayMode,
    styleColors,
    visibleLogout,
    setVisibleLogout,
    setAppDataHandler,
  } = useContext(AppContext)


  React.useEffect(() => {
    // loadAppDataHandler();

  }, [])


  // Get Device Display Mode
  const deviceMode = useColorScheme()

  const mode = displayMode == "auto" ? deviceMode : displayMode


  const ModalView = () => {


    return (
      <Modal
        backdropColor={"rgba(10, 10, 10, .6)"}
        animationOut={"pulse"}
        animationIn={"pulse"}
        animationOutTiming={10}
        isVisible={visibleLogout}
        onDismiss={() => setVisibleLogout(false)}
      >
        <View style={[styles.modalContainer, {
          backgroundColor: styleColors.placeholder,
        }]}>
          <Text style={[styles.title, { color: styleColors.color, fontSize: 15, }]}>
            Are you sure that you wanna delete your account?
          </Text>

          <View style={styles.modalButtons}>
            <CustomButton
              outlined
              label={'Yes sure'}
              style={styles.modalButton}
              onPress={logoutHandler}
            />
            <CustomButton
              onPress={() => { setVisibleLogout(false); console.log('pressed') }}
              label={'No'}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    )
  }

  const logoutHandler = () => {
    setVisibleLogout(false)
    setAppDataHandler({
      user: {
        name: ''
      },
      mode: displayMode
    })
    navigation.navigate('Login')

  }


  const backgroundStyle = {
    backgroundColor: styleColors.backgroundColor,
  };

  const Tag = scroll ? ScrollView : View



  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        {ModalView()}

        <Tag showsVerticalScrollIndicator={false} style={[{
          paddingTop: !scroll && fill ? 71 : 0,
        }, !scroll && {
          flex: 1,
          justifyContent: "flex-start",
        }
        ]} contentContainerStyle={[scroll && {
          paddingTop: fill ? 71 : 0,
          paddingBottom: 71,
        }]}>

          {
            fill && <View style={[styles.fillContainer, { backgroundColor: styleColors.backgroundColor }]} />
          }

          {
            drawer
            &&
            <View style={styles.drawerContainer}>
              <Pressable
                style={styles.drawerButton} android_ripple={{ color: styleColors.androideRippleColor }}
                onPress={() => navigation.toggleDrawer()}
              >
                <Icon name="menu" size={29} color={drawerIconColor ? drawerIconColor : styleColors.header.backIconColor} />
              </Pressable>
            </View>
          }

          {
            button
            &&
            <View style={styles.buttonContainer}>
              {button}
            </View>
          }

          {
            back
            &&
            <Pressable
              style={styles.backContainer} android_ripple={{ color: styleColors.androideRippleColor }}
              onPress={() => onBack ? onBack() : navigation.goBack()}
            >
              <Icon name="ios-arrow-back" size={28} color={backIconColor ? backIconColor : styleColors.header.backIconColor} />
            </Pressable>
          }


          {
            title
            &&
            <View style={[styles.titleContainer, {
              flexDirection: icon ? "row" : undefined,
              alignItems: !back ? "center" : "flex-start",
            }]}>
              {
                icon
                &&
                icon

              }
              <Text style={[styles.title, { color: styleColors.color }]}>{title}</Text>
            </View>

          }


          {props.children}
        </Tag>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  // Modal style
  modalContainer: {
    padding: 22,
    paddingBottom: 15,
    borderRadius: 9
  },

  modalButtons: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: "space-evenly"
  },

  modalButton: { flex: 1, marginHorizontal: 5, paddingVertical: 11 },
  container: {
    height: Dimensions.get('window').height * 1,
    width: Dimensions.get('window').width,

  },


  fillContainer: {
    width: "100%",
    zIndex: 1,
    position: "absolute",
    height: 66,
    elevation: 1,
  },
  titleContainer: {
    zIndex: 5,
    top: 17,
    left: 65,
    position: "absolute",
    justifyContent: "center",
  },
  backContainer: {
    padding: 5,
    height: 44,
    width: 44,
    top: 10,
    left: 15,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    zIndex: 22,
  },
  buttonContainer: {
    zIndex: 16,
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    position: "absolute",
    right: 10,
    top: 10,

  },
  drawerButton: {
    padding: 5,
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12

  },
  drawerContainer: {
    zIndex: 16,
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    position: "absolute",
    left: 10,
    top: 10,

  },
  title: {
    fontSize: 21,
    fontWeight: "400",
    textAlign: "center",
  },
})