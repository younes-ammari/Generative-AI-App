import React, { useContext } from 'react'
import { StyleSheet, Text, Pressable, } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Colors from '../../constants/theme/Colors'
import AppContext from '../../hooks/useContext';
import Layout from '../../constants/theme/Layout';


export default function Gender({
    title = "1024x1024",
    end = false,
    selected = false,
    onPress
}) {


    var iconName = ['female', 'male'].includes(title) ? title : "male";

    const { styleColors } = useContext(AppContext)


    return (
        <Pressable style={[styles.container, {
            marginRight: !end ? 7 : 0,
            backgroundColor: selected ? Colors.primary : null,
            opacity: selected ? 1 : .71,

        }]}
            onPress={onPress}
        >
            <Fontisto name={iconName} size={17} color={selected ? Colors.lighter : styleColors.color} />
            <Text style={[styles.title, {
                fontSize: Layout.font.h2,
                opacity: selected ? 1 : .9,
                color: selected ? Colors.lighter : styleColors.color,
            }]}>{title.replace(/\b\w/g, letter => letter.toUpperCase())}</Text>

        </Pressable>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 11,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9,
        marginVertical: 4,
        borderWidth: 1.5,
        borderColor: 'rgba(100, 100, 100, .5)'
    },
    title: {
        fontWeight: "500",
        textAlign: "center",
        marginStart: 5
    },
})