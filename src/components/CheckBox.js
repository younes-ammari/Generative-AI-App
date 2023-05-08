import React from 'react'
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/theme/Colors'
import AppContext from '../hooks/useContext'

export default function CheckBox({value, onPress, title, disabled=false}){
    const selected = value
    
    const { displayMode, styleColors} = React.useContext(AppContext)

    const deviceMode = useColorScheme()
    
    const mode = displayMode=="auto" ? deviceMode : displayMode
    
    


    return(
        <Pressable style={styles.conatiner} onPress={onPress} disabled={disabled}>
            <View style={[styles.checkBackground, {
                    // backgroundColor: selected ? Colors.green : null,
                    borderColor:styleColors.color,}]}>
                {selected && <Ionicons name='md-checkmark-sharp' color={styleColors.color}/>}
            </View>
            <Text style={[styles.title, {color:styleColors.color,}]}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    conatiner:{
        marginVertical:2,
        marginBottom:4,
        paddingVertical:2,
        flexDirection:'row',
    },
    title:{
        fontSize:15,
        fontWeight:"400"
    },
    checkBackground:{
        alignItems:"center",
        borderWidth:1,
        justifyContent:"center",
        padding:3,
        borderRadius:3,
        marginEnd:5,
        height:22,
        width:22
    }
})

