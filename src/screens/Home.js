import { StyleSheet, Text, ScrollView, useColorScheme, Pressable, Image, ImageBackground, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Card from '../components/Card'
import CardImage from '../components/CardImage'
import CardNew from '../components/CardNew'
import Colors from '../constants/Colors'
import AppContext from '../hooks/useContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'

export default function Home({route, navigation}) {

    const {
        displayMode, 
        setMode,
        styleColors,
        appData,
    } = useContext(AppContext)

    const deviceMode = useColorScheme()


    const mode = displayMode=="auto" ? deviceMode : displayMode




    // const styleColors = Colors[mode]

    // console.log('appData', appData)
    useEffect(()=>{
        // !appData.user.name &&
        //     navigation.navigate('Login')
        
    }, [])



    // console.log('context > home => ', mode)

    // const {appDatas, ...otherparams} = route.params
    // console.log("appDatas", appDatas)
    // console.log("otherparams", otherparams)

    const images={
        chatGPT:{uri:"https://www.primelawgroup.com/wp-content/uploads/2023/02/chatgpt-icon.png"},
        ai:{uri:"https://www.pngmart.com/files/21/AI-PNG-Picture.png"}
    }
  return (
    <ScreenWrapper>

        
        
        <ScrollView contentContainerStyle={{
            // flex:1,
            backgroundColor:styleColors.backgroundColor,
            paddingBottom:85,
            paddingHorizontal:15
            }}>
                
                <View style={{
                  zIndex:16,
                  height:44,
                  width:44,
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius:22,
                  position:"absolute",
                  left:10,
                  top:10,

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
                  onPress={()=>navigation.toggleDrawer()}
                  >
                    <Ionicons name="menu" size={29} color={styleColors.header.backIconColor} />
                  </Pressable>
              </View>
              

                <View style={{
                    justifyContent:"center",
                    alignItems:"center",
                    marginTop:11,
                }}>
                    <View style={{
                        alignItems:"center",
                        borderRadius:16,
                        paddingHorizontal:33,
                        paddingVertical:7,
                        flexDirection:'row',
                        backgroundColor:"rgba(11, 84, 211, .2)",

                    }}>



                    <Text style={{
                        fontSize:23,
                        color:styleColors.color,
                        fontWeight:"600"
                    }}>Azo</Text>
                    <Text style={{
                        fontSize:23,
                        color:Colors.bleu,
                        fontWeight:"800",
                    }}>Bot </Text>
                    <Ionicons style={{marginHorizontal:5,}} name='md-ice-cream' color={styleColors.color} size={29} />
                    </View>
                </View>

                {/* <View style={{
                // width:"110%",
                // position:"absolute",
                // height:70,
                // marginBottom:22,
                height:111,
                // backgroundColor:`rgba(${Colors.rgb.primary}, .9)`,
                borderRadius:16,
                overflow:"hidden",

              }}>
                
              <Image 
                source={require("../images/drawerBackground.jpg")}
                resizeMode='cover'
                style={{
                //   opacity:.5,
                  width:'100%',
                  height:111,
                //   height:70,
                //   paddingBottom:85,
                //   flex:1,
                //   position:"absolute",


                }}
                />
                
              </View> */}


                <ImageBackground style={{
                    // flexDirection:'row',
                    alignItems:"center",
                    marginTop:15,
                    paddingVertical:15,
                    marginBottom:5,
                    borderRadius:12,
                    overflow:'hidden',
                    paddingVertical:33,
                    paddingHorizontal:11,
                    marginBottom:22,
                }} 
                imageStyle={{
                    opacity:.9
                }}
                source={require("../images/drawerBackground.jpg")}
                resizeMode='cover'
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
                    }}>{appData.user.name}! </Text>
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
                imageSource={require('../images/home/chatGPT.png')}
                onPress={()=>navigation.navigate("Chat")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Generate Image'
                subtitle='Create beautiful art and images with AI in different art styles quickl'
                imageSource={require('../images/home/imageGen.png')}
                onPress={()=>navigation.navigate("ImageGen")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='AI Voiceover Generator'
                subtitle='Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages'
                imageSource={require('../images/home/voiceGen.png')}
                onPress={()=>navigation.navigate("AIVoiceGen")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Content Creation'
                subtitle='Create different types of content – both long and short-form'
                imageSource={require('../images/home/contentGen.png')}
                onPress={()=>navigation.navigate("Home")}
                />
            <CardImage 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Video summarize'
                subtitle='Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.'
                imageSource={require('../images/home/summarize.png')}
                onPress={()=>navigation.navigate("Home")}
                />

            <Text style={{
                        fontSize:22,
                        color:styleColors.color,
                        fontWeight:"500",
                    }}>Added New </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                <CardNew 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Video summarize'
                subtitle='Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.'
                imageSource={require('../images/home/summarize.png')}
                onPress={()=>navigation.navigate("NewInfo", {
                    info:{
                        screen:"Home",
                        title:'Video summarize',
                        imageSource:require('../images/home/summarize.png'),
                        subtitle:'Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.',

                
                    }})}
                />
                <CardNew 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='AI Voiceover Generator'
                subtitle='Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages'
                imageSource={require('../images/home/voiceGen.png')}
                onPress={()=>navigation.navigate("NewInfo", {
                    info:{
                        screen:"AIVoiceGen",
                        title:'AI Voiceover Generator',
                        subtitle:'Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages',
                        imageSource:require('../images/home/voiceGen.png'),

                
                    }})}
                />
                <CardNew 
                color={styleColors.color}
                backgroundColor={Colors.primary}
                title='Generate Image'
                subtitle='Create beautiful art and images with AI in different art styles quickl'
                imageSource={require('../images/home/imageGen.png')}
                onPress={()=>navigation.navigate("NewInfo", {
                    info:{
                        screen:"ImageGen",
                        title:'Generate Image',
                        subtitle:'Create beautiful art and images with AI in different art styles quickl',
                        imageSource:require('../images/home/imageGen.png'),

                
                    }})}
                />


            </ScrollView>
            
        </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({})