import { StyleSheet, Text, View, useColorScheme, Pressable } from 'react-native'
import React, {useContext} from 'react'
import Colors from '../constants/Colors'
import AppContext from '../hooks/useContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
export default function Activity({
    title,
    details,
    plus=false,
    amont
}) {


    const deviceMode = useColorScheme()

    const {styleColors, displayMode} = useContext(AppContext)


    const mode = displayMode=="auto" ? deviceMode : displayMode

    

    
  return (
    <Pressable style={[styles.flex, styles.aCenter, styles.container, {
        backgroundColor:styleColors.placeholder
    }]}
    android_ripple={{color:mode=="dark"  ? 'rgba(100, 100, 100, .21)' : 'rgba(20, 20, 20, .05)' }}
    >
        <View style={[styles.flex, styles.aCenter, styles.jCenter]}>
            <View style={[styles.img]}>
            </View>
            <View style={[]}>
                <Text style={{
                    fontSize:15,
                    fontWeight:"400",
                    color:styleColors.color,
                }}>{title}</Text>
                <Text style={{
                    fontSize:13,
                    opacity:.4,
                    fontWeight:"400",
                    color:styleColors.color,
                }}>{details}</Text>
            </View>
        </View>
        
        <View style={[styles.flex]}>
            <Text style={{
                fontSize:18,
                fontWeight:"500",
                color:plus ? Colors.green : Colors.red,
                marginHorizontal:7,
            }}>{plus ? "+" : "-"} {String(amont)}</Text>
            <FontAwesome5 name='coins' size={15} color={"#FFD233"} style={{alignSelf:"center"}}/>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
    img:{
        height:40,
        width:40,
        backgroundColor:'red',
        marginEnd:9,
        borderRadius:22
    }
})