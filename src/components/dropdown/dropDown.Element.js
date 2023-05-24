import { Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import AppContext from '../../hooks/useContext'
import Layout from '../../constants/theme/Layout'
import images from '../../assets/Index'



export default function Element({ label, labelColor, image, selected, ...props }) {

    const {
        displayMode,
        styleColors,

    } = React.useContext(AppContext)


    // Get Device Display Mode
    const deviceMode = useColorScheme()
    const mode = displayMode == "auto" ? deviceMode : displayMode


    return (
        <TouchableOpacity style={[styles.container, {
            backgroundColor:selected ? styleColors.softFill : undefined

        }]}
            {...props}
        >
            <View style={styles.modelContainer}>
                {image && <Image
                    source={image}
                    style={styles.modelImage}
                />}

                <Text style={{
                    color: labelColor ? labelColor : styleColors.color,
                    fontSize: Layout.font.h2,
                    fontWeight: selected ? "700" : "400"
                }}>{label}</Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: Layout.margin.small,
        paddingVertical: Layout.padding.small,
        paddingHorizontal: Layout.padding.medium,
        justifyContent: "center",
    },

    modelImage: {
        height: 25,
        width: 25,
        borderRadius: Layout.radius.medium,
        marginEnd: Layout.margin.small
    },
    modelContainer: {
        paddingEnd: Layout.padding.medium,
        flexDirection: 'row',
        alignItems: "center",

    },
})