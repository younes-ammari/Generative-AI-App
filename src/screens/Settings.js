import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'
import * as Vicon  from 'react-native-vector-icons'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'

export default function Settings({navigation}) {


  const Element=({
    title='Settings Title', 
    logout=false,
    icon=<Icon name='account' color={Colors.darker} size={22}/>,
    ...props
  })=>{

    return(
      <Pressable style={{
        width:'100%',
        paddingVertical:16,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:"center",
        // marginTop:logout ? 12 : 0
      }}
      android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}
      {...props}

      >
        {icon && icon}
        <Text style={{
          fontSize:18, 
          marginLeft:icon ? 11 : 0,
          fontWeight:"300",
          color:!logout ? Colors.darker : 'rgba(200, 15, 22, 1)',
        }}>{title}</Text>
      </Pressable>

    )
  }
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Settings</Text>
      <Element title='Account' icon={
        <Icon name='account' size={22} color={Colors.darker}/>
      }/>
      <Element title='Dark mode'  icon={
        <Icon name='theme-light-dark' size={22} color={Colors.darker}/>
      }
      onPress={()=>navigation.navigate('Mode')}
      />
      <Element title='Language' icon={
        <MIcon name='language' size={22} color={Colors.darker}/>
      }/>
      <Element title='About' icon={
        <Icon name='information' size={22} color={Colors.darker}/>
      }/>

      <Element title='Logout' logout icon={
        <MIcon name='logout' size={22} color="rgba(200, 15, 22, 1)"
        />
      }
      onPress={()=>navigation.navigate('Login')}
      />
      {/* <Element title='Logout' logout/> */}
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

  }
})