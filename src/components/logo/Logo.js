import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AppContext from '../../hooks/useContext'

export default function Logo() {

    const {styleColors } = React.useContext(AppContext)
  return (
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
  )
}

const styles = StyleSheet.create({})