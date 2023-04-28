import { Dimensions, Image, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../constants/Colors'
import { Pressable } from 'react-native'
import AppContext from '../hooks/useContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function CardImage({
    title,
    subtitle,
    color=Colors.lighter,
    backgroundColor=Colors.primary,
    // imageSource={uri:"https://www.primelawgroup.com/wp-content/uploads/2023/02/chatgpt-icon.png"},
    imageSource=require('../images/home/chatGPT.png'),
    ...props
}) {

    const deviceMode = useColorScheme()

    const {styleColors, displayMode} = useContext(AppContext)


    const mode = displayMode=="auto" ? deviceMode : displayMode



    

    
  return (
    <Pressable 
    
    style={({ pressed }) => [
        styles.container,
        {
            // backgroundColor:backgroundColor,
            overflow:'hidden',
            borderWidth:1.4,
            borderRadius:12,
            borderColor:'rgba(100, 100, 100, .4)'

        //   backgroundColor: pressed ? '#ff7043' : '#ff8a65',
        },
      ]}
      android_ripple={{ color: mode=="dark"  ? 'rgba(100, 100, 100, .21)' : 'rgba(20, 20, 20, .1)' }}
      {...props}
    
      >

        <View style={{
            height:255,
            width:255,
            borderRadius:111,
            backgroundColor:Colors.lighter,
            opacity:.1,
            position:'absolute',
            zIndex:-1,
            top:-22,
            right:-55,
            opacity:mode=="dark" ? .02 : .1
        }}/>
        <View style={{
            height:177,
            width:177,
            borderRadius:111,
            backgroundColor:Colors.lighter,
            opacity:.1,
            position:'absolute',
            zIndex:-1,
            top:-92,
            right:-2,
            opacity:mode=="dark" ? .02 : .1
        }}/>
        <View style={{
            flex:1,
            // alignItems:"center",
            justifyContent:"space-around"
        }}>
            <Text style={[styles.title, {color:mode=="dark"  ? Colors.lighter : color}]}>{title}</Text>
            {subtitle&&<Text style={[styles.subtitle, {color:mode=="dark"  ? Colors.lighter : color}]}>{subtitle}</Text>}
                    
        </View>
        <View style={{
            // maxWidth:"15%",
            // height:58,
            // width:60,
            // backgroundColor:color,
            alignItems:"center",
            justifyContent:"center",
            overflow:"hidden",
            borderRadius:15,
            borderWidth:1.7,
            
            borderColor:styleColors.placeholderTextColor,
            borderColor:'rgba(100, 100, 100, .4)',
            // borderColor:styleColors.placeholder
        }}>
            <Image 
            source={imageSource}
            style={{
                height:56,
                width:56,
                borderRadius:12,
            }}
            />

        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    subtitle:{
        fontWeight:"300",
        fontSize:16,
        // letterSpacing:.81,
        color:Colors.lighter,
        maxWidth:"95%",
        opacity:.5,
        // backgroundColor:'red'
        
    },
    title:{
        fontWeight:"500",
        fontSize:18,
        letterSpacing:1,
        color:Colors.lighter

    },
    container:{
        width:'40%',
        minHeight:88,
        borderRadius:8,
        paddingVertical:11,
        paddingHorizontal:12,
        // backgroundColor:Colors.primary,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        // minWidth:Dimensions.get('window').width*.8
        width:Dimensions.get('window').width*.95,
        alignSelf:"center",
        marginBottom:12,
    }
})