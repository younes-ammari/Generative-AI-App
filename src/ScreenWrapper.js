import { Dimensions, SafeAreaView, KeyboardAvoidingView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import Colors from './constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from './hooks/useContext';

export default function ScreenWrapper(props) {
  
  const navigation = useNavigation()


    
  const {
    mode, 
    setMode,
    styleColors,
    appData,
  } = useContext(AppContext)

  // const styleColors = Colors[mode=="auto" ? useColorScheme() : mode]

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // backgroundColor: Colors.primary,
    backgroundColor: styleColors.backgroundColor,
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
          marginTop:15,
          // backgroundColor:'red',
          zIndex:12,
          width:Dimensions.get('window').width,
          alignSelf:"center",
          alignItems:"center",
          flexDirection:'row',

          overflow:'visible'
        
        }}
          >
        
      {
        props.back 
        &&
        <View style={{
          // position:"absolute",
          left:11,
          zIndex:13,
          alignItems:"center",
          justifyContent:"center",
          borderRadius:22,
          overflow:'hidden'

        }}>

        <Pressable style={{
          padding:5,
          height:44,
          width:44,
          alignItems:"center",
          justifyContent:"center",
          borderRadius:12
          
        }}
        android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}
        onPress={()=>navigation.goBack()}
        >
          <Icon name="ios-arrow-back" size={28} color={styleColors.header.backIconColor} />
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
          flex:1,
          zIndex:11,
          alignItems:"center",
          justifyContent:"center",
        }}>
          <Text style={[styles.title, {color:styleColors.color}]}>{props.title}</Text>
        </View>  
      }

      
      </View>
      <Tag style={{
        height:Dimensions.get('window').height*1,
        width:Dimensions.get('window').width,
        paddingTop:props.back | props.title ? 9 : 0,
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
    textAlign:"center",

  },
})