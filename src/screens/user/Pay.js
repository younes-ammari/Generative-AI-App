import { Pressable, StyleSheet, Text, ScrollView, useColorScheme, View, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../../constants/theme/Colors'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import AppContext from '../../hooks/useContext'
import Step from '../../components/Step'
import PaymentMethod from '../../components/payment/PaymentMethod'

export default function Pay({navigation}) {

  const PointPrise = 0.2

  
  
  const deviceMode = useColorScheme()

  const {styleColors, displayMode} = useContext(AppContext)


  const mode = displayMode=="auto" ? deviceMode : displayMode


  const [coins, setCoins] = useState(1)
  const Icon = <FontAwesome5 name='coins' size={20} color={styleColors.color}/>

  const result = (coins*PointPrise).toFixed(2)

  
  return (
    <ScreenWrapper back scroll title="Buy coins" 
    // icon={Icon}
    > 
      
      <View 
        style={{
          flex:1,
          backgroundColor:styleColors.backgroundColor,
          paddingHorizontal:15,
          paddingTop:71,
          // backgroundColor:styleColors.red,
        }}
      >
        <Step number={1} title="Enter the point you want to buy" />
        <View style={{
          flexDirection:'row',
          justifyContent:"center",
          // alignItems:"center",
          alignItems:"baseline",
          alignItems:"flex-end",
          // paddingBottom:5,
        }}>
          <TextInput 
           placeholder='12'
           value={String(coins)}
           onChangeText={(value)=>setCoins(value)}
           keyboardType="numeric"
           style={{
            padding:0,
            margin:0,
            color:Colors.primary,
            // borderWidth:1,
            verticalAlign:"middle",
            textAlign:"center",
            textAlignVertical:"center",
            fontSize:55,
           }}
          />
          <Text style={{
            fontSize:20,
            // letterSpacing:.523,
            margin:11,
            opacity:.8,
            marginBottom:10,
            // paddingBottom:5,
            // margin:0,
            color:styleColors.color,
            fontWeight:"500",
          }}>x {PointPrise} $</Text>
        </View>

        <View style={{
          flexDirection:'row',
          justifyContent:"space-between",
          alignItems:"center",
          marginTop:21,
        }}>

          <Step number={2} title="Dollars" />
          <Text style={{
            fontSize:25,
            margin:0,
            padding:0,
            marginEnd:22,
            color:styleColors.color,
            fontWeight:"500",
          }}>{result} $</Text>
        </View>
        <Step number={3} title="Choose a method" />

        <PaymentMethod 
          method='paypal'
          onPress={()=>{
            console.log('paypal pressed')
          }}
          />
        <PaymentMethod 
          method='stripe'
          onPress={()=>{
            console.log('stripe pressed')
          }}
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