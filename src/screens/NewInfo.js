import { Dimensions, useColorScheme, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'

import { useKeyboard } from '../hooks/useKeyboard'

import Icon from 'react-native-vector-icons/FontAwesome';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors'
import {useToast } from 'react-native-toast-notifications'
import AppContext from '../hooks/useContext'
import CustomButton from '../components/CustomButton';

export default function NewInfo({route, navigation}) {
    // let dirs = RNFetchBlob.fs.dirs
    
    const {info , ...otherparams} = route.params
    const toast = useToast();

    const { displayMode, styleColors} = React.useContext(AppContext)

    const deviceMode = useColorScheme()
    
    const mode = displayMode=="auto" ? deviceMode : displayMode
    
    
    const kb = useKeyboard();





  return (
      <ScreenWrapper back backIconColor={"white"} title={""}>
        <Image 
            source={info.imageSource}
            
            style={{
                width:"100%",
                height:180,
                zIndex:-1,
                borderBottomRightRadius:12,
                borderBottomLeftRadius:12,
            }}
        />
        <View style={{
            position:"absolute",
            width:"100%",
            height:180,
            borderBottomRightRadius:12,
            borderBottomLeftRadius:12,
            opacity:.6,
            backgroundColor:Colors.darker
        }}/>
        <View style={{

            paddingHorizontal:15,
        }}>


            <Text style={{
                fontSize:26,
                color:Colors.lighter,
                fontWeight:"500",
                top:-57,
            }}>{info.title}</Text>

    
            <Text style={{
                fontSize:22,
                lineHeight:33,
                color:styleColors.color,
                // fontWeight:"500",
                top:-22,
            }}>{info.subtitle}</Text>
        
        </View>


        <View style={{
            position:"absolute",
            bottom:10,
            width:"100%",
            paddingHorizontal:15
        }}>
            <CustomButton label='Try it now' onPress={()=>navigation.navigate(info.screen)}/>
        </View>
        

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    typingContainer:{
        zIndex:11,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"flex-end",
        paddingVertical:8,
        // width:'100%',
        height:'auto',
        // height:55,
        alignSelf:"center",
        borderRadius:16,
        paddingHorizontal:9,
        position:'absolute',
        bottom:40,

    },
    chatContainer:{
        flex:1,
        // height:Dimensions.get("window").height*.8,
    },
    titleContainer:{
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        paddingVertical:15,
        marginBottom:9,
        paddingBottom:13,
        // backgroundColor:Colors.primary,
    },
    title:{
        fontSize:18,
        // color:"#FFF",
        color:Colors.primary,
        fontWeight:"500"

    }
})