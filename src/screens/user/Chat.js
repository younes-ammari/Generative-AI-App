import { FlatList, Keyboard, LogBox, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Message from '../../components/chat/Message'

import { useKeyboard } from '../../hooks/useKeyboard'
import TypeWriter from '../../components/chat/TypeWriter'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/theme/Colors'
import { TypingAnimation } from "react-native-typing-animation";
import { Configuration, OpenAIApi } from "openai"
import config from '../../config/openAI'
import AppContext from '../../hooks/useContext'

import Voice from '@react-native-community/voice';
import images from '../../assets/Index'
import Layout from '../../constants/theme/Layout'
import { RecordButton } from '../../components/Index'
import Element from '../../components/dropdown/dropDown.Element'


export default function Chat({ navigation }) {
    const configuration = new Configuration({
        apiKey: config.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const history = [{
        content: "hello",
        isRespond: true,
    }];

    const kb = useKeyboard();
    const scrollViewRef = useRef();
    const inputRef = useRef();
    const scrollViewChatRef = useRef();

    const [isWriting, setIsWriting] = useState(false)
    const delay = 50

    const [message, setMessage] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    const { displayMode, styleColors, appData } = useContext(AppContext)

    // Get Device Display Mode
    const deviceMode = useColorScheme()

    const mode = displayMode == "auto" ? deviceMode : displayMode



    const speechStartHandler = e => {

        console.log('speechStart successful', e);
    };
    const speechEndHandler = e => {
        setIsRecording(false)
        console.log('stop handler', e);
    };

    const speechResultsHandler = e => {
        const text = e.value[0];
        let newMessage = message + " " + text + " "
        setMessage(newMessage)
        console.log('result', text)
        console.log('newMessage', newMessage)
    };

    const startRecording = async () => {
        setIsRecording(true);
        try {
            await Voice.start('en-Us');
        } catch (error) {
            console.log('error', error);
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
            setIsRecording(false);
        } catch (error) {
            console.log('error', error);
        }
    };

    const clear = () => {
        setMessage('')
    };


    useEffect(() => {

        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);


    // Scroll to the bottom when the keyboard is displayed
    // Important to let the user always seeing his last message
    if (kb.isVisible) {
        scrollViewRef.current.scrollToEnd({ animated: true })
    }


    const [data, setData] = useState([{
        id: 0,
        isRespond: true,
        content: `Hey ${appData.user.displayName}, how can i assist you !`,
        role: "assistant"
    }])

    const messages = [];


    const handleChat = async () => {
        const user_input = message;
        var i = 0
        var old = []
        var maxID = data.length > 0 ? Math.max(...data.map(el => el.id)) : 1
        var oldData = data
        var newData = [...oldData,
        {
            id: maxID + 1,
            role: "user",
            isRespond: false,
            content: user_input
        },
        {
            id: maxID + 2,
            role: "assistant",
            isRespond: true,
            content: ""
        },
        ]

        setData(newData)


        messages.push({ role: "user", content: user_input });

        setIsLoading(true)
        try {
            var mes = newData.map(el => {
                if (!el.role) { el.role = 'user' }
                return { role: el.role, content: el.content }
            })
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: mes,
            });

            const completion_text = completion.data.choices[0].message.content;

            history.push([user_input, completion_text]);

            newData[newData.length - 1] = {
                id: maxID + 2,
                isRespond: true,
                content: completion_text
            }
            setData(newData)

        } catch (error) {
            var errorMessage = error.response.data.error.message
            history.push([user_input, errorMessage]);

            newData[newData.length - 1] = {
                id: maxID + 2,
                isRespond: true,
                content: errorMessage
            }
            console.log('last', newData[newData.length - 1])
            setData(newData)

            if (error.response) {
                console.log(error.response.status);
                console.log(errorMessage);
            } else {
                console.log(error.message);
            }
        }
        setIsLoading(false)
    }

    const handleSendEvent = () => {
        var maxID = data.length > 0 ? Math.max(...data.map(el => el.id)) : 1
        // console.log(maxID)
        var oldData = data

        if (message.length > 3) {
            handleChat();

            setMessage('')
            Keyboard.dismiss()
        }
        console.log("model", model, oldData)
    }


    const handleRecordEvent = () => {
        var rec = !isRecording
        setIsRecording(!isRecording)
        if (rec) {
            console.log('start recording ...')
            startRecording()

        }
        else {
            console.log('end recording ...')
            stopRecording()
        }
        setTimeout(() => {
        }, 2000);


    }

    const [show, setShow] = React.useState(false)



    const handleShow = () => {
        if (show == false) {

            setShow(true)
            console.log('show')
            // setTimeout(() => {
            //     console.log('hide')
            //     setShow(false)

            // }, 2500);
        }
        else {
            setShow(false)

        }
    }


    const models = [
        {
            title: "GPT 3",
            value: "gpt3",
            image: images.models.gpt3
        },
        {
            title: "GPT 3.5",
            value: "gpt3.5",
            image: images.models.gpt3_5
        },
        {
            title: "GPT 4",
            value: "gpt4",
            image: images.models.gpt4
        },
        
    ]



    const [model, setModel] = useState("gpt3.5")



    return (
        <ScreenWrapper fill back title="Chat"
            button={
                <View style={[styles.gptModelContainer, {
                    backgroundColor: show ? styleColors.backgroundColor : styleColors.softFill,
                    borderRadius: Layout.radius.medium,
                    elevation: show ? 7 : 0,
                }]}>

                    <TouchableOpacity
                        disabled={data.length > 1}
                        style={[styles.gptModelButton, { opacity: data.length > 1 ? .4 : 1 }, show && {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,

                        }]}
                        onPress={() => { handleShow() }}
                    >
                        <View style={styles.modelContainer}>
                            <Image
                                source={models.filter(el => el.value == model)[0].image}
                                style={styles.modelImage}
                            />
                            <Text style={[styles.modelTitle, { color: styleColors.color }]}>{models.filter(el => el.value == model)[0].title}</Text>
                        </View>
                        <Ionicons name={"caret-down-outline"} size={17} color={mode == "dark" ? Colors.lighter : Colors.primary}
                        />
                    </TouchableOpacity>
                    {
                        show
                        &&
                        <View style={styles.gptModeldropdown}>
                            {
                                models.map((el, i) =>
                                    <Element key={i} image={el.image} selected={model == el.value} label={el.title} onPress={() => {
                                        setModel(el.value);
                                        setShow(false)
                                    }} />)}

                        </View>
                    }
                </View>
            }
        >


            <ScrollView
                keyboardShouldPersistTaps='handled'
                ref={scrollViewRef}

            >
                <View style={styles.chatContainer}>




                    <FlatList
                        ref={scrollViewChatRef}
                        nestedScrollEnabled
                        data={data}
                        keyExtractor={el => el.id}
                        renderItem={({ item }) => {
                            var maxID = Math.max(...data.map(el => el.id))
                            return (
                                isLoading && item.id >= maxID
                                    ?
                                    <Message isLoading respond text={item.content} />
                                    :

                                    item.id >= maxID && item.isRespond
                                        ?
                                        <TypeWriter scrollRef={scrollViewChatRef} delay={delay} text={item.content} isWriting={(state) => setIsWriting(state)} />
                                        :
                                        <Message respond={item.isRespond} text={item.content} />
                            )

                        }
                        }
                        style={{
                            paddingVertical: kb.isVisible ? 10 : 0,
                        }}
                    />


                    {isRecording
                        &&
                        <View style={styles.recordingContainer}>
                            <TypingAnimation
                                dotMargin={9}
                                dotColor={Colors.lighter}
                            />
                        </View>
                    }
                </View>


                {/* Used to fit the height occupied by the the keyboard */}
                <View style={{
                    height: kb.isVisible ? kb.height * 1 : 90,
                }} />

            </ScrollView>



            {/* Typing Container + Record Button + Send Button */}
            <View style={[styles.typingContainer, {
                backgroundColor: styleColors.placeholder,
                position: kb.isVisible ? "relative" : "absolute",
                bottom: kb.isVisible ? kb.height * 1 : 0,
                paddingBottom: kb.isVisible ? 20 : 33,
            }]}>
                <TextInput
                    multiline
                    ref={inputRef}
                    placeholderTextColor={'rgba(100, 100, 100, .5)'}
                    style={[styles.chatInput, {
                        borderWidth: kb.isVisible ? 1 : 0,
                        color: styleColors.color,

                    }]}
                    placeholder={isRecording ? "start talking ..." : kb.isVisible ? "write a message ..." : 'click here to start a conversation ...'}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    keyboardAppearance={mode}
                />

                {message.length > 4 &&
                    <TouchableOpacity style={[styles.clearButton, {
                        backgroundColor: styleColors.color,
                    }]}
                        onPress={clear}
                    >

                        <Ionicons name="close" size={11} color={styleColors.backgroundColor} />
                    </TouchableOpacity>}
                {/* </View> */}

                <RecordButton isRecording={isRecording} onPress={handleRecordEvent} />


                <TouchableOpacity style={[styles.sendButton, {
                    opacity: message.length < 4 || isWriting ? .2 : 1,
                    display: !kb.isVisible ? "none" : "flex",
                }]}
                    disabled={message.length < 4 || isWriting}
                    onPress={handleSendEvent}
                >

                    <FontAwesome name="send" size={17} color={"#FFF"} />
                </TouchableOpacity>


            </View>

        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    gptModeldropdown: {
        minWidth: 120,
        width: "100%",
        borderRadius: Layout.radius.medium,
    },
    gptModelButton: {
        zIndex: 66,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        padding: Layout.padding.small,
        borderRadius: Layout.radius.medium,
        paddingHorizontal: Layout.padding.medium,
    },
    gptModelContainer: {
        borderRadius: Layout.radius.medium,
    },
    sendButton: {
        paddingHorizontal: Layout.padding.medium,
        borderRadius: Layout.radius.medium,
        height: 44,
        zIndex: 2,
        paddingVertical: Layout.padding.small,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#0b67f5',
        flexDirection: 'row'
    },
    clearButton: {
        position: "absolute",
        right: 133,
        top: 28,
        opacity: .7,
        zIndex: 11,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Layout.radius.large,
        height: 18,
        width: 18
    },
    chatInput: {
        flexWrap: "wrap",
        flex: 1,
        marginRight: Layout.margin.small,
        borderColor: "rgba(100, 100, 100, .7)",
        borderRadius: Layout.radius.small,
        paddingHorizontal: Layout.padding.medium,
        paddingVertical: Layout.padding.small,
        zIndex: 1
    },
    modelImage: {
        height: 25,
        width: 25,
        borderRadius: Layout.radius.medium,
    },
    modelContainer: {
        paddingEnd: Layout.padding.medium,
        flexDirection: 'row',
        alignItems: "center",
        minWidth: 100,

    },
    modelTitle: {
        fontSize: Layout.font.h2,
        color: Colors.primary,
        fontWeight: "700",
        marginStart: Layout.margin.small,

    },
    recordingContainer: {
        width: "100%",
        backgroundColor: 'red',
        paddingVertical: Layout.padding.large,
        opacity: .8,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5,
        paddingBottom: Layout.padding.xlarge,
    },

    typingContainer: {
        zIndex: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        paddingVertical: Layout.padding.medium,
        alignSelf: "center",
        paddingHorizontal: Layout.padding.medium

    },
    chatContainer: {
        flex: 1,
    },
    titleContainer: {
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: Layout.padding.medium,
        marginBottom: Layout.margin.small,
        paddingBottom: Layout.padding.medium,
    },
    title: {
        fontSize: Layout.font.h1,
        color: Colors.primary,
        fontWeight: "500"

    }
})