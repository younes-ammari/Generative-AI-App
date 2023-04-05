import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { Pressable } from 'react-native'

export default function Card({
    title='title',
    subtitle='subtitle',
    color=Colors.lighter,
    backgroundColor=Colors.primary,
    imageSource={uri:"https://www.primelawgroup.com/wp-content/uploads/2023/02/chatgpt-icon.png"},
    ...props
}) {

    
  return (
    <Pressable 
    
    style={({ pressed }) => [
        styles.container,
        {
            backgroundColor:backgroundColor,
            overflow:'hidden'
        //   backgroundColor: pressed ? '#ff7043' : '#ff8a65',
        },
      ]}
      android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}
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
            right:-55
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
            right:-2
        }}/>
        <View style={{
            flex:1,
            // alignItems:"center",
            justifyContent:"space-around"
        }}>
            <Text style={[styles.title, {color:color}]}>{title}</Text>
            <Text style={[styles.subtitle, {color:color}]}>{subtitle}</Text>
                    
        </View>
        <View style={{
            // maxWidth:"15%",
            height:58,
            width:60,
            backgroundColor:color,
            alignItems:"center",
            justifyContent:"center",
            overflow:"hidden",
            borderRadius:12
        }}>
            <Image 
            source={imageSource}
            style={{
                height:56,
                width:56,
            }}
            />

        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    subtitle:{
        fontWeight:"300",
        fontSize:15,
        letterSpacing:.81,
        color:Colors.lighter,
        maxWidth:"85%",
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
        backgroundColor:'red',
        minHeight:88,
        borderRadius:8,
        paddingVertical:11,
        paddingHorizontal:12,
        backgroundColor:Colors.primary,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        // minWidth:Dimensions.get('window').width*.8
        width:Dimensions.get('window').width*.95,
        alignSelf:"center",
        marginBottom:12,
    }
})