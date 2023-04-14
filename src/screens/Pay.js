import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'
import * as Vicon  from 'react-native-vector-icons'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import AppContext from '../hooks/useContext'

export default function Pay() {

  const {
    mode, 
    setMode,
    // styleColors,
    appDatas,
} = useContext(AppContext)

const styleColors = Colors[mode=="auto" ? useColorScheme() : mode]



  const Element=({
    title='Settings Title', 
    logout=false,
    icon=<Icon name='account' color={Colors.darker} size={22}/>,
    ...props
  })=>{

    return(
      <Pressable style={{
        width:'100%',
        paddingVertical:16,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:"center",
        // marginTop:logout ? 12 : 0
      }}
      android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}

      >
        {icon && icon}
        <Text style={{
          fontSize:18, 
          marginLeft:icon ? 11 : 0,
          fontWeight:"300",
          color:!logout ? Colors.darker : 'rgba(200, 15, 22, 1)',
        }}>{title}</Text>
      </Pressable>

    )
  }
  return (
    <ScreenWrapper>
      <Text style={[styles.title, {color:styleColors.color}]}>Payment</Text>
      
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