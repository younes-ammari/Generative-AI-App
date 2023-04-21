import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'


import { ActivityIndicator } from 'react-native'
import AppContext from '../hooks/useContext'
import { useColorScheme } from 'react-native'

export default function Login({navigation}) {

  const deviceMode = useColorScheme()

    const {
        setMode,
        displayMode, 
        setAppDataHandler,
        styleColors,
        appData,
    } = useContext(AppContext)
    
    
    // const styleColors = Colors[displayMode=="auto" ? deviceMode : displayMode]
    
    


    // const styleColors = Colors["light"]
    // console.log('Login -> appData:', appData)

  
    
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
                mode:displayMode,
                user:{
                    name:'Mabrouk',
                }
            }, displayMode)
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
          let changeMode

          // console.log('mode', mode)
          switch (displayMode) {
            case "auto":
              changeMode = deviceMode== 'light' ? 'dark' : 'light'
              break
            case "dark":
              changeMode = 'light'
              break
            case "light":
              changeMode = 'dark'              
              break
          }

          // console.info('mode', displayMode, "changeMode", changeMode)

          // console.log('changeMode', changeMode, "deviceMode", deviceMode)

            // setMode(changeMode)
            // console.warn(setMode)
            var dd = appData
            dd['mode'] = changeMode
            // console.log('dd', dd)
            navigation.navigate("Mode")
            // setAppDataHandler()
            // setAppDataHandler(dd, changeMode)
            // setMode('light')
            
        }}
        >

            <Text style={[styles.title,{
                color:styleColors.lighter, 
                fontSize:18
            }]}>Change Mode {displayMode}</Text>
        </Pressable>
        {/* <Pressable style={{
            // paddingHorizontal:33,
            marginVertical:15,
            borderRadius:12,
            
            width:Dimensions.get('window').width*.5,
            backgroundColor:Colors.primary
        }}
        onPress={()=>{
            navigation.navigate('Voice');
            
        }}
        >

            <Text style={[styles.title,{
                color:styleColors.lighter, 
                fontSize:18
            }]}>Voice</Text>
        </Pressable>
        <Pressable style={{
            // paddingHorizontal:33,
            marginVertical:15,
            borderRadius:12,
            
            width:Dimensions.get('window').width*.5,
            backgroundColor:Colors.primary
        }}
        onPress={()=>{
            navigation.navigate('Rec');
            
        }}
        >

            <Text style={[styles.title,{
                color:styleColors.lighter, 
                fontSize:18
            }]}>Rec</Text>
        </Pressable> */}
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
