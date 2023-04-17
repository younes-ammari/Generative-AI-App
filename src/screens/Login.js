import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'


import { ActivityIndicator } from 'react-native'
import AppContext from '../hooks/useContext'
import { useColorScheme } from 'react-native'

export default function Login({navigation}) {

    const {
        setMode,
        mode, 
        setAppDataHandler,
        styleColors,
        appData,
    } = useContext(AppContext)

    // const styleColors = Colors[mode=="auto" ? useColorScheme() : mode]
    // const styleColors = Colors["light"]
    console.log('Login -> appData:', appData)

  
    
  return (
    <ScreenWrapper>
        
      <View 
        style={{
            flex:1,
            backgroundColor:styleColors.backgroundColor,
            // justifyContent:'center',
            alignItems:'center'
          }}
      >
        <Pressable style={{
            // paddingHorizontal:33,
            marginVertical:15,
            borderRadius:12,
            
            width:Dimensions.get('window').width*.5,
            backgroundColor:Colors.primary
        }}
        onPress={()=>{
            setAppDataHandler({
                mode:mode,
                user:{
                    name:'Mabrouk',
                }
            })
            navigation.navigate('TabNav', {appDatas: {appDatas:appData}});
            setTimeout(() => {
                
                navigation.navigate('Home', {appDatas: {appDatas:appData}});
            }, 100);
        
        }}
        >

            <Text style={[styles.title,{
                color:styleColors.lighter, 
                fontSize:18
            }]}>Home</Text>
        </Pressable>
        <Pressable style={{
            // paddingHorizontal:33,
            marginVertical:15,
            borderRadius:12,
            
            width:Dimensions.get('window').width*.5,
            backgroundColor:Colors.primary
        }}
        onPress={()=>{
            setMode(mode == 'light' ? 'dark' : 'light')
            // setMode('light')
            
        }}
        >

            <Text style={[styles.title,{
                color:styleColors.lighter, 
                fontSize:18
            }]}>Change Mode {mode}</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:17, 
    fontWeight:"400",
    color:Colors.darker,
    marginVertical:15,
    marginTop:22,
    textAlign:"center"

  },
  btn:{
    marginVertical:5,
    padding:9,
    paddingHorizontal:35,
    backgroundColor:"rgba(100, 100, 100, .2)"
  }
})
