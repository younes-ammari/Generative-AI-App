import { Dimensions, Keyboard, ActivityIndicator, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'

import { useKeyboard } from '../../hooks/useKeyboard'

import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/theme/Colors'


import { Configuration, OpenAIApi } from 'openai';
import config from '../../config/openAI';

import { TypingAnimation } from "react-native-typing-animation";


// used to convert speech to text
import Voice from '@react-native-community/voice';

// for saving the sound
import RNFetchBlob from 'rn-fetch-blob';

// toast message
import { useToast } from 'react-native-toast-notifications'

import AppContext from '../../hooks/useContext'
import { CustomButton, Size } from '../../components/Index';
import Layout from '../../constants/theme/Layout';
import { getExtention } from '../../functions/Index';



export default function ImageGen({ navigation }) {
    const toast = useToast();

    const { styleColors } = React.useContext(AppContext)


    const configuration = new Configuration({
        organization: config.organization,
        apiKey: config.OPENAI_API_KEY,

    });
    const openai = new OpenAIApi(configuration);



    const kb = useKeyboard();
    const [visible, setIsVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)


    const [respond, setRespond] = useState([])
    const [prompt, setPrompt] = useState('')
    const [number, setNumber] = useState(1)
    const [size, setSize] = useState("1024x1024")
    const [isPremium, setIsPremium] = useState(false)
    const [selectedImage, setSelectedImage] = useState({ url: "https://Images.nightcafe.studio/jobs/rY2TxlazqPUzLomNPmnM/rY2TxlazqPUzLomNPmnM--1--gs4f2.jpg?tr=w-640,c-at_max" })

    const [recording, setRecording] = useState(false);



    const [isRecording, setIsRecording] = useState(false)


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
        setPrompt(prompt + " " + text + " ")
        console.log('result', text)
    };
    const startRecording = async () => {
        try {
            setRecording(true);
            await Voice.start('en-Us');
        } catch (error) {
            setRecording(false);
            console.log('error', error);
        }
    };
    const stopRecording = async () => {
        try {
            await Voice.stop();
            setRecording(false);
        } catch (error) {
            console.log('error', error);
        }
    };

    
    const clear = () => {
        setPrompt('')
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


    const handleGenerating = async () => {
        Keyboard.dismiss()

        setIsLoading(true)
        try {
            const response = await openai.createImage({
                prompt: prompt,
                n: number,
                size: size,
            })

            var resp = response.data.data
            setRespond(resp)
            console.log(resp)
        }
        catch (error) {
            console.error("error", error)
        }
        setIsLoading(false)
    }



    const sizes = [
        "1024x1024",
        "512x512",
        "256x256",
    ]

    const GeneratedImageComponent = ({ info }) => {
        var url = "https://user-Images.githubusercontent.com/3059371/49334754-3c9dfe00-f5ab-11e8-8885-0192552d12a1.gif"

        return (
            <Pressable
                android_ripple={{ color: 'rgba(100, 100, 100, .7)', }}
                style={{
                    // flex:1,
                    maxWidth: (Dimensions.get('window').width / 2) - 21,
                    width: (Dimensions.get('window').width / 2) - 21,
                    backgroundColor: `rgba(220, 220, 220, 1)`,
                    marginBottom: 9,
                    elevation: 5,
                }}
                onPress={() => {
                    setSelectedImage(info)
                    setIsVisible(true);
                    console.log('pressed ')
                }}
            >
                <Image
                    source={{ uri: info.url }}
                    resizeMode="center"
                    style={{
                        zIndex: 1,
                        width: "100%",
                        height: 150,
                        backgroundColor: `rgba(${Colors.rgb.primary}, .05)`,
                        borderRadius: 9,
                        borderWidth: 1.1,
                        borderColor: `rgba(${Colors.rgb.primary}, .8)`,
                    }}
                />
                <ActivityIndicator
                    color={Colors.lighter}
                    size={44}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }}
                />
            </Pressable>
        )
    }

    const modall = () => {
        return (
            <Modal
                isVisible={visible}
                coverScreen={true}
                onBackButtonPress={() => setIsVisible(false)}
                onDismiss={() => setIsVisible(false)}
                deviceHeight={Dimensions.get('window').height * 1.5}
                animationIn="fadeInUp"
            >
                <View style={{
                    zIndex: 11,
                    width: Dimensions.get('window').width * .8,
                    alignSelf: "center",
                    backgroundColor: Colors.lighter,
                    borderRadius: 9,
                    paddingHorizontal: 11,
                    paddingVertical: 11,
                    alignItems: "center",
                }}>
                    <Image
                        source={{ uri: selectedImage.url }}
                        resizeMode="cover"
                        style={{
                            width: Dimensions.get('window').width * .74,
                            height: Dimensions.get('window').width * .74,
                            backgroundColor: `rgba(${Colors.rgb.primary}, .05)`,
                            borderRadius: 9,
                            borderWidth: 1.1,
                            borderColor: `rgba(${Colors.rgb.primary}, .8)`,
                        }}
                    />

                    <ActivityIndicator
                        color={Colors.lighter}
                        size={66}
                        style={{
                            zIndex: -1,
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 40,
                            top: 0
                        }}
                    />
                    <View style={{

                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: '100%',
                    }}>
                        <Pressable

                            android_ripple={{ color: 'rgba(40, 40, 40, .3)' }}
                            style={{
                                paddingHorizontal: 9,
                                paddingVertical: 14,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: Colors.red,
                                borderRadius: 9,
                                marginTop: 55,
                                width: "75%",
                            }}
                            onPress={() => setIsVisible(false)}
                        >

                            <Text style={{
                                color: Colors.lighter,
                                fontSize: 16,
                                fontWeight: "500"
                            }}>Back</Text>


                        </Pressable>
                        <Pressable

                            android_ripple={{ color: 'rgba(40, 40, 40, .3)' }}
                            style={{
                                paddingHorizontal: 9,
                                paddingVertical: 14,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: 'rgba(30, 200, 30, .9)',
                                borderRadius: 9,
                                marginTop: 55,
                                width: "20%",
                            }}
                            onPress={() => handleDownload()}
                        >
                            {
                                isDownloading
                                    ?
                                    <ActivityIndicator color={Colors.lighter} size={21} />
                                    :
                                    <OcticonsIcon name='download' size={22} color={Colors.lighter} />
                            }


                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    };


    const checkPermission = async (url) => {

        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission

        if (Platform.OS === 'ios') {
            downloadImage(url);
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    downloadImage(url);
                } else {
                    // If permission denied then show alert
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };

    const downloadImage = (url) => {
        // Main function to download the image

        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download

        let image_URL = url;

        // Getting the extention of the file
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        // let  fileName = 'image_'+ Math.floor(date.getTime() + date.getSeconds() / 2) + ".jpg"
        let fileName = 'generatedImage_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext
        // let PictureDir = fs.dirs.PictureDir;

        const { config, fs } = RNFetchBlob;
        // console.log('fs.dirs')
        console.log('fileName', fileName)
        // const destPath = RNFetchBlob.fs.dirs.DownloadDir + '/ChatGPT App/' + fileName;
        const destPath = fs.dirs.DownloadDir + '/ChatGPT App/Images/' + fileName;
        // console.log('fs.dirs.PictureDir', fs.dirs.DCIMDir , "\n", destPath)

        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path: destPath,
                description: `Image generated by AI tools with a prompt of ${prompt}`,
            },
        };
        config(options)
            .fetch('GET', image_URL)
            .then(res => {
                // Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                setIsDownloading(false)
                // alert('Image Downloaded Successfully.');
            })
            .catch(error => {
                console.log('error fetch', error)
                setIsDownloading(false)
            });
    };



    const handleDownload = () => {
        link = "https://miro.medium.com/v2/resize:fit:648/1*5YV51BTLjYx_dQjfbaPiEw.png"
        setIsDownloading(true)
        console.log(selectedImage.url)
        setTimeout(() => {
            setIsVisible(false)

        }, 800);
        let id = toast.show("Downloading...", {
            type: "normal",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
        });



        setTimeout(() => {
            try {
                checkPermission(selectedImage.url)

                // "normal | success | warning | danger | custom",
                toast.update(id, "Successfully downloaded \n To : ChatGPT App", {
                    type: "success",
                });
            } catch (error) {
                console.log('download error', error)
                toast.update(id, "Error while downloading", {
                    type: "danger",
                });

            }

            setIsDownloading(false)


        }, 1000);
    };



    const handleRecordEvent = () => {
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







    return (
        <ScreenWrapper fill back title='Image Generator'>


            {/* Details modal for the image you clicked */}

            {modall()}

            <ScrollView>

                <View style={styles.chatContainer}>


                    {/* Recording container  */}

                    {
                        isRecording
                        &&
                        <View style={styles.recordingContainer}>
                            <TypingAnimation
                                dotMargin={9}
                                dotColor={Colors.lighter}

                            />
                        </View>
                    }


                    {/* Prompt */}

                    <View style={styles.promptContainer}>

                        <TextInput
                            value={prompt}
                            onChangeText={(value) => setPrompt(value)}
                            multiline={true} // ios fix for centering it at the top-left corner 
                            numberOfLines={7}
                            placeholder={isRecording ? "start talking ..." : kb.isVisible ? 'Write a prompt here ...' : 'click here to start a conversation ...'}
                            placeholderTextColor={styleColors.placeholderTextColor}
                            style={[styles.prompt, {
                                backgroundColor: styleColors.placeholder,
                                color: styleColors.placeholderText,
                                borderColor: styleColors.primary,

                            }]}
                        />
                        <View>


                            <TouchableOpacity style={[styles.recordingButton, {
                                backgroundColor: isRecording ? 'rgba(250, 100, 100, .2)' : 'rgba(100, 100, 100, .2)',
                            }]}
                                onPress={handleRecordEvent}
                            >

                                <Ionicons name="mic" size={17} color={isRecording ? 'red' : styleColors.color} />
                            </TouchableOpacity>
                            {prompt.length > 2
                                &&
                                <TouchableOpacity style={styles.clearButton}
                                    onPress={clear}
                                >

                                    <Ionicons name="close" size={17} color={styleColors.color} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    {/* Premium Message 
                        >> displayed when the images number exceed certain number (you('ve choosen it)
                    */}
                    {
                        number > 1
                        &&
                        <Text style={styles.premiumMessageTitle}>require premium subscription</Text>
                    }



                    {/* Images Number */}

                    <View style={styles.imagesNumberContainer}>

                        <Text style={[styles.title, {
                            color: styleColors.color,
                        }]}>Image Number:</Text>

                        <Pressable style={styles.imagesNumberButton}
                            onPress={() => setNumber(number + 1)}
                        >
                            <Icon name='plus' size={17} color={styleColors.color} />
                        </Pressable>


                        <Text style={[styles.number, {
                            color: styleColors.color,

                        }]}>{number}</Text>


                        <Pressable style={styles.imagesNumberButton}
                            onPress={() => setNumber(number > 1 ? number - 1 : 1)}
                        >
                            <Icon name='minus' size={17} color={styleColors.color} />
                        </Pressable>



                    </View>



                    {/* Images Sizes Dimension */}

                    <View style={styles.sizesContainer}>



                        {sizes.map((el, i) => <Size selected={size} selectionFunction={setSize} key={i} title={el} end={i == (sizes.length - 1)} />)}
                    </View>


                </View>


                {/* Generating Section */}

                <View style={styles.generatingContainer}>




                    {
                        isLoading
                            ?
                            <View style={styles.loadingContainer}>

                                <ActivityIndicator size={55} color={Colors.primary} />
                                <Text style={styles.generatingText}>generating ...</Text>
                            </View>
                            :
                            respond.length < 1
                                ?

                                <Text style={styles.resultText}>no result</Text>
                                :
                                respond.map((el, i) => <GeneratedImageComponent key={i} info={el} />)
                    }
                </View>





                {/* used to replace the keyboard height in order to see al the <ScrollView> component content  */}
                <View style={{
                    height: kb.isVisible ? kb.height * 0.8 : 90,
                }} />

            </ScrollView>




            {/* Generate Button */}
            <CustomButton
                disabled={!prompt.length > 5}
                style={{ opacity: prompt.length > 4 ? 1 : .2, }}
                onPress={handleGenerating}
                label={isLoading ? "Generating ..." : "Generate"}
                isLoading={isLoading}
            />




        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    clearButton: {
        opacity: .5,
        borderRadius: Layout.radius.xlarge,
        height: 44, // fix the height
        width: 44, // fix the width
        alignItems: "center",
        justifyContent: "center",
        marginTop: Layout.margin.medium,
        marginStart: Layout.margin.medium,
        backgroundColor: 'rgba(100, 100, 100, .2)',
    },
    recordingButton: {
        opacity: .5,
        borderRadius: Layout.radius.xlarge,
        height: 44, // fix the height
        width: 44, // fix the width
        alignItems: "center",
        justifyContent: "center",
        marginTop: Layout.margin.medium,
        marginStart: Layout.margin.medium,
    },
    prompt: {
        padding: Layout.padding.medium,
        flex: 1, // fit the available size
        fontSize: Layout.font.h2,
        justifyContent: "flex-start",
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        verticalAlign: "top",
        borderWidth: 1,
        borderRadius: Layout.radius.small,
        marginVertical: Layout.margin.medium,
        marginBottom: Layout.margin.medium
    },
    promptContainer: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    premiumMessageTitle: {
        color: Colors.red,
        fontSize: Layout.font.h3,
        textAlign: "center",
        fontWeight: "600",
        marginRight: Layout.margin.medium,
    },
    imagesNumberContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',

    },
    imagesNumberButton: {
        backgroundColor: 'rgba(100, 100, 100, .15)',
        marginHorizontal: Layout.margin.small,
        borderRadius: Layout.radius.xlarge,
        height: 44,
        width: 44,
        alignItems: "center",
        justifyContent: "center",
    },
    sizesContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Layout.margin.small,
    },
    generatingContainer: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap',
        justifyContent: "space-between",
        marginHorizontal: Layout.margin.medium,
        paddingBottom: Layout.margin.medium,
    },
    resultText: {
        flex: 1,
        verticalAlign: "middle",
        textAlign: "center",
        padding: Layout.padding.xlarge,
    },
    generatingText: {
        marginTop: Layout.margin.large,
        fontSize: Layout.font.h2,
    },
    loadingContainer: {
        alignItems: "center",
        width: "100%",
        paddingVertical: Layout.padding.xlarge,
        justifyContent: "center",
    },
    number: {
        marginHorizontal: Layout.margin.small,
        padding: Layout.padding.small,
        fontSize: Layout.font.h0,
        textAlign: "center",
        fontWeight: "500",
        textAlignVertical: "center",
        verticalAlign: "middle",
        marginVertical: Layout.margin.small,
        marginBottom: Layout.margin.medium
    },
    recordingContainer: {
        opacity: .8,
        zIndex: 5,
        width: "100%",
        backgroundColor: 'red',
        paddingVertical: Layout.padding.small,
        paddingBottom: Layout.padding.xlarge,
        borderRadius: Layout.radius.small,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Layout.margin.small,
    },
    typingContainer: {
        zIndex: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        paddingVertical: Layout.padding.small,
        height: 'auto',
        alignSelf: "center",
        borderRadius: Layout.radius.large,
        paddingHorizontal: Layout.padding.small,
        position: 'absolute',
        bottom: Layout.margin.xlarge,

    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: Layout.padding.medium
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
        fontWeight: "500",
        marginRight: Layout.margin.medium
    }


})