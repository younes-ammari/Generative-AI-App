import { Pressable, StyleSheet, Text, useColorScheme, ScrollView, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'

import Ionicons  from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppContext from '../hooks/useContext'
import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'
import { Picker } from '@react-native-picker/picker'
import { useKeyboard } from '../hooks/useKeyboard'
import Modal from "react-native-modal";


export default function Settings({navigation}) {


  const Keyboard = useKeyboard()
      
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setAppDataHandler,
    
  } = useContext(AppContext)


  const deviceMode = useColorScheme()
  const mode = displayMode=="auto" ? deviceMode : displayMode

  const user= {
    displayName:appData.user.displayName,
    email:"mail@demo.com",
    password:"123456789"
  }
    
  // const styleColors = Colors[displayMode=="auto" ? deviceMode : displayMode]
  
  const [userData, setUserData] = React.useState({
    displayName:appData.user.displayName,
    email:appData.user.email,
    password:"123456789"
  }) 


  const logoutHandler=()=>{
    setAppDataHandler({
      user:{
        name:''
      },
      mode:displayMode})
    navigation.navigate('Login')

  }
  const [buttonAction, setButtonAction]= React.useState('')
  const [show, setShow] = React.useState(false)
  const [visible, setVisible] = React.useState(false)


  const handleShow=()=>{
    if (show==false){

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

  const ActionElement=({label, labelColor, ...props})=>{

    return(
      <Pressable style={{
        width:'100%',
        marginBottom:2,
        paddingVertical:12,
        backgroundColor:styleColors.backgroundColor,
        paddingHorizontal:11,
        alignItems:"center",
        justifyContent:"center",
      }}
      android_ripple={{color:styleColors.androidRippleColor}}
      {...props}
      >
        <Text style={{
          color:labelColor? labelColor : styleColors.color,
          fontSize:15,
        }}>{label}</Text>
      </Pressable>
    )
  }

  const ModalView=()=>{

    return(
      <Modal
      animationOut={"pulse"}
        animationIn={"pulse"}
        animationOutTiming={10}
        isVisible={visible}
        onDismiss={()=>setVisible(false)}
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
            outline label={'Yes sure'} style={{flex:1 ,marginHorizontal:5, paddingVertical:11}}/>
            <CustomButton 
            // color={Colors.red}
            onPress={()=>{setVisible(false);console.log('pressed')}}
            label={'No'} style={{flex:1 ,marginHorizontal:5, paddingVertical:11}}/>
          </View>
        </View>
      </Modal>
    )
  }

  const changed = !JSON.stringify(userData)===JSON.stringify(user);
  // console.log(changed);
  // console.log(JSON.stringify(userData));
  // console.log(JSON.stringify(user));
  return (
    <ScreenWrapper fill drawer title="Account" 
    button={
      <View>

      <TouchableOpacity 
        style={{
          // position:'absolute',
          // right:15,
          // top:15,
          zIndex:66,
          alignItems:"center",
          // alignSelf:"center",
          justifyContent:"center",
          padding:4,
          paddingHorizontal:8,
          // backgroundColor:'red'
        }}
        // android_ripple={{color:styleColors.android_ripple}}
      onPress={()=>{handleShow()}}
      >
        <MaterialCommunityIcons name={"dots-vertical"}  size={22} color={ mode == "dark" ? Colors.lighter :Colors.primary}
          />
      </TouchableOpacity>
      {
        show
        &&
        <View style={{
          position:"absolute",
          top:41,
          right:10,
          zIndex:33,
          backgroundColor:'red',
          // paddingHorizontal:11,
          minWidth:120,
          width:'auto',
          borderRadius:4,
          // backgroundColor:styleColors.placeholderTextColor,
          backgroundColor:mode=="dark" ? styleColors.placeholderTextColor :  styleColors.backgroundColor,
          elevation:2,
          
        }}>
          <ActionElement label={"Feedback"} onPress={()=>{
            // setShow(false)
            // setVisible(true)
            
          }}/>
          {/* <ActionElement label={""}/> */}
          <ActionElement label={"Delet account"} labelColor={'red'} onPress={()=>{
            setShow(false)
            setVisible(true)
            
          }}/>
        </View>
      }
      </View>
      
    }
    >
      {ModalView()}
      <Pressable 
          onPress={()=>setShow(false)}
          onLongPress={()=>setShow(false)}
          >
 
        <ScrollView contentContainerStyle={{
          width:"100%",
          paddingHorizontal:25,
          paddingBottom:15,
          // backgroundColor:'red',
        }}
        >
          

        <View 
          style={{
            padding:22,
            width:"auto",
            // marginEnd:9,
            borderRadius:9,
            backgroundColor:styleColors.placeholder,
            // borderWidth:1,
            // borderColor:Colors.lighter,
            alignItems:"center",
            justifyContent:"center",
            // bottom:-5,
          }}
          >
        <View 
          style={{
            padding:22,
            width:"auto",
            // marginEnd:9,
            borderRadius:55,
            // backgroundColor:styleColors.placeholderTextColor,
            backgroundColor:`rgba(${Colors.rgb.primary}, .2)`,
            // borderWidth:1,
            // borderColor:Colors.lighter,
            alignItems:"center",
            justifyContent:"center",
            // bottom:-5,
          }}
          >
          <Ionicons name={"person"}  size={55} color={ mode == "dark" ? Colors.lighter :Colors.primary}/>
        </View>
        </View>


        <View style={{
          paddingTop:15,
          // backgroundColor:'red',

        }}>

          {/* <Text style={[styles.title ,{color:styleColors.color}]}>{appData.user.name}</Text> */}

          <Text style={{
            marginBottom:12,
            // marginTop:5,
            // fontWeight:"500",
            fontSize:17,
            textAlign:"center",
            color:styleColors.color
          }}>Full name</Text>

          <InputField
            value={userData.displayName}
            onChangeText={(text)=>setUserData({...userData, displayName:text})}
            label={'Full Name'}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color={styleColors.placeholderTextColor}
                style={{marginRight: 5}}
              />
            }
          />

          <Text style={{
            marginBottom:12,
            // marginTop:5,
            // fontWeight:"500",
            fontSize:17,
            textAlign:"center",
            color:styleColors.color
          }}>Email</Text>

          <InputField
            value={userData.email}
            onChangeText={(text)=>setUserData({...userData, email:text})}
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

          {/* <Text style={{
            marginBottom:12,
            // marginTop:5,
            // fontWeight:"500",
            fontSize:17,
            textAlign:"center",
            color:styleColors.color
          }}>Password</Text> */}

          {/* <InputField
            value={userData.password}
            onChangeText={(text)=>setUserData({...userData, password:text})}
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
          /> */}

          
        </View>
        <View style={{height:95,bottom:0}}/>

        <CustomButton label={"Save"} onPress={()=>{
          // console.log(JSON.stringify(userData));
          console.log('check')
          console.log(JSON.stringify(userData)===JSON.stringify(user));
          // !JSON.stringify(userData)===JSON.stringify(user)
          // console.log(changed);
          }}/>
        {
          JSON.stringify(userData)==JSON.stringify(user)
          ? 
          <></>
          :
          <CustomButton label={"Cancel"} outline/>
        }
        
        <View style={{
          height:Keyboard.isVisible ? Keyboard.height : 11
        }}/>
        </ScrollView>
      </Pressable>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:22, 
    fontWeight:"400",
    color:Colors.darker,
    // marginVertical:15,
    // marginTop:22,
    marginBottom:15,
    textAlign:"center"

  }
})