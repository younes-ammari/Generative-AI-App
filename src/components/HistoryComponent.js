import { StyleSheet, Text, View, useColorScheme, Pressable, Image } from 'react-native'
import React, {useContext} from 'react'
import Colors from '../constants/Colors'
import AppContext from '../hooks/useContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function HistoryComponent({
    title,
    details,
    type,
    plus=false,
    amont
}) {


    const deviceMode = useColorScheme()

    const {styleColors, displayMode} = useContext(AppContext)


    const mode = displayMode=="auto" ? deviceMode : displayMode

    const image=(type)=>{
        const typeHandler = {
            "chatgpt":require('../images/home/chatGPT.png'),
            "imagegen":require('../images/home/imageGen.png'),
            "voicegen":require('../images/home/voiceGen.png'),
            // "payment":require('../images/home/payment.png'),
        }

        if (typeHandler[type]){
            return typeHandler[type]
        }
        return require('../images/home/pay.png')

    }

    
  return (
    <Pressable style={[styles.flex, styles.aCenter, styles.container, {
        backgroundColor:styleColors.placeholder
    }]}
    android_ripple={{color:styleColors.androidRippleColor}}
    >
        <View style={[styles.flex, styles.aCenter, styles.jCenter]}>
            <View style={[styles.imgContainer, {borderColor:styleColors.placeholderTextColor, backgroundColor:styleColors.placeholder}]}>

                <Image 
                    source={image(type)} 
                    style={styles.img}        
                    />
            </View>
            <View style={[]}>
                <Text style={[styles.titleText,{
                    color:styleColors.color,
                }]}>{title}</Text>
                <Text style={[styles.detailsText,{
                    color:styleColors.color,
                }]}>{details}</Text>
            </View>
        </View>
        
        <View style={[styles.flex]}>
            <Text style={[
                styles.amontText, {
                    color:plus ? Colors.green : Colors.red,
                    }]}
                >{plus ? "+" : "-"} {String(amont)}</Text>
            <FontAwesome5 name='coins' size={15} color={"#FFD233"} style={{alignSelf:"center"}}/>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    amontText:{
        fontSize:18,
        fontWeight:"500",
        marginHorizontal:7,
    },
    detailsText:{
        fontSize:13,
        opacity:.4,
        fontWeight:"400"
    },
    titleText:{
        fontSize:15,
        fontWeight:"400"
    },
    container:{
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius:9,
        marginVertical:5,
        
    },
    flex:{flexDirection:'row'},
    jCenter:{justifyContent:"center"},
    aCenter:{alignItems:"center"},
    imgContainer:{
        height:40,
        width:40,
        marginEnd:9,
        borderWidth:2,
        borderRadius:22,
        overflow:'hidden',
        alignItems:"center",
        justifyContent:"center",

    },
    img:{
        height:40,
        width:40,
        // backgroundColor:'red',
    }
})