import { StyleSheet, Text, View, useColorScheme, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../hooks/useContext'

export default function AudioWaves({waves=[]}){
        
    const deviceMode = useColorScheme()
    const [list, setList] = useState(waves)

    const {styleColors, displayMode, appData} = useContext(AppContext)


    const mode = displayMode=="auto" ? deviceMode : displayMode


    
    function getNumberArray(length, interval) {
        const arr = [];
        const [min, max] = interval;
        for (let i = 0; i < length; i++) {
            const random = Math.random() * (max - min) + min;
            arr.push(random);
          }
        list.length<2&& setList(arr)
        // return arr;
      }
      

    useEffect(()=>{
        getNumberArray(Dimensions.get('window').width*.11, [9, 33])
    }, [])


    return(
        <View style={styles.container}>
            {list.map((el, i)=><View key={i} style={[styles.wave,{
                height:el,
                backgroundColor:styleColors.color,
                // opacity:.5,
            }]}/>)}
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        flexDirection:'row',
        // opacity:.1,
        // marginTop:8,
    },
    wave:{
        width:3.5,
        borderRadius:9,
        backgroundColor:'red',
        marginRight:4
    }
})