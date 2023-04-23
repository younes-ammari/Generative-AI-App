import { Pressable, StyleSheet, Text, ScrollView, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'

import AppContext from '../hooks/useContext'

export default function Score() {

  
  
  const deviceMode = useColorScheme()

  const {styleColors, displayMode} = useContext(AppContext)


  const mode = displayMode=="auto" ? deviceMode : displayMode





  return (
    <ScreenWrapper scroll title="Score"> 
      
      <View 
        style={{
          flex:1,
          backgroundColor:styleColors.backgroundColor,
          backgroundColor:styleColors.red,
        }}
      >
        <Text></Text>

      </View>
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