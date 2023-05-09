import { StyleSheet, Text, ScrollView, useColorScheme, Pressable, ImageBackground, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import CardImage from '../../components/cards/CardImage'
import CardNew from '../../components/cards/CardNew'
import Colors from '../../constants/theme/Colors'
import AppContext from '../../hooks/useContext'

import Ionicons from 'react-native-vector-icons/Ionicons'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Logo from '../../components/Logo'

export default function Home({route, navigation}) {

    const {
        styleColors,
        appData,
    } = useContext(AppContext)

    const deviceMode = useColorScheme()





    console.log('appData', appData)



    const images={
        chatGPT:{uri:"https://www.primelawgroup.com/wp-content/uploads/2023/02/chatgpt-icon.png"},
        ai:{uri:"https://www.pngmart.com/files/21/AI-PNG-Picture.png"}
    }
  return (
    <ScreenWrapper>

        
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

            <View style={styles.upperContainer}>

                
                  <Pressable style={styles.drawerButton}
                  android_ripple={{ color: styleColors.androideRippleColor }}
                  onPress={()=>navigation.toggleDrawer()}
                  >
                    <Ionicons name="menu" size={29} color={styleColors.header.backIconColor} />
                  </Pressable>
              

                    {/* <Logo /> */}
                <Pressable style={styles.coinsContainer}
                onPress={()=>navigation.navigate('Coins')}
                >
                    <Text style={[styles.coinsNumber, {color:styleColors.color}]}>{appData.user.coins}</Text>
                    <FontAwesome5 name={"coins"} size={20} color={styleColors.color} />
                </Pressable>
                </View>

                <ImageBackground style={{
                    // flexDirection:'row',
                    alignItems:"center",
                    marginTop:15,
                    borderRadius:14,
                    // backgroundColor:'red',
                    // width:"100%",
                    minHeight:111,
                    overflow:'hidden',
                    paddingVertical:33,
                    paddingHorizontal:11,
                    marginBottom:22,
                }} 
                imageStyle={{
                    overflow:'hidden',
                    opacity:.9
                }}
                source={require("../../images/drawerBackground.jpg")}
                resizeMode='cover'
                // resizeMethod="resize"
                // resizeMode="contain"
                >
                    
                    
                <View style={{
                    width:"100%",
                }}>
                    <View style={{
                        flexDirection:'row'
                    }}>


                    <Text style={{
                        fontSize:18,
                        color:Colors.lighter,
                        fontWeight:"400"
                    }}>Welcome </Text>
                    <Text style={{
                        fontSize:18,
                        color:Colors.lighter,
                        fontWeight:"600"
                    // }}>dd! </Text>
                    }}>{appData.user.displayName}! </Text>
                </View>
                    <Text style={{
                        fontSize:22,
                        color:Colors.lighter,
                        fontWeight:"500"
                    }}>Great to see you again </Text>
                </View>
            </ImageBackground>

            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='ChatGPT'
                subtitle='direct chat, anytime, lots of features '
                imageSource={require('../../images/home/chatGPT.png')}
                onPress={()=>navigation.navigate("Chat")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Generate Image'
                subtitle='Create beautiful art and images with AI in different art styles quickl'
                imageSource={require('../../images/home/imageGen.png')}
                onPress={()=>navigation.navigate("ImageGen")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='AI Voiceover Generator'
                subtitle='Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages'
                imageSource={require('../../images/home/voiceGen.png')}
                onPress={()=>navigation.navigate("VoiceGen")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Content Creation'
                subtitle='Create different types of content – both long and short-form'
                imageSource={require('../../images/home/contentGen.png')}
                onPress={()=>navigation.navigate("Content")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Video summarize'
                subtitle='Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.'
                imageSource={require('../../images/home/summarize.png')}
                onPress={()=>navigation.navigate("Video")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Generate Video'
                subtitle='Create AI-generated videos quickly using simple text'
                soon
                imageSource={require('../../images/home/videoGen.png')}
                // onPress={()=>navigation.navigate("")}
                />

            <Text style={{
                fontSize:22,
                color:styleColors.color,
                fontWeight:"500",
                marginTop:9,
            }}>Added New </Text>
            
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollNewContainer}>

                <CardNew 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Video summarize'
                subtitle='Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.'
                imageSource={require('../../images/home/summarize.png')}
                onPress={()=>navigation.navigate("NewInfo", {
                    info:{
                        screen:"Home",
                        title:'Video summarize',
                        imageSource:require('../../images/home/summarize.png'),
                        subtitle:'Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.',

                
                    }})}
                />
                <CardNew 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='AI Voiceover Generator'
                subtitle='Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages'
                imageSource={require('../../images/home/voiceGen.png')}
                onPress={()=>navigation.navigate("NewInfo", {
                    info:{
                        screen:"AIVoiceGen",
                        title:'AI Voiceover Generator',
                        subtitle:'Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages',
                        imageSource:require('../../images/home/voiceGen.png'),

                
                    }})}
                />
                <CardNew 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Generate Image'
                subtitle='Create beautiful art and images with AI in different art styles quickl'
                imageSource={require('../../images/home/imageGen.png')}
                onPress={()=>navigation.navigate("NewInfo", {
                    info:{
                        screen:"ImageGen",
                        title:'Generate Image',
                        subtitle:'Create beautiful art and images with AI in different art styles quickl',
                        imageSource:require('../../images/home/imageGen.png'),

                
                    }})}
                />


            </ScrollView>
            
        </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    scrollNewContainer:{
        paddingHorizontal:15,
    },
    scrollContainer:{
        paddingBottom:15,
    },
    container:{
        // paddingBottom:85,
        paddingHorizontal:15
    },
    upperContainer:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        // paddingBottom:5,
        paddingTop:9
    },
    drawerButton:{
        zIndex:16,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:22,
        // backgroundColor:'red',
        
    },
    coinsContainer:{
        justifyContent:"center",
        alignItems:'flex-end',
        alignSelf:"flex-end",
        flexDirection:'row',
    },
    coinsNumber:{
        fontSize:18,
        marginEnd:11,
        fontWeight:"500",

    }
})