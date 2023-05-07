import { StyleSheet, Text, View, useColorScheme, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../constants/Colors'
import AppContext from '../hooks/useContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AudioWaves from './AudioWaves'

export default function HistoryComponent({
    title,
    details,
    type,
    plus = false,
    amont,
    data,
    date,
    onPress
}) {

    function typeComponentHandler(type) {
        switch (type) {
            case 'video': // data: {type:"summarize", content:"bla bal bla ..."}
                const isText = data.text ? true : false
                const isSummarize = data.summarize ? true : false
                return (
                    <View style={{ alignItems: "flex-start", marginTop: 5 }}>
                        <View style={[styles.flex, styles.aCenter]}>
                            {isText && <Text style={styles.subtitle}>Text</Text>}
                            {isSummarize && <Text style={styles.subtitle}>Summarize</Text>}
                        </View>
                        <Text
                            ellipsizeMode="tail"
                            lineBreakMode='tail'
                            numberOfLines={4}
                            style={[styles.detailsText, {
                                color: styleColors.color,
                                textAlign: "justify",
                            }]}>{data.summarize}</Text>
                    </View>
                )
            case 'content': // data: {type:"blog", draft:3, content:"bla bal bla ..."}
                return (
                    <View style={{ alignItems: "flex-start", marginTop: 5 }}>
                        <View style={[styles.flex, styles.aCenter]}>
                            <Text style={[styles.subtitle, {
                                color: styleColors.color,
                                backgroundColor: styleColors.softBleu,
                            }]}>{data.type}</Text>
                            <Text style={styles.subtitle}>{data.drafts} drafts</Text>
                        </View>
                        <Text
                            ellipsizeMode="tail"
                            lineBreakMode='tail'
                            numberOfLines={4}
                            style={[styles.detailsText, {
                                color: styleColors.color,
                                textAlign: "justify",
                            }]}>{data.content}</Text>
                    </View>
                )
            case 'voice': // data: {waves:[55, 35, 43, ...], duration:"15 sec"}
                return (
                    <View style={{ marginTop: 4, alignItems: 'flex-start' }}>
                        <Text style={styles.subtitle}>{data.output_format}</Text>
                        <Text
                            ellipsizeMode="tail"
                            lineBreakMode='tail'
                            numberOfLines={4}
                            style={[styles.detailsText, {
                                color: styleColors.color,
                                textAlign: "justify",
                            }]}>{data.content}</Text>

                        <View style={{
                            alignItems: "flex-start",
                            flexDirection: 'row',
                            alignItems: "center",
                            marginTop: 11,
                            paddingHorizontal: 15,
                            paddingVertical: 9,
                            backgroundColor: styleColors.softFill,
                            borderRadius: 33,
                        }}>
                            <View style={{ flex: 1, overflow: "hidden" }}>
                                <AudioWaves waves={data.waves} />
                            </View>
                            <Text style={[styles.subtitle, {
                                color: styleColors.color,
                                backgroundColor: styleColors.softBleu,
                                marginStart: 9,
                            }]}>{data.duration}</Text>


                        </View>
                    </View>
                )
            case 'image': // data:["url1", "url2", "url3", ....]
                return (
                    <View style={{ alignItems: "flex-start", marginTop: 5 }}>
                        <Text style={styles.subtitle}>{data.length} images</Text>

                        <View style={[styles.flex, styles.aCenter,]}>
                            {
                                data.map((el, i) =>
                                    <View key={i} style={[styles.dataImageConatiner, { borderColor: styleColors.softFill, backgroundColor: styleColors.softFill }]}>

                                        <Image
                                            source={{ uri: el }}

                                            style={{
                                                height: 61,
                                                width: 61,
                                            }}
                                        />
                                    </View>
                                )
                            }

                        </View>
                    </View>
                )
            case 'chat': // data:{details: "details here about the chat ..."}
                return (
                    <View style={{ alignItems: "flex-start", marginTop: 5 }}>
                        <Text style={styles.subtitle}>{data.messages} message</Text>

                        <Text
                            ellipsizeMode="tail"
                            lineBreakMode='tail'
                            numberOfLines={3}
                            style={[styles.detailsText, {
                                color: styleColors.color,
                                marginTop: 3,
                                // opacity: .5,
                            }]}>{data.details}</Text>
                    </View>
                )
        }
        return <Text style={[styles.detailsText, {
            color: styleColors.color,
            fontSize: 12,
        }]}>details</Text>
    }


    function typeTextHandler(type) {
        switch (type) {
            case "chat":
                return "ChatGPT"
            case "voice":
                return "Voice Gen"
            case "image":
                return "Image Gen"
            case "video":
                return "Summarize"
            case "content":
                return "Content Gen"
        }
        return "Title"
    }


    const deviceMode = useColorScheme()

    const { styleColors, displayMode } = useContext(AppContext)


    const mode = displayMode == "auto" ? deviceMode : displayMode

    const image = (type) => {
        const typeHandler = {
            "chat": require('../images/home/chatGPT.png'),
            "image": require('../images/home/imageGen.png'),
            "voice": require('../images/home/voiceGen.png'),
            // "payment":require('../images/home/payment.png'),
        }

        if (typeHandler[type]) {
            return typeHandler[type]
        }
        return require('../images/home/pay.png')

    }


    return (
        <Pressable style={[styles.container, {
            backgroundColor: styleColors.placeholder
        }]}
            android_disableSound
            // android_ripple={{ color: styleColors.androidRippleColor }}
            android_ripple={{}}
        // onPress=
        >
            <View style={{ flex: 1 }}>
                <View style={[styles.flex, styles.aCenter, { marginBottom: 9, justifyContent: "space-between" }]}>
                    <View style={[styles.flex, styles.aCenter]}>
                        <View style={[styles.imgContainer, { borderColor: styleColors.placeholderTextColor, backgroundColor: styleColors.placeholder }]}>

                            <Image
                                source={image(type)}
                                style={styles.img}
                            />

                        </View>
                        <Text style={[styles.imgText, {
                            color: styleColors.color,
                        }]}>{typeTextHandler(type)}</Text>
                    </View>
                    <View style={[styles.dateContainer, { backgroundColor: styleColors.softFill, }]}>
                        <MaterialIcons name="date-range" color={styleColors.color} size={12} />
                        <Text style={[styles.dateText, {
                            color: styleColors.color,
                        }]}>{date}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: null }}>
                    <Text
                        ellipsizeMode="tail"
                        lineBreakMode='tail'
                        numberOfLines={1} style={[styles.titleText, {
                            color: styleColors.color,
                        }]}>{title}</Text>
                    <View >

                        {/* <Text style={[styles.detailsText, {
                        color: styleColors.color,
                    }]}>{details}</Text> */}
                        {/* <AudioWaves /> */}
                        {typeComponentHandler(type)}
                    </View>
                </View>

            </View>
            <TouchableOpacity activeOpacity={.5} style={[styles.button, {backgroundColor: styleColors.softFill}]}
                onPress={() => onPress && onPress()}
            >
                <Text style={[styles.buttonText, {color:styleColors.color}]}> details </Text>

            </TouchableOpacity>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        fontWeight:"500",
        color: Colors.lighter,
        // fon

    },
    button: {
        marginTop: 16,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 4,
        // backgroundColor: Colors.primary

    },
    subtitle: {
        color: Colors.red,
        backgroundColor: Colors.softRed,
        paddingHorizontal: 13,
        fontSize: 11,
        fontWeight: "500",
        borderRadius: 4,
        paddingVertical: 2,
        marginBottom: 4,
        marginEnd: 5,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 13,
        borderRadius: 4,
        paddingVertical: 4,
        marginBottom: 4,
        marginEnd: 5,

    },
    dateText: {
        fontSize: 10,
        fontWeight: "500",
        marginStart: 2,
    },
    amontText: {
        fontSize: 18,
        fontWeight: "500",
        marginHorizontal: 7,
    },
    detailsText: {
        fontSize: 14,
        // opacity: .8,
        fontWeight: "400"
    },
    titleText: {
        fontSize: 16,
        fontWeight: "600"
    },
    container: {
        // flexDirection
        alignItems: "stretch",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 9,
        marginVertical: 5,
        overflow: 'hidden'

    },
    flex: { flexDirection: 'row' },
    jCenter: { justifyContent: "center" },
    aCenter: { alignItems: "center" },
    imgContainer: {
        marginEnd: 7,
        borderRadius: 22,
        borderWidth: 2,
        overflow: 'hidden',
        alignItems: "center",
        justifyContent: "center",

    },
    dataImageConatiner: {
        overflow: 'hidden',
        alignItems: "center",
        marginEnd: 5,
        marginTop: 9,
        borderWidth: 2,
        borderRadius: 4
    },

    img: {
        height: 20,
        width: 20,
        // backgroundColor:'red',
    },
    imgText: {
        fontSize: 12,
        fontWeight: "500",
        opacity: .5

    }
})