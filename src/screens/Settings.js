import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'

import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import AppContext from '../hooks/useContext'

export default function Settings({navigation}) {
      
  const {
    mode, 
    setMode,
    styleColors,
    appData,
    setAppDataHandler,
    
  } = useContext(AppContext)

  // const styleColors = Colors[mode=="auto" ? useColorScheme() : mode]


  const logoutHandler=()=>{
    setAppDataHandler({
      user:{
        name:''
      },
      mode:mode})
    navigation.navigate('Login')

  }



  const Element=({
    title='Settings Title', 
    logout=false,
    icon=<Icon name='account' color={styleColors.color} size={22}/>,
    ...props
  })=>{

    return(
      <Pressable style={{
        width:'100%',
        paddingVertical:16,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:"center",
        marginTop:logout ? 12 : 0
      }}
      android_ripple={{ color: styleColors.androidRippleColor }}
      {...props}

      >
        {icon && icon}
        <Text style={{
          fontSize:18, 
          marginLeft:icon ? 11 : 0,
          fontWeight:"300",
          color:!logout ? styleColors.color : 'rgba(200, 15, 22, 1)',
        }}>{title}</Text>
      </Pressable>

    )
  }
  return (
    <ScreenWrapper title="Settings">
      {/* <Text style={styles.title}>Settings</Text> */}
      <Element title='Account' icon={
        <Icon name='account' size={22} color={styleColors.color}/>
      }/>
      <Element title='Dark mode'  icon={
        <Icon name='theme-light-dark' size={22} color={styleColors.color}/>
      }
      onPress={()=>navigation.navigate('Mode')}
      />
      {/* <Element title='Language' icon={
        <MIcon name='language' size={22} color={styleColors.color}/>
      }/> */}
      <Element title='About' icon={
        <Icon name='information' size={22} color={styleColors.color}/>
      }
      onPress={()=>navigation.navigate('About')}
      />

      <Element title='Logout' logout icon={
        <MIcon name='logout' size={22} color="rgba(200, 15, 22, 1)"
        />
      }
      onPress={logoutHandler}
      />
      {/* <Element title='Logout' logout/> */}
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