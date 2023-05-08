import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/theme/Colors'

import storage from '../hooks/useStorage'
import { ActivityIndicator } from 'react-native'
import AppContext from '../hooks/useContext'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


export default function AuthScreen({navigation}) {

    const [loading, setLoading] = useState(true)
    const [loadingAsync, setLoadingAsync] = useState(false)
    const [asyncData, setAsyncData] = useState({})
    
    const {
        appData,
        setAppData,
        displayMode,
        setMode,
        loadAppDataHandler,
        setAppDataHandler,
        styleColors,
    } = useContext(AppContext)

    // var styleColors = Colors[useColorScheme()]

    const deviceMode = useColorScheme()
    
    // const styleColors = Colors[displayMode=="auto" ? deviceMode : displayMode]
    
    
 
    const loadAsyncData=async()=>{
        setLoading(true)
        setLoadingAsync(true)

        storage
        .load({
            key: 'appData'
        })
        .then(ret => {
            // found data goes to then()
            console.log("(AuthScreen) => appData", ret, ret.mode);
            setAsyncData(ret)
            
              // console.log(asyncData.mode)
            ret.mode && setMode(ret.mode)
            setTimeout(() => {
              
              if (ret.user.name.length>2){
                setAppData(ret)
                navigation.navigate('DrawerNav', {appData: appData})
                
              } else {
                navigation.navigate('Login')
                
              }
            }, 1000);
              
            
            
            // console.warn("(AuthScreen) => ", err.message);
            
          })
          .catch(err => {
            // // setAsyncData({})
            // setAppData({})
            // setMode('auto')
            setAppData(appData)
            setMode('auto')
            setTimeout(() => {
              
              navigation.navigate('Login')
            }, 1000);
            
            // console.warn("(AuthScreen) => ", err.message);
        })
        .finally(()=>{
          setLoadingAsync(false)
          // setTimeout(() => {
            
            
            // try{
            //   // console.log(asyncData.mode)
            //   asyncData.mode && setMode(asyncData.mode)
            //   if (asyncData.user.name.length>2){
            //     setAppData(asyncData)
            //     navigation.navigate('DrawerNav', {appData: appData})

            //   } else {
            //     navigation.navigate('Login')

            //   }
              
            // }
            // catch (err){
            //   setAppData(appData)
            //   setMode('auto')
            //   navigation.navigate('Login')
              
            //   // console.warn("(AuthScreen) => ", err.message);

            // }
          // }, 2000);
          
        });
        
    };


    useEffect(()=>{

        loadAsyncData()
        
    }, [])




  if (loadingAsync) {
    
    console.log('loadingAsync')
    
    return(
      <></>
      )}
  
    
  return (
    <ScreenWrapper>
        
      <View 
        style={{
          flex:1,
          backgroundColor:styleColors.backgroundColor,
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        {
            loading
            &&
            <>
            <MaterialCommunityIcons name='robot' color={styleColors.color} size={77} />
            {/* <ActivityIndicator 
                color={styleColors.color}
                style={{
                  paddingVertical:15,
                }}
            /> */}
            {/* <Text style={[styles.title, {color:styleColors.color}]}>loading</Text> */}
            </>
        }
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

  }
})
