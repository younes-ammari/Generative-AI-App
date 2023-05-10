import { Pressable, StyleSheet, Text } from 'react-native'
import React, { useContext } from 'react'
import AppContext from '../../hooks/useContext'
import Layout from '../../constants/theme/Layout'

export default function SizeComponent({ title = "1024x1024", end = false, selected, selectionFunction }) {


    const { styleColors } = useContext(AppContext)

    return (
        <Pressable style={[styles.container, {
            backgroundColor: title == selected ? Colors.primary : null,
            marginRight: !end ? 7 : 0,

        }]}
            onPress={() => selectionFunction(title)}
        >
            <Text style={[styles.title, {
                opacity: title == selected ? 1 : .9,
                color: title == selected ? Colors.lighter : styleColors.color,
            }]}>{title}</Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Layout.padding.medium,
        borderRadius: Layout.radius.medium,
        marginVertical: Layout.margin.medium,
        borderWidth: 1,
        borderColor: 'rgba(100, 100, 100, .5)'
    },
    title: {
        fontSize: Layout.font.h2,
        fontWeight: "500",
        textAlign: "center",
    },
})