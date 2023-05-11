import { ImageSourcePropType, Image, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constants/theme/Colors'
import { Pressable } from 'react-native'
import AppContext from '../../hooks/useContext'
import Images from '../../assets/Index'
import Layout from '../../constants/theme/Layout'

type Props = {
    /**
     * Card title
     */
    title?: string | "card title",

    /**
     * Card subtitle
     */
    subtitle?: string | "card subtitle",

    /**
     * Card color
     */
    color?: ColorValue | number | undefined;


    /**
     * Card backgroundColor
     */
    backgroundColor?: ColorValue | number | undefined;

    /**
     * Soon state 
     */
    soon?: boolean,

    /**
     * The image source (either a remote URL or a local file resource).
     *
     * This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments.
     * The native side will then choose the best uri to display based on the measured size of the image container.
     * A cache property can be added to control how networked request interacts with the local cache.
     *
     * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
     */
    imageSource?: ImageSourcePropType,

    /**
     * Called when a single tap gesture is detected.
     */
    onPress?: () => void | undefined,


};

export default function CardImage({
    title,
    subtitle,
    soon = false,
    color = Colors.lighter,
    backgroundColor = Colors.primary,
    imageSource = Images.chatGPT,
    ...props
}: Props) {

    const deviceMode = useColorScheme()

    const { styleColors, displayMode } = useContext(AppContext)


    const mode = displayMode == "auto" ? deviceMode : displayMode






    return (
        <Pressable
            style={[
                styles.container,
                {
                    backgroundColor: styleColors.placeholder,
                    borderColor: styleColors.placeholderTextColor
                },
            ]}
            android_ripple={{ color: mode == "dark" ? 'rgba(100, 100, 100, .21)' : 'rgba(20, 20, 20, .1)' }}
            {...props}
        >
            <View style={styles.innerConatiner}>
                <View style={{
                    flex: 1,
                    justifyContent: "space-around"
                }}>
                    <Text style={[styles.title, { color: mode == "dark" ? Colors.lighter : color }]}>{title}</Text>
                    {subtitle && <Text style={[styles.subtitle, { color: mode == "dark" ? Colors.lighter : color }]}>{subtitle}</Text>}

                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={imageSource}
                        style={styles.image}
                    />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderWidth: 1.7,
        borderColor: 'rgba(100, 100, 100, .4)',
        borderRadius: Layout.radius.large,
    },
    image: {
        height: 56,
        width: 56,
    },
    subtitle: {
        fontWeight: "300",
        fontSize: Layout.font.h2,
        color: Colors.lighter,
        maxWidth: "95%",
        opacity: .5,

    },
    title: {
        fontWeight: "500",
        fontSize: Layout.font.h1,
        letterSpacing: 1,
        color: Colors.lighter

    },
    container: {
        minHeight: 88,
        borderRadius: Layout.radius.medium,
        paddingHorizontal: Layout.padding.small,
        width: '100%',
        marginBottom: Layout.margin.medium-5,
        overflow: 'hidden',
        borderWidth: 1.4,
    },
    innerConatiner: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: Layout.padding.medium,
        paddingHorizontal: Layout.padding.small,
    }
})