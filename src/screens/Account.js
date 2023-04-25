import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'

import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import AppContext from '../hooks/useContext'

export default function Settings({navigation}) {
      
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setAppDataHandler,
    
  } = useContext(AppContext)


  const deviceMode = useColorScheme()
    
  // const styleColors = Colors[displayMode=="auto" ? deviceMode : displayMode]
  
  


  const logoutHandler=()=>{
    setAppDataHandler({
      user:{
        name:''
      },
      mode:displayMode})
    navigation.navigate('Login')

  }


  return (
    <ScreenWrapper title="Account">
      {/* <Text style={styles.title}>Settings</Text> */}
      
      
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