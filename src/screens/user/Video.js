import { Dimensions, FlatList, Keyboard, useColorScheme, ActivityIndicator, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Clipboard from '@react-native-community/clipboard'
import { useKeyboard } from '../../hooks/useKeyboard'

import Modal from "react-native-modal";
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/theme/Colors'
import { Configuration, OpenAIApi } from 'openai';

import config from '../../config/openAI';
import { useToast } from 'react-native-toast-notifications'
import AppContext from '../../hooks/useContext'

import CheckBox from '../../components/checkbox/CheckBox';


export default function Content({ route, navigation }) {
    // let dirs = RNFetchBlob.fs.dirs
    const [edition, setEdition] = useState(true);

    const { data, date, ...otherParams } = route.params
    console.info("route.param", data)

    const toast = useToast();

    const { displayMode, styleColors } = React.useContext(AppContext)

    const deviceMode = useColorScheme()

    const mode = displayMode == "auto" ? deviceMode : displayMode



    const configuration = new Configuration({
        organization: config.organization,
        apiKey: config.OPENAI_API_KEY,

    });
    const openai = new OpenAIApi(configuration);

    const kb = useKeyboard();
    useEffect(() => {
        if (data) {
            setEdition(false);
            console.log('history');
            setResponse(data)
            setIsSummarize(data.summarize ? true : false)
            setIsText(data.text ? true : false)
            setVideoLink(data.url)
        }
    }, []);

    const [isLoading, setIsLoading] = useState(false)
    const [videoLink, setVideoLink] = useState('')
    const [error, setError] = useState('')


    const WH = Dimensions.get('window').height
    const WW = Dimensions.get('window').width



    const [visibleResult, setVisibleResult] = useState(false);

    const [isText, setIsText] = useState(false)
    const [isSummarize, setIsSummarize] = useState(true)

    const [copied, setCopied] = useState(false)
    const handleCopying = (text) => {
        Clipboard.setString(text)

        toast.show("Copied to clipbaord...", {
            type: "success",
            style:{backgroundColor:Colors.green},
            placement: "top",
            duration: 1000,
            offset: 30,
            // "zoom-in | slide-in",
            animationType: "slide-in",
        });
    };


    const isValidUrl = urlString => {
        try {
            return Boolean(new URL(urlString));
        }
        catch (e) {
            return false;
        }
    };

    const [response, setResponse] = useState({})


    const demoResponse = {
        type: 'text',
        text: `Lorem ipsum dolor sit amet consectetur. Amet quis purus est ats neque dicssim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum.
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            Lorem ipsum dolor sit amet consectetur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            `,
        summarize: `Lorem ipsum dolor sit amet consectetur. Amet quis purus est ats neque dicssim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum.
            ur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
            `
    }



    const handleGenerating = async () => {
        let isvalidVideoUrl = isValidUrl(videoLink)

        if (!isvalidVideoUrl) {
            setError("please enter a valid url")
            setTimeout(() => {
                setError("")

            }, 2000);
            return
        }
        let id = toast.show("Generating...", {
            type: "normal",
            placement: "top",
            duration: 1400,
            offset: 30,
            // "zoom-in | slide-in",
            animationType: "slide-in",
        });



        const requestOptions = {
            text: isText,
            summarize: isSummarize,
            link: videoLink
        }

        console.info('requestOptions', requestOptions)

        Keyboard.dismiss();
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }


    const [selectedResult, setSelectedResult] = useState({
        text: "",
        type: ""
    })

    const ReslutComponent = ({ type, numberOfLines = 4, selectedResult, draftIndex = 1 }) => {
        const styles = StyleSheet.create({
            conatiner: {
                backgroundColor: styleColors.placeholder,
                paddingVertical: 9,
                paddingHorizontal: 12,
                borderRadius: 9,
                marginVertical: 3,

            },
            typeTitleConatainer: {
                flexDirection: 'row',
                justifyContent: "flex-start",
                alignItems: "center",
            },
            typeTitle: {
                backgroundColor: 'rgba(250, 100, 100, .2)',
                color: 'rgba(250, 0, 0, 1)',
                padding: 1,
                fontWeight: "500",
                marginBottom: 5,
                paddingHorizontal: 11,
                paddingVertical: 5,
                alignSelf: "flex-end",
                borderRadius: 4,
                fontSize: 12,

            },
            textConatainer: {

            },
            text: {
                color: styleColors.color,
                textAlign: "justify"

            },
            actionContainer: {
                flexDirection: 'row',
                marginTop: 5,
                marginTop: 11,
            },
            actionTitle: {
                fontWeight: "500",
                fontSize: 12,
                marginEnd: 5,

            },
            copyButton: {
                backgroundColor: 'rgba(0, 214, 0, .1)',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15,
                borderRadius: 4,
                paddingVertical: 9,
                marginEnd: 7,
            },
            moreButton: {
                backgroundColor: 'rgba(110, 110, 110, .1)',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15,
                borderRadius: 4,
                paddingVertical: 5,
            },

        });



        const [copied, setCopied] = useState(false)
        const handleCopying = (text) => {
            setCopied(true)
            Clipboard.setString(text)
            toast.show("Copied to clipbaord...", {
                type: "success",
                style:{backgroundColor:Colors.green},
                placement: "top",
                duration: 1000,
                offset: 30,
                // "zoom-in | slide-in",
                animationType: "slide-in",
            });
            setTimeout(() => {
                setCopied(false)
            }, 1000);
        }
        return (
            <View style={styles.conatiner}>
                <View style={styles.typeTitleConatainer}>
                    <Text style={styles.typeTitle}>{type}</Text>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.textConatainer}>
                    <Text style={styles.text} ellipsizeMode="tail" lineBreakMode='tail' numberOfLines={numberOfLines}>{selectedResult.text}</Text>
                </View>
                <View style={styles.actionContainer}>
                    <View style={{ flex: 1 }} />

                    <Pressable style={styles.copyButton} onPress={()=>handleCopying(selectedResult.text)}>
                        <Text style={[styles.actionTitle, { color: Colors.green }]}>{copied ? "Copied" : "Copy"}</Text>
                        <Octicons name='copy' size={13} color={Colors.green} />
                    </Pressable>
                    <Pressable style={styles.moreButton} onPress={() => { setVisibleResult(true); setSelectedResult(selectedResult) }}>
                        <Text style={[styles.actionTitle, { color: styleColors.color }]}>More</Text>
                        <Feather name='more-vertical' size={13} color={'rgba(110, 110, 110, 1)'} />

                    </Pressable>

                </View>

            </View>
        )
    }

    const ResultModal = () => {
        const styles = StyleSheet.create({
            conatiner: {
                backgroundColor: styleColors.placeholder,
                padding: 15,
                paddingVertical: 18,
                paddingBottom: 18,
                borderRadius: 9,
                maxHeight: WH * .8

            },
            draftTitleConatainer: {
                flexDirection: 'row',
                justifyContent: "flex-start",
                alignItems: "center",
            },
            draftTitle: {
                backgroundColor: 'rgba(250, 100, 100, .2)',
                color: 'rgba(250, 0, 0, 1)',
                padding: 1,
                fontWeight: "500",
                marginBottom: 5,
                paddingHorizontal: 11,
                paddingVertical: 5,
                alignSelf: "flex-end",
                borderRadius: 4,
                fontSize: 12,

            },
            textConatainer: {

            },
            text: {
                color: styleColors.color,
                textAlign: "justify"

            },
            actionContainer: {
                flexDirection: 'row',
                marginTop: 5,
                marginTop: 11,
            },
            actionTitle: {
                fontWeight: "500",
                fontSize: 12,
                marginEnd: 5,

            },
            copyButton: {
                backgroundColor: 'rgba(0, 214, 0, .1)',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15,
                borderRadius: 4,
                marginStart: 5,
            },
            moreButton: {
                backgroundColor: 'rgba(110, 110, 110, .1)',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15,
                borderRadius: 4,
                paddingVertical: 9,
            },
            backButton: {
                backgroundColor: 'rgba(110, 110, 110, .1)',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15,
                borderRadius: 4,
                flex: 1,
                paddingVertical: 9,
            },

        })

        const [copied, setCopied] = useState(false)
        const handleCopying = (text) => {
            setCopied(true)
            Clipboard.setString(text)
            toast.show("Copied to clipbaord...", {
                type: "success",
                style:{backgroundColor:Colors.green},
                placement: "top",
                duration: 1000,
                offset: 30,
                // "zoom-in | slide-in",
                animationType: "slide-in",
            });
            setTimeout(() => {
                setCopied(false)
            }, 1000);
        }

        return (
            <Modal
                hasBackdrop
                hideModalContentWhileAnimating
                backdropColor={"rgba(10, 10, 10, .6)"}
                animationOut={"pulse"}
                animationIn={"pulse"}
                animationOutTiming={10}
                isVisible={visibleResult}
                onDismiss={() => setVisibleResult(false)}
            >

                <View style={styles.conatiner}>

                    <View style={styles.draftTitleConatainer}>
                        <Text style={styles.draftTitle}>{selectedResult.type}</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.textConatainer}>
                            <Text style={styles.text} >{selectedResult.text}</Text>
                        </View>
                    </ScrollView>
                    <View style={styles.actionContainer}>
                        <Pressable style={styles.backButton} onPress={() => setVisibleResult(false)}>
                            <Text style={[styles.actionTitle, { color: styleColors.color }]}>back</Text>
                        </Pressable>

                        <Pressable style={styles.copyButton} onPress={()=>handleCopying(selectedResult.text)}>
                            <Text style={[styles.actionTitle, { color: Colors.green }]}>{copied ? "Copied" : "Copy"}</Text>
                            <Octicons name='copy' size={13} color={Colors.green} />
                        </Pressable>
                    </View>

                </View>
            </Modal>
        )
    }

    return (
        <ScreenWrapper fill back title='Summarize Video'
            button={
                date
                &&
                <View style={[styles.dateContainer, { backgroundColor: styleColors.softFill, }]}>
                    <MaterialIcons name="date-range" color={styleColors.color} size={12} />
                    <Text style={[styles.dateText, {
                        color: styleColors.color,
                    }]}>{date}</Text>
                </View>
            }
        >


            {ResultModal()}

            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.mainContainer}
            >

                {/* <View style={styles.mainContainer}> */}

                <Text style={[styles.title, { color: styleColors.color }]}>Video Link:</Text>

                <View style={styles.urlContainer}>


                    <TextInput
                        value={videoLink}
                        editable={edition}
                        onChangeText={(value) => setVideoLink(value)}
                        multiline={true} // ios fix for centering it at the top-left corner 
                        numberOfLines={1}
                        placeholder={kb.isVisible ? 'past your video link here ...' : 'https:// ...'}
                        placeholderTextColor={styleColors.placeholderTextColor}
                        style={[styles.urlInput, {
                            backgroundColor: styleColors.placeholder,
                            color: styleColors.placeholderText,
                            borderColor: error ? Colors.red : styleColors.primary,
                        }]}
                    />
                    {!edition
                        &&
                        <Pressable style={styles.copyButton} onPress={()=>handleCopying(selectedResult)}>
                            <Octicons name='copy' size={13} color={Colors.green} />
                        </Pressable>
                    }

                    <Text style={{ color: Colors.red }}>{error}</Text>
                </View>



                <View style={styles.optionsContainer}>
                    <Text style={[styles.title, { color: styleColors.color, }]}>Options:</Text>
                    <CheckBox value={isText} disabled={!edition} onPress={() => setIsText(!isText)} title={"Text"} />
                    <CheckBox value={isSummarize} disabled={!edition} onPress={() => setIsSummarize(!isSummarize)} title={"Summarization"} />
                </View>

                {
                    !isLoading
                        ?
                        <View>
                            <Text style={[styles.title, { color: styleColors.color, }]}>Result:</Text>
                            {response.text && <ReslutComponent type={'Text'} numberOfLines={11} selectedResult={{ type: "Text", text: response.text }} />}
                            {response.summarize && <ReslutComponent type={'Summarization'} numberOfLines={11} selectedResult={{ type: "Summarization", text: response.summarize }} />}


                            {/* <ReslutComponent type="Summarization" selectedResult={{text:`Lorem ipsum dolor sit amet consectetur. Amet quis purus est ats neque dicssim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum.
                        ur. Amet quis purus est at neque dignissim hendrerit commodo. Leo cras mi ridiculus sed fringilla tempus non. Eu habitasse nec non pellentesque urna. Nunc eget cursus nec neque sed lorem. Porta eu mauris eu a in interdum
                        `, type:"Summarization"}}/> */}


                        </View>
                        :
                        <View style={styles.loadingContainer}>

                            <ActivityIndicator size={33} color={mode == "light" ? Colors.primary : Colors.lighter} />
                            <Text style={[styles.loadingText, { color: styleColors.color }]}>generating ...</Text>
                        </View>

                }






                <View style={{
                    height: kb.isVisible ? kb.height * 1.1 : 90,
                }} />


            </ScrollView>




            {edition
                &&
                <View style={[styles.generateButtonContainer, {
                    bottom: kb.isVisible ? kb.height * 1 + 20 : 0,
                    backgroundColor: styleColors.backgroundColor,
                    width: Dimensions.get('window').width,
                }]}>


                    <Pressable
                        disabled={!videoLink.length > 5}

                        android_ripple={{ color: 'rgba(40, 40, 40, .3)' }}
                        style={[styles.button, {
                            opacity: videoLink.length > 4 ? 1 : .2,
                            borderColor: mode == "dark" ? styleColors.color : undefined,
                            backgroundColor: mode == "light" ? styleColors.primary : undefined,
                        }]}
                        onPress={handleGenerating}
                    >
                        {/* {
                    isLoading
                    &&
                    <ActivityIndicator
                        color={styleColors.lighter}
                    />
                } */}

                        <Text style={[styles.buttonTitle, {
                            color: mode == "light" ? styleColors.backgroundColor : styleColors.color,
                        }]}>{isLoading ? "Generating ..." : "Generate"}</Text>


                    </Pressable>

                </View>}



        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
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
    copyButton: {
        backgroundColor: 'rgba(0, 214, 0, .1)',
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        // flex:1,
        borderRadius: 4,
        paddingVertical: 9,
        marginStart: 7,
    },
    optionsContainer: {
        marginBottom: 9,
    },
    loadingText: {
        marginTop: 18,
        fontSize: 16,
    },
    loadingContainer: {
        alignItems: "center",
        width: "100%",
        paddingVertical: 55,
        justifyContent: "center",
    },
    buttonTitle: {
        // color: styleColors.backgroundColor,
        fontSize: 16,
        zIndex: 55,
        marginStart: 7,
        fontWeight: "500"
    },
    button: {
        paddingHorizontal: 9,
        paddingVertical: 14,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 9
    },

    generateButtonContainer: {

        position: "absolute",
        left: 0,
        right: 0,
        paddingHorizontal: 14,
        zIndex: 11,
        paddingVertical: 5,
        paddingBottom: 19,
        justifyContent: 'center',
        alignSelf: 'center'
    },

    typesContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginBottom: 5,
    },
    numberText: {
        marginHorizontal: 5,
        padding: 10,
        fontSize: 22,
        textAlign: "center",
        fontWeight: "500",
        textAlignVertical: "center",
        verticalAlign: "middle",
        borderRadius: 8,
        marginVertical: 5,
        marginBottom: 11
    },
    numberButton: {
        padding: 8,
        backgroundColor: 'rgba(100, 100, 100, .15)',
        marginHorizontal: 3,
        borderRadius: 22,
        height: 44,
        width: 44,
        alignItems: "center",
        justifyContent: "center",
    },
    draftNumberContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',

    },
    premiumMessage: {
        color: Colors.red,
        fontSize: 14,
        textAlign: "center",
        fontWeight: "600",
        marginRight: 10,
    },
    urlContainer: {
        flex: 1,
        marginBottom: 11,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    urlInput: {
        // backgroundColor:'rgba(100, 100, 100, .041)',
        padding: 10,
        flex: 1,
        fontSize: 14,
        justifyContent: "flex-start",
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        verticalAlign: "top",
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 5,
        marginBottom: 5
    },
    typingContainer: {
        zIndex: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        paddingVertical: 8,
        // width:'100%',
        height: 'auto',
        // height:55,
        alignSelf: "center",
        borderRadius: 16,
        paddingHorizontal: 9,
        position: 'absolute',
        bottom: 40,

    },
    mainContainer: {

        // flex:1,
        paddingHorizontal: 14,
        paddingTop: 7,
        paddingBottom: 20,
    },
    titleContainer: {
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 15,
        marginBottom: 9,
        paddingBottom: 13,
        // backgroundColor:Colors.primary,
    },
    title: {
        fontSize: 18,
        // color:"#FFF",
        color: Colors.primary,
        fontWeight: "500",
        marginEnd: 11,
        marginBottom: 7,

    }
})