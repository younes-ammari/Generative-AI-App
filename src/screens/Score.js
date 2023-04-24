import { Pressable, StyleSheet, Text, ScrollView, useColorScheme, View, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import AppContext from '../hooks/useContext'
import Step from '../components/Step'
import PaymentMethod from '../components/PaymentMethod'
import Activity from '../components/Activity'

export default function Score({navigation}) {

  const PointPrise = 0.2

  
  
  const deviceMode = useColorScheme()

  const {styleColors, displayMode} = useContext(AppContext)


  const mode = displayMode=="auto" ? deviceMode : displayMode


  const [points, setPoints] = useState(135)
  const Icon = <FontAwesome5 name='coins' size={20} color={styleColors.color}/>


  return (
    <ScreenWrapper scroll> 
      
        
        <View style={{
          // justifyContent:"center",
          alignItems:"center",
          backgroundColor:Colors.primary,
          paddingVertical:22,
          paddingBottom:30,
          borderBottomLeftRadius:44,
          borderBottomRightRadius:44,
        }}>
          <View style={{
            flexDirection:'row',
            justifyContent:"center",
            alignItems:"center",
          }}>
            <FontAwesome5 name='coins' size={17} color={Colors.lighter}/>
            <Text style={{
              fontSize:19,
              // letterSpacing:.523,
              margin:11,
              opacity:.8,
              marginBottom:10,
              // paddingBottom:5,
              // margin:0,
              color:Colors.lighter,
              fontWeight:"500",
            }}>Your credit</Text>

            
          </View>

          
          <View style={{
            flexDirection:'row',
            justifyContent:"center",
            alignItems:"flex-end",
            backgroundColor:"rgba(180, 181, 255, 0.13)",
            paddingHorizontal:22,
            paddingVertical:13,
            marginTop:11,
            width:"60%",
            borderRadius:9,
          }}>
            <FontAwesome5 name='coins' size={19} color={"#FFD233"} style={{alignSelf:"center"}}/>
            <Text style={{
              fontSize:33,
              marginHorizontal:7,
              // letterSpacing:.523,
              // marginBottom:10,
              color:Colors.lighter,
              fontWeight:"500",
            }}>{points}</Text>
            <Text style={{
              fontSize:15,
              // letterSpacing:.523,
              opacity:.8,
              // paddingBottom:5,
              // margin:0,
              color:Colors.yellow,
              fontWeight:"400",
            }}>points</Text>
          </View>



          <Pressable style={{
              marginTop:25,
              width:"40%",
              paddingHorizontal:33,
              paddingVertical:9,
              borderWidth:1,
              // justifyContent:"center",
              alignItems:"center",
              borderRadius:12,
              borderColor:Colors.yellow

            }}
            
            android_ripple={{color:mode=="dark"  ? 'rgba(100, 100, 100, .21)' : 'rgba(20, 20, 20, .05)' }}
            onPress={()=>navigation.navigate('Pay')}
            >
              <Text style={{
                fontSize:17,
                // letterSpacing:.523,
                // margin:11,
                opacity:.8,
                // paddingBottom:5,
                // margin:0,
                color:Colors.lighter,
                fontWeight:"400",
              }}>Buy credit</Text>
            </Pressable>
        </View>

        <View style={{
          paddingHorizontal:15,
        }}>

          <Text style={{
            fontSize:21,
            marginTop:18,
            marginBottom:9,
            color:styleColors.color,
            fontWeight:"500",
          }}>Last Activities</Text>

          <Activity 
            title="Chat with ChatGPT"
            details="14 message"
            plus
            amont={55}
          />
          <Activity 
            title="Image generator"
            details="4 images"
            amont={12}
          />
          <Activity 
            title="AI Voiceover "
            details="26 sec"
            amont={5}
          />
          <Activity 
            title="Payment"
            details="+20 points"
            plus
            amont={20}
          />
          <Activity 
            title="Trial points"
            details="+16 points"
            plus
            amont={16}
          />
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
    textAlign:"center"

  },
  flex:{flexDirection:'row'},
  jCenter:{justifyContent:"center"},
  aCenter:{alignItems:"center"},
})