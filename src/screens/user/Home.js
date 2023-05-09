import { StyleSheet, Text, ScrollView, useColorScheme, Pressable, ImageBackground, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import CardImage from '../../components/cards/CardImage'
import CardNew from '../../components/cards/CardNew'
import Colors from '../../constants/theme/Colors'
import AppContext from '../../hooks/useContext'

import Ionicons from 'react-native-vector-icons/Ionicons'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Logo from '../../components/logo/Logo'
import Images from '../../assets/Index'
import Layout from '../../constants/theme/Layout'

export default function Home({ route, navigation }) {

    const {
        styleColors,
        appData,
    } = useContext(AppContext)


    console.log('appData', appData)

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>

                    <View style={styles.upperContainer}>
                        <Pressable style={styles.drawerButton}
                            android_ripple={{ color: styleColors.androideRippleColor }}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Ionicons name="menu" size={29} color={styleColors.header.backIconColor} />
                        </Pressable>


                        {/* <Logo /> */}
                        <Pressable style={styles.coinsContainer}
                            onPress={() => navigation.navigate('Coins')}
                        >
                            <Text style={[styles.coinsNumber, { color: styleColors.color }]}>{appData.user.coins}</Text>
                            <FontAwesome5 name={"coins"} size={20} color={styleColors.color} />
                        </Pressable>
                    </View>

                    <ImageBackground style={styles.welcomeContainer}
                        imageStyle={{
                            overflow: 'hidden',
                            opacity: .9
                        }}
                        source={Images.welcomeBackground}
                        resizeMode='cover'
                    >


                        <View style={{
                            width: "100%",
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={styles.mediumTitle}>Welcome </Text>
                                <Text style={styles.mediumBoldTitle}>{appData.user.displayName}! </Text>
                            </View>
                            <Text style={styles.largTitle}>Great to see you again </Text>
                        </View>
                    </ImageBackground>

                    <CardImage
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='ChatGPT'
                        subtitle='direct chat, anytime, lots of features '
                        imageSource={Images.chatGPT}
                        onPress={() => navigation.navigate("Chat")}
                    />
                    <CardImage
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='Generate Image'
                        subtitle='Create beautiful art and images with AI in different art styles quickl'
                        imageSource={Images.imageGen}
                        onPress={() => navigation.navigate("ImageGen")}
                    />
                    <CardImage
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='AI Voiceover Generator'
                        subtitle='Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages'
                        imageSource={Images.voiceGen}
                        onPress={() => navigation.navigate("VoiceGen")}
                    />
                    <CardImage
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='Content Creation'
                        subtitle='Create different types of content – both long and short-form'
                        imageSource={Images.contentGen}
                        onPress={() => navigation.navigate("Content")}
                    />
                    <CardImage
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='Video summarize'
                        subtitle='Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.'
                        imageSource={Images.summarize}
                        onPress={() => navigation.navigate("Video")}
                    />
                    <CardImage
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='Generate Video'
                        subtitle='Create AI-generated videos quickly using simple text'
                        soon
                        imageSource={Images.videoGen}
                    />

                    <Text style={[styles.largTitle, {
                        color: styleColors.color,
                        marginTop: Layout.margin.small,
                    }]}>Added New </Text>

                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollNewContainer}>

                    <CardNew
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='Video summarize'
                        subtitle='Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.'
                        imageSource={Images.summarize}
                        onPress={() => navigation.navigate("NewInfo", {
                            info: {
                                screen: "Home",
                                title: 'Video summarize',
                                imageSource: Images.summarize,
                                subtitle: 'Get a summary of any long YouTube video, like a lecture, live event or a government meeting. Powered by ChatGPT.',


                            }
                        })}
                    />
                    <CardNew
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='AI Voiceover Generator'
                        subtitle='Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages'
                        imageSource={Images.voiceGen}
                        onPress={() => navigation.navigate("NewInfo", {
                            info: {
                                screen: "AIVoiceGen",
                                title: 'AI Voiceover Generator',
                                subtitle: 'Transform your content with high-quality, AI generated voiceovers, professional voices in 100 languages',
                                imageSource: Images.voiceGen,


                            }
                        })}
                    />
                    <CardNew
                        color={styleColors.color}
                        backgroundColor={Colors.primary}
                        title='Generate Image'
                        subtitle='Create beautiful art and images with AI in different art styles quickl'
                        imageSource={Images.imageGen}
                        onPress={() => navigation.navigate("NewInfo", {
                            info: {
                                screen: "ImageGen",
                                title: 'Generate Image',
                                subtitle: 'Create beautiful art and images with AI in different art styles quickl',
                                imageSource: Images.imageGen,


                            }
                        })}
                    />


                </ScrollView>

            </ScrollView>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    largTitle: {
        fontSize: 22,
        color: Colors.lighter,
        fontWeight: "600"

    },
    mediumTitle: {
        fontSize: 18,
        color: Colors.lighter,
        fontWeight: "400"
    },
    mediumBoldTitle: {
        fontSize: 18,
        color: Colors.lighter,
        fontWeight: "600"
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: Layout.margin.large,
        borderRadius: Layout.radius.medium,
        minHeight: 111,
        overflow: 'hidden',
        justifyContent: "center",
        paddingHorizontal: Layout.padding.medium,
        marginBottom: Layout.margin.large,
    },
    scrollNewContainer: {
        paddingHorizontal: Layout.padding.medium,
    },
    scrollContainer: {
        paddingBottom: Layout.padding.medium,
    },
    container: {
        paddingHorizontal: Layout.padding.medium,
    },
    upperContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: Layout.padding.small,
    },
    drawerButton: {
        zIndex: 16,
        alignItems: "center",
        justifyContent: "center",

    },
    coinsContainer: {
        justifyContent: "center",
        alignItems: 'flex-end',
        alignSelf: "flex-end",
        flexDirection: 'row',
    },
    coinsNumber: {
        fontSize: 18,
        marginEnd: Layout.margin.small,
        fontWeight: "500",

    }
})