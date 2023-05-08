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
  DrawerContentScrollView,
  DrawerItemList,
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
  ...props}) {
  
  const navigation = useNavigation();
  var status
  if (drawer){

    status  = useDrawerStatus()
  }


  
  const {
    displayMode, 
    loadAppDataHandler,
    setMode,
    styleColors,
    appData,
    visibleLogout, 
    setVisibleLogout,
    setAppDataHandler,
  } = useContext(AppContext)

  
  React.useEffect(()=>{
    // loadAppDataHandler();
    
  }, [])
  
  
  const deviceMode = useColorScheme()
    
  const mode =displayMode=="auto" ? deviceMode : displayMode
  
  
  const ModalView=()=>{

    return(
      <Modal
      backdropColor={"rgba(10, 10, 10, .6)"}
      // animationOut={"zoomOut"}
      animationOut={"pulse"}
      animationIn={"pulse"}
      animationOutTiming={10}
        // animationIn={"pulse"}
        isVisible={visibleLogout}
        onDismiss={()=>setVisibleLogout(false)}
      >
        <View style={{ 
          backgroundColor:styleColors.placeholder,
          padding:22,
          // paddingVertical:18,
          paddingBottom:15,
          borderRadius:9
        }}>
          <Text style={[styles.title, {color:styleColors.color, fontSize:15,}]}>
            Are you sure that you wanna delete your account?
          </Text>

          <View style={{
            flexDirection:'row',
            // backgroundColor:'red',
            marginTop:22,
            justifyContent:"space-evenly"
          }}>
            <CustomButton 
            // color={Colors.red}
            outlined 
            label={'Yes sure'} style={{flex:1 ,marginHorizontal:5, paddingVertical:11}}
            onPress={logoutHandler}
            />
            <CustomButton 
            // color={Colors.red}
            onPress={()=>{setVisibleLogout(false);console.log('pressed')}}
            label={'No'} style={{flex:1 ,marginHorizontal:5, paddingVertical:11}}/>
          </View>
        </View>
      </Modal>
    )
  }

  const logoutHandler=()=>{
    setVisibleLogout(false)
    setAppDataHandler({
      user:{
        name:''
      },
      mode:displayMode})
    navigation.navigate('Login')

  }

  // const styleColors = Colors[useColorScheme()]
  // var styleColors = Colors["dark"]
  const backgroundStyle = {
    
    backgroundColor: styleColors.backgroundColor,
  };

  const Tag = scroll ? ScrollView  : View
  const styleProp = scroll ? "contentContainerStyle" : "style"
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        // hidden
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        barStyle={'light-content'}
        // backgroundColor={Colors.primary}
      />
      <View style={{
        height:Dimensions.get('window').height*1,
        width:Dimensions.get('window').width,
        // paddingTop:back || title ? 5 : 0,

      }}>
        {ModalView()}
        <Tag  showsVerticalScrollIndicator={false} style={[{
          // flex:11,
          // backgroundColor:'green',
          paddingTop:!scroll&&fill ? 71 : 0,
          // paddingTop:55,
          // justifyContent:"flex-start",
          }, !scroll && {
            flex:1,
            justifyContent:"flex-start",
          }
            ]} contentContainerStyle={[scroll && {
              // backgroundColor:'red',
              // padding:555,
              paddingTop:fill ? 71 : 0,
              paddingBottom:71,
            }]}>

              {fill
              &&<View style={{
                width:"100%",
                backgroundColor:styleColors.backgroundColor,
                zIndex:1,
                position:"absolute",
                height:66,
                elevation:1,
              }}/>}
          
              {
                drawer
                &&
                <View style={{
                  zIndex:16,
                  height:44,
                  width:44,
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius:22,
                  position:"absolute",
                  left:10,
                  top:10,

                }}>
                  <Pressable style={{
                    padding:5,
                    height:44,
                    width:44,
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:12
                    
                  }}
                  android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}
                  onPress={()=>navigation.toggleDrawer()}
                  >
                    <Icon name="menu" size={29} color={drawerIconColor ? drawerIconColor : styleColors.header.backIconColor} />
                  </Pressable>
              </View>
              }

              {
                button
                &&
                <View style={{
                  zIndex:16,
                  minHeight:44,
                  minWidth:44,
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius:22,
                  position:"absolute",
                  right:10,
                  top:10,

                }}>
                    {button}
              </View>
              }

                {
                back
                &&
                  <Pressable style={{
                    padding:5,
                    height:44,
                    width:44,
                    top:10,
                    left:15,
                    position:"absolute",
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:12,
                    zIndex:22,
                  }}
                  android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}
                  onPress={()=>onBack ? onBack() : navigation.goBack()}
                  >
                    <Icon name="ios-arrow-back" size={28} color={backIconColor ? backIconColor : styleColors.header.backIconColor} />
                  </Pressable>
                }
            

            {
              title 
              &&
              <View style={{
                
                // flex:1,
                zIndex:5,
                top:17,
                left:65,
                position:"absolute",
                // top:10,
                // bottom:10,
                // paddingLeft:11,
                // alignSelf:"center",
                justifyContent:"center",
                flexDirection:icon ? "row" : undefined,
                alignItems: !back ? "center" : "flex-start",
              }}>
                {
                  icon 
                  &&
                  icon

                }
                <Text style={[styles.title, {color:styleColors.color}]}>{title}</Text>
              </View>  

            }
            

        

        

        {props.children}
        </Tag>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:21, 
    fontWeight:"400",
    textAlign:"center",
  },
})