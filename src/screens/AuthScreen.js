import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'
import * as Vicon  from 'react-native-vector-icons'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import storage from '../hooks/useStorage'
import { ActivityIndicator } from 'react-native'
import AppContext from '../hooks/useContext'

export default function AuthScreen({navigation}) {

    const [loading, setLoading] = useState(true)
    
    const {
        appData,
        mode,
        loadAppDataHandler,
        setAppDataHandler,
        styleColors,
    } = useContext(AppContext)

        
    const loadAsyncData=async()=>{
        setLoading(true)
        storage
        .load({
            key: 'appData'
        })
        .then(ret => {
            // found data goes to then()
            console.log("(UserContext) => appData", ret);
            setAppData(ret)
            navigation.navigate('TabNav', {appData: appData})
            
            
        })
        .catch(err => {
            setAppData({})
            navigation.navigate('Login')
            // navigation.navigate('TabNav', {appData: appData})
            // any exception including data not found
            // goes to catch()
            // console.warn("(UserContext) => ", err.message);
            switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
            }
        });
        // setLoading(false)
    }


    useEffect(()=>{

        // loadAsyncData()
        loadAppDataHandler()
        setTimeout(() => {
            // setAppDataHandler({
            //     mode:mode,
            //     user:{
            //         name:'Mabrouk',
            //     }
            // })
            
            appData.user.name.length>2 ? navigation.navigate("TabNav") : navigation.navigate('Login')
        }, 1000);
    }, [loading])




  
    
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
            <ActivityIndicator 
                color={styleColors.color}
            />
            <Text style={[styles.title, {color:styleColors.color}]}>loading</Text>
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
