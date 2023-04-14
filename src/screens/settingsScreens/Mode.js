import { Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from '../../ScreenWrapper'
import Colors from '../../constants/Colors'
import * as Vicon  from 'react-native-vector-icons'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AppContext from '../../hooks/useContext'

export default function Mode({navigation}) {

    const {
        mode, 
        setMode,
        // styleColors,
        appData,
        setAppDataHandler,
      } = useContext(AppContext)
    
    const styleColors = Colors[mode=="auto" ? useColorScheme() : mode]
    
    



    const Element=({title, icon})=>{

        return(
            <TouchableOpacity onPress={()=>{
                setMode(title.toLowerCase())
                setAppDataHandler(appData)
            }} activeOpacity={mode==title.toLowerCase() ? 1 :.7} style={[styles.flex, styles.center, styles.sb, {
                borderBottomWidth:1,
                borderBottomColor:"rgba(131, 131, 131, .1)",
                marginBottom:5,
                // marginHorizontal:9,
                paddingBottom:11,
                paddingRight:4,
                alignItems:"flex-end",
                }]}>
                <View style={[styles.flex, styles.center, styles.sectionTitle]}>
                {icon && icon}
                <Text style={[{
                    color:styleColors.color,
                    fontSize:17,
                    marginHorizontal:11,
                    fontWeight:'300',
                }, mode==title.toLowerCase() && {fontWeight:'600'}]}>{title}</Text>

                </View>
                {
                    mode==title.toLowerCase()
                    ?
                    <Octicons name='check-circle' color={styleColors.color} size={16} style={{opacity:1}}/>
                    :
                    <Octicons name='circle' color={styleColors.color} size={16} style={{opacity:1}}/>

                }
            </TouchableOpacity>
        )
        }
  return (
    <ScreenWrapper back title="Mode">
        <View style={styles.conatiner}>

            {/* <Text style={styles.title}>Mode</Text> */}
                <View>
                    {/* <Element title="Auto"/> */}
                    <Element title="Dark" icon={<Ionicons name='moon' color={styleColors.color} size={16} style={styles.icon}/>}/>
                    <Element title="Light" icon={<Octicons name='sun' color={styleColors.color} size={16} style={styles.icon}/>}/>
                    
                </View>
            {/* <Element title='Logout' logout/> */}
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
    textAlign:"center",
    // backgroundColor:'red',
    // width:"100%",

  },
  icon:{
    padding:5,
  },
  conatiner:{
    flex:1,
    padding:15,
    paddingVertical:8,
    // backgroundColor:'red',
},
flex:{
    flexDirection:'row',
},
center:{
    alignItems:"center",
},
sb:{
    justifyContent:"space-between",
},
sectionTitle:{
  fontSize:17,
//   opacity:.6,
  color:Colors.darker,
  marginTop:19,
//   marginHorizontal:8,
//   paddingBottom:9,
//   textAlign:"center"
//   marginVertical:15
},
versionTitle:{
  fontSize:13,
//   opacity:.6,
  color:Colors.darker,
  marginTop:15,
  marginBottom:19,
  fontWeight:"400",
  textAlign:"center"
//   marginVertical:15
},
})