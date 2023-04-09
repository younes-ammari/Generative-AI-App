import { Dimensions, SafeAreaView, KeyboardAvoidingView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Colors from './constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ScreenWrapper(props) {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation()

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // backgroundColor: Colors.primary,
    backgroundColor: Colors.lighter,
  };
  

  const Tag = props.kav ? KeyboardAvoidingView : View
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        // hidden
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        barStyle={'light-content'}
        // backgroundColor={Colors.primary}
      />
      <View style={{
          // position:"absolute",
          left:11,
          right:11,
          top:21,
          paddingTop:17,
          // backgroundColor:'red',
          zIndex:12,
          width:Dimensions.get('window').width,
          alignSelf:"center",
          justifyContent:"center",
          alignItems:"center",
        
        }}
          >
        
      {
        props.back 
        &&
        <View style={{
          position:"absolute",
          left:11,
          // backgroundColor:"red",
          // padding:5,
          zIndex:11,
          alignItems:"center",
          justifyContent:"center",
          borderRadius:22,
          overflow:'hidden'

        }}>

        <Pressable style={{
          padding:5,
          borderRadius:22
          
        }}
        android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}
        onPress={()=>navigation.goBack()}
        >
          <Icon name="ios-arrow-back" size={28} color={Colors.primary} />
        </Pressable>
          </View>
      }

      {
        props.title 
        &&
        <View style={{
          
          position:"absolute",
          left:11,
          right:11,
          // top:15,
          // backgroundColor:"red",
          // padding:5,
          zIndex:11,
          alignItems:"center",
          justifyContent:"center",
        }}>
          <Text style={styles.title}>{props.title}</Text>
        </View>  
      }

      
      </View>
      <Tag style={{
        // flex:1, 
        backgroundColor:Colors.lighter,
        height:Dimensions.get('window').height*1,
        // minHeight:Dimensions.get('window').height*.98,
        // maxHeight:Dimensions.get('window').height*.9,
        width:Dimensions.get('window').width,
        // paddingBottom:22,
        paddingTop:props.back | props.title ? 45 : 0,
        // backgroundColor:'red',
        // marginTop:15,
        }}>

      {props.children}
      </Tag>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:21, 
    fontWeight:"400",
    color:Colors.darker,
    marginVertical:15,
    marginTop:22,
    textAlign:"center",
    // backgroundColor:'red',
    width:"100%",

  },
})