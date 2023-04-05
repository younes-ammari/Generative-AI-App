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
    backgroundColor: Colors.primary,
  };
  

  const Tag = props.kav ? KeyboardAvoidingView : View
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        barStyle={'light-content'}
        // backgroundColor={Colors.primary}
      />
      {
        props.back 
        &&
        <View style={{
          position:"absolute",
          left:11,
          top:9,
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
      <Tag style={{
        // flex:1, 
        backgroundColor:Colors.lighter,
        height:Dimensions.get('window').height*1,
        // minHeight:Dimensions.get('window').height*.98,
        // maxHeight:Dimensions.get('window').height*.9,
        width:Dimensions.get('window').width,
        // paddingBottom:22,
        }}>

      {props.children}
      </Tag>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})