import { StyleSheet, Text, ScrollView, useColorScheme, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Card from '../components/Card'
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
            }}>

                <View style={{
                    // position:"absolute",
                    // top:19,
                    // right:5,
                    // left:5,
                    justifyContent:"center",
                    alignItems:"center",
                    marginTop:11,
                    // width:"100%",
                }}>
                    <View style={{
                        alignItems:"center",
                        borderRadius:16,
                        paddingHorizontal:33,
                        paddingVertical:7,
                        flexDirection:'row',
                        backgroundColor:"rgba(11, 84, 211, .2)",
                        // backgroundColor:Colors.bleu,

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
                        // marginRight:15,
                    }}>Bot </Text>
                    <Ionicons style={{marginHorizontal:5,}} name='md-ice-cream' color={styleColors.color} size={29} />
                    {/* <MaterialCommunityIcons style={{marginHorizontal:5,}} name='robot' color={styleColors.color} size={29} /> */}
                    </View>
                    {/* <Logo size={55}/> */}
                </View>


                <View style={{
                    flexDirection:'row',
                    alignItems:"center",
                    marginTop:33,
                    paddingVertical:15,
                    marginBottom:30,
                    // paddingHorizontal:15,
                }}>
                    {/* <MaterialCommunityIcons name='robot' color={styleColors.color} size={51} /> */}
                    
                <View style={{
                    width:"100%",
                    // minHeight:66,
                    // backgroundColor:'red',
                    // paddingVertical:11,
                    // marginTop:11,
                    paddingHorizontal:15,
                }}>
                    <View style={{
                        flexDirection:'row'
                    }}>


                    <Text style={{
                        fontSize:18,
                        color:styleColors.color,
                        fontWeight:"400"
                    }}>Welcome </Text>
                    <Text style={{
                        fontSize:18,
                        color:styleColors.color,
                        fontWeight:"600"
                    // }}>dd! </Text>
                    }}>{appData.user.name}! </Text>
                </View>
                    <Text style={{
                        fontSize:22,
                        color:styleColors.color,
                        fontWeight:"500"
                    }}>Great to see you again </Text>
                </View>
            </View>

            <Card 
                color={Colors.primary}
                backgroundColor={Colors.primary}
                title='ChatGPT'
                subtitle='live chat with GPT-4'
                icon={<MaterialCommunityIcons name='robot-outline' color={mode=="dark"  ? Colors.lighter : Colors.primary} size={39} />}
                flag={<Ionicons name='ios-chatbubble-ellipses-outline' color={mode=="dark"  ? Colors.lighter : Colors.primary} size={18} />}
                onPress={()=>navigation.navigate("Chat")}
                />
            <Card 
                color={styleColors.color}
                backgroundColor={Colors.green}
                title='Generate Images'
                // subtitle='Create beautiful art and images with AI, enter your prompts and convert text to image in different art styles quickly'
                subtitle='Create beautiful art and images with AI in different art styles quickly'
                flag={<MaterialCommunityIcons name='creation' color={mode=="dark"  ? Colors.lighter : styleColors.color} size={16} />}
                icon={<Octicons name='image' color={mode=="dark"  ? Colors.lighter : styleColors.color} size={29} />}
                onPress={()=>navigation.navigate("ImageGen")}
            />
            <Card 
                color={styleColors.color}
                backgroundColor={Colors.green}
                title='AI Voice Over'
                // subtitle='Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages'
                subtitle='Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages'
                // flag={<MaterialCommunityIcons name='text-to-speech' color={mode=="dark"  ? Colors.lighter : styleColors.color} size={16} />}
                icon={<MaterialCommunityIcons name='text-to-speech' color={mode=="dark"  ? Colors.lighter : styleColors.color} size={39} />}
                // icon={<MaterialCommunityIcons name='account-voice' color={mode=="dark"  ? Colors.lighter : styleColors.color} size={39} />}
                // icon={<Octicons name='image' color={mode=="dark"  ? Colors.lighter : styleColors.color} size={29} />}
                onPress={()=>navigation.navigate("AIVoiceGen")}
            />
            
        </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({})