import { StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { useKeyboard } from '../../hooks/useKeyboard'
import AppContext from '../../hooks/useContext'

type Props = {
    /**
     * Recording state
     */
    isRecording:boolean,

    /**
     * Handle press event
     */
    onPress:()=>void,
}

export default function RecordButton({ isRecording, onPress }:Props) {
    const kb = useKeyboard();

    const {
        displayMode,
        styleColors,

    } = React.useContext(AppContext)


    // Get Device Display Mode
    const deviceMode = useColorScheme()
    const mode = displayMode == "auto" ? deviceMode : displayMode

    return (
        <TouchableOpacity style={{
            opacity: .5,
            paddingHorizontal: 13,
            borderRadius: 8,
            height: 44,
            zIndex: 2,
            display: !kb.isVisible ? "none" : "flex",
            borderRadius: 44,
            paddingVertical: 5,
            marginHorizontal: 5,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: 'row',
            backgroundColor: isRecording ? 'rgba(250, 100, 100, .2)' : 'rgba(100, 100, 100, .2)',
        }}
            onPress={onPress}
        >

            <Ionicons name="mic" size={17} color={isRecording ? 'red' : styleColors.color} />
            {/* <Text style={{fontSize:16, color:"white", marginLeft:9}}>Send</Text> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})