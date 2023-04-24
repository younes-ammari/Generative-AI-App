import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, {useContext} from 'react'
import AppContext from '../hooks/useContext'


export default function Step({
  number,
  title
}){

    
      
  const deviceMode = useColorScheme()

  const {styleColors, displayMode} = useContext(AppContext)


  const mode = displayMode=="auto" ? deviceMode : displayMode


  return(
    <View style={[styles.flex, styles.aCenter, {
      marginVertical:5,
      marginBottom:18,
      // paddingHorizontal:11,
    }]}>
      <View style={[styles.jCenter, styles.aCenter, {
        backgroundColor:Colors.primary,
        height:27,
        width:27,
        borderRadius:55,
        marginEnd:9,
      }]}>
        <Text style={{
          fontSize:16,
          color:Colors.lighter,
          fontWeight:"500",
        }}>{number}</Text>
      </View>
        <Text style={{
          fontSize:17,
          color:styleColors.color,
          fontWeight:"500",
        }}>{title}</Text>
    </View>
  )
}




const styles = StyleSheet.create({
    
  flex:{flexDirection:'row'},
  jCenter:{justifyContent:"center"},
  aCenter:{alignItems:"center"}
})



