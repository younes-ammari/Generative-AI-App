import { Dimensions, FlatList, Keyboard, useColorScheme, ActivityIndicator, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Clipboard from '@react-native-community/clipboard'
import { useKeyboard } from '../../hooks/useKeyboard'

import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/theme/Colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Configuration, OpenAIApi } from 'openai';
import { TypingAnimation } from "react-native-typing-animation";

import config from '../../config/openAI';

import { useToast } from 'react-native-toast-notifications'
import AppContext from '../../hooks/useContext'

import Voice from '@react-native-community/voice';
import { CustomButton } from '../../components/Index'


export default function Content({ route, navigation }) {


    var date
    var data

    try {

        var { data, date, ...otherParams } = route.params
        if (data) {
            data = data

        }
        if (date) {
            date = date

        }
    }
    catch { }
    console.info("route.param", data)


    const [edition, setEdition] = useState(true);

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

    const [isLoading, setIsLoading] = useState(false)
    const [prompt, setPrompt] = useState("")

    const [costumType, setCostumType] = useState('')
    const [type, setType] = useState("")

    const [response, setResponse] = useState([])

    const [draftNumber, setDraftNumber] = useState(1)

    useEffect(() => {


        if (data) {
            setEdition(false);
            console.log('history')
            setResponse(data.content)
            setType(data.type)
            setDraftNumber(data.drafts)
            setPrompt(data.prompt)
        }

        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);



    const WH = Dimensions.get('window').height
    const WW = Dimensions.get('window').width

    const promptTypeRef = useRef()


    const [isRecording, setIsRecording] = useState(false)
    const [recording, setRecording] = useState(false);

    const [visibleResult, setVisibleResult] = useState(false);


    const speechStartHandler = e => {
        setRecording(true)

        console.log('speechStart successful', e);
    };
    const speechEndHandler = e => {
        setRecording(false);
        console.log('stop handler', e);
    };
    const speechResultsHandler = e => {
        const text = e.value[0];
        setResult(text);
        setPrompt(prompt + " " + text + " ")
        console.log('result', text)
    };
    const startRecording = async () => {
        // setLoading(true);
        try {
            setRecording(true);
            await Voice.start('en-Us');
        } catch (error) {
            console.log('error', error);
            setRecording(false);
        }
    };
    const stopRecording = async () => {
        // setRecording(false);
        try {
            await Voice.stop();
            setRecording(false);
        } catch (error) {
            setRecording(false);
            console.log('error', error);
        }
    };




    const handleRecordEvent = () => {
        if (edition) {
            var rec = isRecording
            setIsRecording(!isRecording)
            if (!rec) {
                console.log('start recording ...')
                startRecording()

            }
            else {
                console.log('end recording ...')
                stopRecording()
            }


        }
    }


    const types = ["Email", "Social Media Post", "Blog", "Title", "Paragraph", "Other"]

    const TypeComponent = ({ title = "title here", end = false, selected, setFunction }) => {

        const styles = StyleSheet.create({
            container: {
                paddingHorizontal: 11,
                paddingVertical: 11,
                marginRight: !end ? 7 : 0,
                borderRadius: 9,
                backgroundColor: title == selected ? Colors.primary : styleColors.placeholder,
                marginVertical: 4,
                // borderWidth:2,
                borderColor: 'rgba(100, 100, 100, .8)'

            },
            title: {
                fontSize: 15,
                fontWeight: "500",
                textAlign: "center",
                opacity: title == selected ? 1 : .9,
                color: title == selected ? Colors.lighter : styleColors.color,
            }
        })

        return (
            <Pressable disabled={!edition} style={styles.container} onPress={() => setFunction(title)} >
                <Text style={styles.title}>{title}</Text>
            </Pressable>
        )
    }



    const handleGenerating = async () => {
        Keyboard.dismiss()


    }


    const [selectedResult, setSelectedResult] = useState("")

    const ReslutComponent = ({ selectedResult, draftIndex = 1 }) => {
        const styles = StyleSheet.create({
            conatiner: {
                backgroundColor: styleColors.placeholder,
                paddingVertical: 9,
                paddingHorizontal: 12,
                borderRadius: 9,
                marginVertical: 3,

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
                paddingVertical: 7,
                marginEnd: 7,
            },
            moreButton: {
                backgroundColor: 'rgba(110, 110, 110, .1)',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15,
                borderRadius: 4,
                paddingVertical: 7,
            },

        });
        const [copied, setCopied] = useState(false)
        const handleCopying = (text) => {
            console.log("copying", text)
            setCopied(true)
            Clipboard.setString(text)
            toast.show("Copied to clipbaord...", {
                type: "success",
                style: { backgroundColor: Colors.green },
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
                <View style={styles.draftTitleConatainer}>
                    <Text style={styles.draftTitle}>Draft {draftIndex}</Text>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.textConatainer}>
                    <Text style={styles.text} ellipsizeMode="tail" lineBreakMode='tail' numberOfLines={5}>{selectedResult}</Text>
                </View>
                <View style={styles.actionContainer}>
                    <View style={{ flex: 1 }} />

                    <Pressable style={styles.copyButton} onPress={() => handleCopying(selectedResult)}>
                        <Text style={[styles.actionTitle, { color: 'rgba(0, 214, 0, 1)' }]}>{copied ? "Copied" : "Copy"}</Text>
                        <Octicons name='copy' size={13} color={'rgba(0, 214, 0, 1)'} />
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
                paddingVertical: 2,
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
                paddingVertical: 5,
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
                style: { backgroundColor: Colors.green },
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
                        <Text style={styles.draftTitle}>Draft 1</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.textConatainer}>
                            <Text style={styles.text} >{selectedResult}</Text>
                        </View>
                    </ScrollView>
                    <View style={styles.actionContainer}>
                        <Pressable style={styles.backButton} onPress={() => setVisibleResult(false)}>
                            <Text style={[styles.actionTitle, { color: styleColors.color }]}>back</Text>
                        </Pressable>

                        <Pressable style={styles.copyButton} onPress={() => handleCopying(selectedResult)}>
                            <Text style={[styles.actionTitle, { color: 'rgba(0, 214, 0, 1)' }]}>{copied ? "Copied" : "Copy"}</Text>
                            <Octicons name='copy' size={13} color={'rgba(0, 214, 0, 1)'} />
                        </Pressable>
                    </View>

                </View>
            </Modal>
        )
    }

    return (
        <ScreenWrapper fill back title='Content Generator'
            button={date && <View style={[styles.dateContainer, { backgroundColor: styleColors.softFill, }]}>
                <MaterialIcons name="date-range" color={styleColors.color} size={12} />
                <Text style={[styles.dateText, {
                    color: styleColors.color,
                }]}>{date}</Text>
            </View>}
        >


            {ResultModal()}

            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{
                    paddingBottom: 55,
                }}
            >

                <View style={[styles.chatContainer, {
                    flex: 1,
                    paddingHorizontal: 14,
                    paddingTop: 7,
                }]}>

                    {isRecording
                        &&
                        <View style={styles.recordingContainer}>

                            <TypingAnimation
                                dotMargin={9}
                                dotColor={Colors.lighter}

                            />
                        </View>
                    }

                    <Text style={[styles.title, { color: styleColors.color, }]}>Type:</Text>
                    <View style={styles.typesContainer}>
                        {types.map((el, i) => <TypeComponent selected={type} setFunction={setType} key={i} title={el} end={i == (types.length - 1)} />)}
                    </View>

                    {
                        type == "Other"
                        &&
                        <TextInput
                            value={costumType}
                            onChangeText={(value) => setCostumType(value)}
                            multiline={true} // ios fix for centering it at the top-left corner 
                            numberOfLines={1}
                            placeholder={'type here what you want ...'}
                            placeholderTextColor={styleColors.placeholderTextColor}
                            style={[styles.expressionContainer, {
                                backgroundColor: styleColors.placeholder,
                                color: styleColors.placeholderText,
                                borderColor: styleColors.primary,
                            }]}
                        />
                    }

                    {
                        draftNumber > 3
                        &&
                        <Text style={styles.premiumMessage}>require premium subscription</Text>
                    }

                    <View style={styles.draftNumberContainer}>
                        <Text style={[styles.title, { color: styleColors.color, }]}>Draft Number:</Text>
                        <Pressable disabled={!edition} style={styles.numberButton} onPress={() => setDraftNumber(draftNumber + 1)}>
                            <Icon name='plus' size={17} color={styleColors.color} />
                        </Pressable>

                        <Text style={[styles.numberText, {
                            color: styleColors.color,
                        }]}>{draftNumber}</Text>

                        <Pressable disabled={!edition} style={styles.numberButton} onPress={() => setDraftNumber(draftNumber > 1 ? draftNumber - 1 : 1)} >
                            <Icon name='minus' size={17} color={styleColors.color} />
                        </Pressable>
                    </View>



                    <Text style={[styles.title, { color: styleColors.color, }]}>Expression:</Text>

                    <View style={{
                        flexDirection: 'row',
                        // alignItems:"center",
                        justifyContent: "space-between"
                    }}>


                        <TextInput
                            editable={edition}
                            value={prompt}
                            ref={promptTypeRef}
                            onChangeText={(value) => setPrompt(value)}
                            multiline={true} // ios fix for centering it at the top-left corner 
                            numberOfLines={7}
                            placeholder={isRecording ? "start talking ..." : kb.isVisible && promptTypeRef.current.isFocused() ? 'Write what you want ...' : 'type here what you want ...'}
                            placeholderTextColor={styleColors.placeholderTextColor}
                            style={[styles.expressionContainer, {
                                backgroundColor: styleColors.placeholder,
                                color: styleColors.placeholderText,
                                borderColor: styleColors.primary,
                            }]}
                        />

                        <TouchableOpacity style={[styles.recordButton, {
                            backgroundColor: isRecording ? 'rgba(250, 100, 100, .2)' : 'rgba(100, 100, 100, .2)',
                            opacity: edition ? 1 : .2,
                        }]}
                            disabled={!edition}
                            onPress={handleRecordEvent}
                        >
                            <Ionicons name="mic" size={17} color={isRecording ? 'red' : styleColors.color} />
                        </TouchableOpacity>
                    </View>




                    <Text style={[styles.title, { color: styleColors.color, }]}>Result:</Text>
                    {
                        response.map((el, i) =>
                            <ReslutComponent key={i} draftIndex={i + 1} selectedResult={el} />)
                    }


                </View>

                <View style={{

                    flexDirection: 'row',
                    alignItems: "center",
                    marginHorizontal: 14,
                    flexWrap: 'wrap',
                    justifyContent: "space-between",
                    paddingBottom: 11,
                }}>




                    {
                        isLoading
                            ?
                            <View style={{
                                alignItems: "center",
                                width: "100%",
                                paddingVertical: 55,
                                justifyContent: "center",
                            }}>

                                <ActivityIndicator size={55} color={Colors.primary} />
                                <Text style={{
                                    marginTop: 18,
                                    fontSize: 16,
                                }}>generating ...</Text>
                            </View>
                            :
                            <></>
                    }
                </View>







                <View style={{
                    height: kb.isVisible ? kb.height * 1.1 : 90,
                }} />


            </ScrollView>




            {
                edition
                && <View style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: Dimensions.get('window').width,
                }}>

                    <CustomButton
                        disabled={!prompt.length > 5}
                        style={{ opacity: prompt.length > 4 ? 1 : .2, }}
                        onPress={handleGenerating}
                        label={isLoading ? "Generating ..." : "Generate"}
                        isLoading={isLoading}
                    />
                    

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
    recordingContainer: {
        width: "100%",
        backgroundColor: 'red',
        paddingVertical: 9,
        paddingBottom: 29,
        opacity: .8,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5,
        marginBottom: 5,
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
    recordButton: {
        opacity: .5,
        paddingHorizontal: 13,
        borderRadius: 8,
        height: 44,
        zIndex: 2,
        borderRadius: 44,
        paddingVertical: 5,
        marginStart: 9,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row'
    },
    expressionContainer: {
        // backgroundColor:'rgba(100, 100, 100, .041)',
        padding: 10,
        flex: 1,
        fontSize: 15,
        justifyContent: "flex-start",
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        verticalAlign: "top",
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 5,
        marginBottom: 11
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
    chatContainer: {
        flex: 1,
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