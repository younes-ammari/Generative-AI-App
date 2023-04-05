import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Card from '../components/Card'
import Colors from '../constants/Colors'

export default function Home({navigation}) {

    const images={
        chatGPT:{uri:"https://www.primelawgroup.com/wp-content/uploads/2023/02/chatgpt-icon.png"},
        ai:{uri:"https://www.pngmart.com/files/21/AI-PNG-Picture.png"}
    }
  return (
    <ScreenWrapper>
        <View style={{
            flex:1,
            // backgroundColor:'red',
            }}>


                <View style={{
                    width:"100%",
                    minHeight:99,
                    paddingVertical:11,
                    marginTop:11,
                    paddingHorizontal:11,
                }}>
                    <View style={{
                        flexDirection:'row'
                    }}>


                    <Text style={{
                        fontSize:18,
                        color:Colors.darker,
                        fontWeight:"400"
                    }}>Welcome </Text>
                    <Text style={{
                        fontSize:18,
                        color:Colors.darker,
                        fontWeight:"600"
                    }}>Mabrouk! </Text>
                </View>
                    <Text style={{
                        fontSize:22,
                        color:Colors.darker,
                        fontWeight:"500"
                    }}>Great to see you again </Text>
                </View>

            <Card 
                color={Colors.lighter}
                backgroundColor={Colors.primary}
                title='ChatGPT'
                subtitle='live chat with GPT-4'
                imageSource={images.chatGPT}
                onPress={()=>navigation.navigate("Chat")}
                />
            <Card 
                color={Colors.primary}
                backgroundColor={Colors.green}
                title='Generate Images'
                subtitle='convert any prompt into a real image'
                imageSource={images.ai}
                onPress={()=>navigation.navigate("ImageGen")}
            />
        </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({})