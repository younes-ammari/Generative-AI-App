import { Dimensions, FlatList, Keyboard, useColorScheme, ActivityIndicator, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import { CustomButton } from '../../components/Index';



export default function ImageGen({ navigation }) {
    // let dirs = RNFetchBlob.fs.dirs

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
    const scrollViewRef = useRef();
    const scrollViewChatRef = useRef();
    const [visible, setIsVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)


    const demoResult = [
        // {
        //     url:'https://images.nightcafe.studio/jobs/rY2TxlazqPUzLomNPmnM/rY2TxlazqPUzLomNPmnM--1--gs4f2.jpg?tr=w-640,c-at_max'
        // }
    ]
    const [respond, setRespond] = useState(demoResult)
    const [prompt, setPrompt] = useState('')
    const [number, setNumber] = useState(1)
    const [size, setSize] = useState("1024x1024")
    const [isPremium, setIsPremium] = useState(false)
    const [selectedImage, setSelectedImage] = useState({ url: "https://images.nightcafe.studio/jobs/rY2TxlazqPUzLomNPmnM/rY2TxlazqPUzLomNPmnM--1--gs4f2.jpg?tr=w-640,c-at_max" })

    const WH = Dimensions.get('window').height
    const WW = Dimensions.get('window').width



    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
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

    const clear = () => {
        setResult('');
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

    const SizeComponent = ({ title = "1024x1024", end = false }) => {

        return (
            <Pressable style={{
                flex: 1,
                paddingHorizontal: 11,
                paddingVertical: 11,
                // marginHorizontal:8,
                marginRight: !end ? 7 : 0,
                borderRadius: 9,
                backgroundColor: title == size ? Colors.primary : null,
                marginVertical: 8,
                borderWidth: 2,
                borderColor: 'rgba(100, 100, 100, .8)'

            }}
                onPress={() => setSize(title)}
            >
                <Text style={{
                    fontSize: 13,
                    fontWeight: "500",
                    textAlign: "center",
                    opacity: title == size ? 1 : .9,
                    color: title == size ? Colors.lighter : styleColors.color,
                }}>{title}</Text>

            </Pressable>
        )
    }



    if (kb.isVisible) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }

    const demos = [
        {
            id: 1,
            isRespond: true,
            content: 'welcome in ChatGPT'
        },
    ]

    const [data, setData] = useState(demos)


    const handleGenerating = async () => {
        Keyboard.dismiss()

        // setPrompt('')
        setIsLoading(true)
        try {

            const configuration = new Configuration({
                organization: config.organization,
                apiKey: config.OPENAI_API_KEY,

            });
            const openai = new OpenAIApi(configuration);

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
        // setTimeout(() => {
        // }, 800);
    }
    // console.log('kb', kb)



    const sizes = [
        "1024x1024",
        "512x512",
        "256x256",
    ]

    const GeneratedImageComponent = ({ info }) => {
        var url = "https://user-images.githubusercontent.com/3059371/49334754-3c9dfe00-f5ab-11e8-8885-0192552d12a1.gif"

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
                    //  source={{uri:url}}
                    //  resizeMode="cover"
                    //  resizeMode="contain"
                    resizeMode="center"
                    style={{
                        zIndex: 1,
                        width: "100%",
                        // width:(Dimensions.get('window').width /2) -25 ,
                        height: 150,
                        backgroundColor: `rgba(${Colors.rgb.primary}, .05)`,
                        borderRadius: 9,
                        borderWidth: 1.1,
                        borderColor: `rgba(${Colors.rgb.primary}, .8)`,
                        // marginHorizontal:14
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
                // style={{top:-55}}
                deviceHeight={Dimensions.get('window').height * 1.5}
                animationIn="fadeInUp"
            >
                <View style={{
                    // flex: 1 , 
                    zIndex: 11,
                    width: Dimensions.get('window').width * .8,
                    alignSelf: "center",
                    backgroundColor: Colors.lighter,
                    // marginVertical:33,
                    // marginHorizontal:22,
                    borderRadius: 9,
                    paddingHorizontal: 11,
                    paddingVertical: 11,
                    // justifyContent:"center",
                    alignItems: "center",
                }}>
                    <Image
                        source={{ uri: selectedImage.url }}
                        //  source={{uri:url}}
                        resizeMode="cover"
                        //  resizeMode="contain"
                        //  resizeMode="center"
                        style={{
                            width: Dimensions.get('window').width * .74,
                            height: Dimensions.get('window').width * .74,
                            // width:(Dimensions.get('window').width /2) -25 ,
                            // height:150,
                            backgroundColor: `rgba(${Colors.rgb.primary}, .05)`,
                            borderRadius: 9,
                            borderWidth: 1.1,
                            borderColor: `rgba(${Colors.rgb.primary}, .8)`,
                            // marginHorizontal:14
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
                            // disabled={!prompt.length>5}

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
                                // position:'absolute',
                                // bottom:10,
                                // left:0,
                                // right:0,
                                // marginHorizontal:15,
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
                            // disabled={!prompt.length>5}

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
                                // flexDirection:"row",
                                // justifyContent:"space-between",
                                // position:'absolute',
                                // bottom:10,
                                // left:0,
                                // right:0,
                                // marginHorizontal:15,
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
                            {/* <Lottie style={{
                            // height:55,
                            // width:55
                        }} source={require('../../lottie/download.json')} autoPlay loop /> */}

                            {/* <Text style={{
                            color:Colors.lighter,
                            fontSize:16,
                            display:"none",
                            fontWeight:"500"
                        }}>Dowload</Text> */}


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
        // let image_URL = REMOTE_IMAGE_PATH;    
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

    const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
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
            // "zoom-in | slide-in",
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


            {modall()}

            <ScrollView
                keyboardShouldPersistTaps='handled'
                ref={scrollViewRef}
                contentContainerStyle={{
                    paddingBottom: 55,
                }}
            >

                <View style={[styles.chatContainer, {
                    flex: 1,
                    paddingHorizontal: 14,
                }]}>

                    {isRecording
                        &&
                        <View style={{
                            width: "100%",
                            backgroundColor: 'red',
                            paddingVertical: 9,
                            paddingBottom: 29,
                            opacity: .8,
                            borderRadius: 4,
                            // flexDirection:'row',
                            // position:"absolute",
                            justifyContent: "center",
                            alignItems: "center",
                            // top:"50%",
                            // bottom:"50%",
                            // right:"50%",
                            // left:"50%",
                            // bottom:"50%",
                            zIndex: 5,
                            // paddingBottom:33,
                            marginBottom: 5,
                        }}>

                            {/* <Text style={{
                        color:Colors.lighter,
                        // zIndex:21,
                        // fontSize:18,
                        // marginEnd:5,
                        // verticalAlign:"bottom",
                        textAlign:"center",
                    }}>recording ...</Text> */}
                            {/* dotAmplitude, dotSpeed, dotY */}

                            <TypingAnimation
                                dotMargin={9}
                                dotColor={Colors.lighter}

                            />
                        </View>}


                    <View style={{
                        flexDirection: 'row',
                        // alignItems:"center",
                        justifyContent: "space-between"
                    }}>

                        <TextInput
                            value={prompt}
                            onChangeText={(value) => setPrompt(value)}
                            multiline={true} // ios fix for centering it at the top-left corner 
                            numberOfLines={7}
                            placeholder={isRecording ? "start talking ..." : kb.isVisible ? 'Write a prompt here ...' : 'click here to start a conversation ...'}
                            placeholderTextColor={styleColors.placeholderTextColor}
                            style={{
                                // backgroundColor:'rgba(100, 100, 100, .041)',
                                backgroundColor: styleColors.placeholder,
                                color: styleColors.placeholderText,
                                padding: 10,
                                flex: 1,
                                fontSize: 15,
                                justifyContent: "flex-start",
                                alignContent: 'flex-start',
                                alignItems: 'flex-start',
                                textAlignVertical: 'top',
                                verticalAlign: "top",
                                borderWidth: 1,
                                borderColor: styleColors.primary,
                                borderRadius: 8,
                                marginVertical: 5,
                                marginBottom: 11,

                            }}
                        />

                        <TouchableOpacity style={{
                            opacity: .5,
                            paddingHorizontal: 13,
                            borderRadius: 8,
                            height: 44,
                            zIndex: 2,
                            marginTop: 5,
                            // display:!kb.isVisible ? "none" : "flex",
                            // position:"absolute",
                            // right:8,
                            // bottom:8,
                            borderRadius: 44,
                            paddingVertical: 5,
                            marginStart: 9,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isRecording ? 'rgba(250, 100, 100, .2)' : 'rgba(100, 100, 100, .2)',
                            flexDirection: 'row',
                        }}
                            // disabled={message.length<4}
                            onPress={handleRecordEvent}
                        >

                            <Ionicons name="mic" size={17} color={isRecording ? 'red' : styleColors.color} />
                            {/* <Text style={{fontSize:16, color:"white", marginLeft:9}}>Send</Text> */}
                        </TouchableOpacity>
                    </View>
                    {
                        number > 1
                        &&
                        <Text style={{
                            color: Colors.red,
                            fontSize: 14,
                            textAlign: "center",
                            fontWeight: "600",
                            marginRight: 10,
                        }}>require premium subscription</Text>
                    }

                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: 'flex-start',

                    }}>

                        <Text style={{
                            color: styleColors.color,
                            fontSize: 18,
                            fontWeight: "400",
                            marginRight: 10,
                        }}>Image Number:</Text>

                        <Pressable style={{
                            padding: 8,
                            backgroundColor: 'rgba(100, 100, 100, .15)',
                            marginHorizontal: 3,
                            borderRadius: 22,
                            height: 44,
                            width: 44,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                            onPress={() => setNumber(number + 1)}
                        >
                            <Icon name='plus' size={17} color={styleColors.color} />
                        </Pressable>


                        <Text style={{
                            marginHorizontal: 5,
                            // backgroundColor:'rgba(100, 100, 100, .041)',
                            padding: 10,
                            fontSize: 22,
                            color: styleColors.color,
                            textAlign: "center",
                            fontWeight: "500",
                            textAlignVertical: "center",
                            verticalAlign: "middle",
                            borderColor: Colors.primary,
                            borderRadius: 8,
                            marginVertical: 5,
                            marginBottom: 11,

                        }}>{number}</Text>


                        <Pressable style={{
                            padding: 8,
                            backgroundColor: 'rgba(100, 100, 100, .15)',
                            marginHorizontal: 3,
                            borderRadius: 22,
                            height: 44,
                            width: 44,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                            onPress={() => setNumber(number > 1 ? number - 1 : 1)}
                        >
                            <Icon name='minus' size={17} color={styleColors.color} />
                        </Pressable>



                    </View>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 5,
                    }}>



                        {sizes.map((el, i) => <SizeComponent key={i} title={el} end={i == (sizes.length - 1)} />)}
                    </View>


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
                            respond.length < 1
                                ?

                                <Text style={{
                                    flex: 1,
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                    padding: 66,
                                }}>no result</Text>
                                :
                                respond.map((el, i) => <GeneratedImageComponent key={i} info={el} />)
                    }
                </View>







                <View style={{
                    height: kb.isVisible ? kb.height * 0.8 : 90,
                }} />

            </ScrollView>




            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <CustomButton
                    disabled={!prompt.length > 5}
                    style={{ opacity: prompt.length > 4 ? 1 : .2, }}
                    onPress={handleGenerating}
                    label={isLoading ? "Generating ..." : "Generate"}
                    isLoading={isLoading}
                />


            </View>



        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
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
        // height:Dimensions.get("window").height*.8,
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
        fontWeight: "500"

    }
})