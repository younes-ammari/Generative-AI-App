import { StyleSheet, Text, View, Image, useColorScheme, Pressable } from 'react-native'
import React, {useContext} from 'react'
import AppContext from '../hooks/useContext'
import Colors from '../constants/theme/Colors'


export default function PaymentMethod({
  method,
  ...props
}){


      
  const deviceMode = useColorScheme()

  const {styleColors, displayMode} = useContext(AppContext)


  const mode = displayMode=="auto" ? deviceMode : displayMode

  const icon = 
  method=="paypal"
  ?
  <Image
    source={require('../images/paypal.png')}
    // fadeDuration={200}
    resizeMode="contain"
    style={{
        width:"80%",
        height:45,
    }}
  />
  :
  <Image
    source={require('../images/stripe.png')}
    // fadeDuration={200}
    resizeMode="contain"
    style={{
        width:"100%",
        height:44,
    }}
  />

  return(
    <Pressable style={[styles.container, {
        
        backgroundColor:styleColors.placeholder
    }]}
    android_ripple={{color:mode=="dark"  ? 'rgba(100, 100, 100, .21)' : 'rgba(20, 20, 20, .05)' }}
    {...props}
    >
      {icon}
    </Pressable>
  )
}




const styles = StyleSheet.create({
    container:{
        // paddingVertical:10,
        height:66,
        // paddingHorizontal:11,
        width:"100%",
        marginVertical:9,
        alignSelf:"center",
        // backgroundColor:'red',
        // marginHorizontal:8,
        borderRadius:9,
        borderWidth:1,
        justifyContent:"center",
        alignItems:"center",
        // borderColor:Colors.primary,
        borderColor:`rgba(${Colors.rgb.primary}, .6)`,
    }
    
})



