import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/theme/Colors'
import AppContext from '../../hooks/useContext'
import Layout from '../../constants/theme/Layout'

type Props = {
    /**
     * Check box value true when checked
     */
    value: string,


    /**
     * Check box title
     */
    title: string,


    /**
     * Check box disabled state
     */
    disabled: boolean,


    /**
     * Handler to be called when the user taps the button
     */
    onPress: (() => void) | undefined,


}

export default function CheckBox({ value, title, disabled = false, onPress }:Props) {
    const selected = value

    const { styleColors } = React.useContext(AppContext)




    return (
        <Pressable style={styles.conatiner} onPress={onPress} disabled={disabled}>
            <View style={[styles.checkBackground, {
                borderColor: styleColors.color,
            }]}>
                {selected && <Ionicons name='md-checkmark-sharp' color={styleColors.color} />}
            </View>
            <Text style={[styles.title, { color: styleColors.color, }]}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    conatiner: {
        marginVertical: 2,
        marginBottom: 4,
        paddingVertical: 2,
        flexDirection: 'row',
    },
    title: {
        fontSize: Layout.font.h2,
        fontWeight: "400"
    },
    checkBackground: {
        alignItems: "center",
        borderWidth: 1,
        justifyContent: "center",
        padding: 3,
        borderRadius: 3,
        marginEnd: 5,
        height: 22,
        width: 22
    }
})

