import { Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from '../../ScreenWrapper'
import Colors from '../../constants/Colors'

import AppContext from '../../hooks/useContext'
import { ScrollView } from 'react-native-gesture-handler'

export default function About({navigation}) {

    const {
        // mode, 
        styleColors,
        appData,
      } = useContext(AppContext)
    
    // const styleColors = Colors[mode=="auto" ? useColorScheme() : mode]
    
    

    var about =`
    Our application utilizes the latest advances in AI generative tools to bring you a revolutionary experience in natural language processing. Our tools, including ChatGPT and DALL-E, allow you to interact with a machine that can think and communicate in a way that was previously impossible.

    With ChatGPT, you can engage in natural language conversations with our chatbot that has been trained on vast amounts of data to understand context and provide meaningful responses. Whether you want to ask a question or just have a chat, our chatbot is always ready to engage in a conversation with you.

    DALL-E is another powerful tool that we use to generate stunning and unique images based on text input. By simply describing an object or a scene, DALL-E can generate a fully-realized image that looks like it was created by a human artist. With this tool, you can unleash your imagination and bring your ideas to life with stunning visuals.

    Our AI generative tools are constantly evolving, and we are always looking for ways to improve and expand our offerings. We believe that these tools have the potential to revolutionize the way we interact with machines and the world around us, and we are excited to be at the forefront of this new frontier.
    `

  return (
    <ScreenWrapper title="About">
        <View style={styles.conatiner}>

            {/* <Text style={styles.title}>Mode</Text> */}
                <ScrollView contentContainerStyle={styles.scroll}>
                  <Text style={[styles.about, {
                    color:styleColors.color
                  }]}>
                    {about} 
                  </Text>
                </ScrollView>
            {/* <Element title='Logout' logout/> */}
        </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:22, 
    fontWeight:"400",
    color:Colors.darker,
    marginVertical:15,
    marginTop:22,
    textAlign:"center",
    // backgroundColor:'red',
    // width:"100%",

  },
  about:{
    fontSize:15,
    textAlign:"justify",
    // fontWeight:"400",
    lineHeight:22,
    marginBottom:15,
    // overflow:"scroll",
    // backgroundColor:'red',
  },
  scroll:{
    paddingBottom:115,
    // backgroundColor:'red',

  },
  conatiner:{
    flex:1,
    padding:15,
    paddingVertical:8,
    // backgroundColor:'red',
},
flex:{
    flexDirection:'row',
},
center:{
    alignItems:"center",
},
sb:{
    justifyContent:"space-between",
},
sectionTitle:{
  fontSize:17,
//   opacity:.6,
  color:Colors.darker,
  marginTop:19,
  marginHorizontal:8,
//   paddingBottom:9,
//   textAlign:"center"
//   marginVertical:15
},
versionTitle:{
  fontSize:13,
//   opacity:.6,
  color:Colors.darker,
  marginTop:15,
  marginBottom:19,
  fontWeight:"400",
  textAlign:"center"
//   marginVertical:15
},
})