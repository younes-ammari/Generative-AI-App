import { Dimensions, Image, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../constants/Colors'
import { Pressable } from 'react-native'
import AppContext from '../hooks/useContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function CardNew({
    title,
    subtitle,
    color=Colors.lighter,
    backgroundColor=Colors.primary,
    imageSource=require('../images/home/chatGPT.png'),
    ...props
}) {

    const deviceMode = useColorScheme()

    const {styleColors, displayMode} = useContext(AppContext)


    const mode = displayMode=="auto" ? deviceMode : displayMode



    

    
  return (
    <Pressable 
    
    style={[styles.container,  {
        backgroundColor:styleColors.placeholder,
        // borderColor:'rgba(100, 100, 100, .4)'
        borderColor:styleColors.placeholderTextColor
    }]}
        
      android_ripple={{ color: mode=="dark"  ? 'rgba(100, 100, 100, .21)' : 'rgba(20, 20, 20, .1)' }}
      {...props}
    
      >

        
            <Image 
            source={imageSource}
            style={{
                height:126,
                width:"100%",
                borderRadius:12,
                borderWidth:1.7,
                marginBottom:11,
            }}
            />


        
        <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.title, {color:mode=="dark"  ? Colors.lighter : color}]}>{title}</Text>
        <View style={{
            flex:1,
        }}>
        {/* {subtitle&&<Text numberOfLines={3} ellipsizeMode="tail" style={[styles.subtitle, {color:mode=="dark"  ? Colors.lighter : color}]}>{subtitle}</Text>} */}
                    
        </View>
        
    </Pressable>
  )
}

const styles = StyleSheet.create({
    subtitle:{
        fontWeight:"300",
        fontSize:15,
        flex:1,
        flexWrap:"wrap",
        color:Colors.lighter,
        opacity:.5,
        
    },
    title:{
        fontWeight:"500",
        fontSize:19,
        color:Colors.lighter

    },
    container:{

        minHeight:88,
        borderRadius:8,
        paddingVertical:11,
        paddingHorizontal:12,
        marginVertical:12,
        overflow:'hidden',
        borderWidth:1.4,
        borderRadius:12,
        width:Dimensions.get('window').width*.44,
        marginEnd:11,
        borderColor:'rgba(100, 100, 100, .4)',
    }
})