import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'

import AppContext from '../hooks/useContext'

export default function Pay() {

  const {
    mode, 
    setMode,
    styleColors,
    appDatas,
} = useContext(AppContext)

// const styleColors = Colors[mode=="auto" ? useColorScheme() : mode]




  return (
    <ScreenWrapper title="Payment">
      {/* <Text style={[styles.title, {color:styleColors.color}]}>Payment</Text> */}
      
      <View 
        style={{
          flex:1,
          backgroundColor:styleColors.backgroundColor,
        }}
      ></View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:22, 
    fontWeight:"400",
    color:Colors.darker,
    marginVertical:15,
    marginTop:22,
    textAlign:"center"

  }
})