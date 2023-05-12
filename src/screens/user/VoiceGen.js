import { Dimensions, Alert, Keyboard, useColorScheme, ActivityIndicator, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'


// used to convert speech to text
import Voice from '@react-native-community/voice';

import { Picker } from '@react-native-picker/picker';

// for saving the sound
import RNFetchBlob from 'rn-fetch-blob';

// toast message
import { useToast } from 'react-native-toast-notifications'
import { useKeyboard } from '../../hooks/useKeyboard'

import Modal from "react-native-modal";

// icons 
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../constants/theme/Colors'


import { TypingAnimation } from "react-native-typing-animation";

// configs 
import voiceOverConfig from '../../config/playHt';
import AppContext from '../../hooks/useContext'
import ScreenWrapper from '../ScreenWrapper'


import { CustomButton, Gender, PlayerComponent } from '../../components/Index';
import Layout from '../../constants/theme/Layout';



export default function VoiceGen({ navigation }) {

    const API_URL = "https://play.ht/api/v2"

    const toast = useToast();

    const { displayMode, styleColors } = React.useContext(AppContext)

    const deviceMode = useColorScheme()

    const mode = displayMode == "auto" ? deviceMode : displayMode


    const kb = useKeyboard();
    const scrollViewRef = useRef();

    const [visible, setVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)



    const [respond, setRespond] = useState([])
    const [prompt, setPrompt] = useState('')
    const [isPremium, setIsPremium] = useState(false)



    const [result, setResult] = useState('');
    const [fetchingData, setFetchingData] = useState(false);
    const [recording, setRecording] = useState(false);



    const [isRecording, setIsRecording] = useState(false)



    const speechStartHandler = e => {
        setRecording(true)

    };
    const speechEndHandler = e => {
        setRecording(false);
    };

    const speechResultsHandler = e => {
        const text = e.value[0];
        setResult(text);
        setPrompt(prompt + " " + text + " ")
    };

    const startRecording = async () => {
        try {
            setRecording(true);
            await Voice.start('en-Us');
        } catch (error) {
            Alert.alert(
                'Start Recording error',
                error,
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK' },
                ]
            )
            setRecording(false);
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
            setRecording(false);
        } catch (error) {
            setRecording(false);
            Alert.alert(
                'Stop Recording error',
                error,
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK' },
                ]
            )
            console.log('error', error);
        }
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




    const clear = () => {
        setResult('');
        setPrompt('')
    };



    useEffect(() => {

        fetchData()


        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const handleGenderSelection = (title) => {
        let initOptions = data.filter(el => el.gender == title)[0]
        setGender(title);

        setLanguages(getUniques(data.map(el => el.language)))
        setLanguage(initOptions.language)

        setAges(getUniques(data.filter(el => el.gender == title).map(el => el.age)))
        setAge(initOptions.age)

        setVoices(getUniques(data.filter(el => el.gender == title && el.age == initOptions.age).map(el => { return ({ name: el.name, id: el.id, sample: el.sample }) })))
        setVoice({ name: initOptions.name, id: initOptions.id, sample: initOptions.sample })

        setRequestOptions({ ...requestOptions, voice: initOptions.id })

        setLoudnesses(getUniques(data.filter(el => el.gender == title && el.age == initOptions.age).map(el => el.loudness)))
        setLoudness(initOptions.loudness)

        // used to re-render the PlayerComponent sample
        setSample(false)
        setTimeout(() => {
            setSample(true)
        }, 16);
    }


    if (kb.isVisible) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }


    const dataDemo = [
        {
            "id": "abram",
            "name": "Abram",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/abram.wav",
            "accent": "british",
            "age": "old",
            "gender": "male",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "low",
            "style": "narrative",
            "tempo": "slow",
            "texture": "round",
            "is_cloned": false
        },
        {
            "id": "ahmed",
            "name": "Logan",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/ahmed.wav",
            "accent": "british",
            "age": "old",
            "gender": "male",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "neutral",
            "style": "narrative",
            "tempo": "neutral",
            "texture": "thick",
            "is_cloned": false
        },
        {
            "id": "alex",
            "name": "Alex",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/alex.wav",
            "accent": "british",
            "age": "adult",
            "gender": "male",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "high",
            "style": "narrative",
            "tempo": "slow",
            "texture": "thick",
            "is_cloned": false
        },
        {
            "id": "Alexander",
            "name": "Alexander",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/Alexander.wav",
            "accent": "british",
            "age": "old",
            "gender": "male",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "high",
            "style": "narrative",
            "tempo": "fast",
            "texture": "thick",
            "is_cloned": false
        },
        {
            "id": "alfonso",
            "name": "Alfonso",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/alfonso.wav",
            "accent": "american",
            "age": "adult",
            "gender": "male",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "neutral",
            "style": "videos",
            "tempo": "neutral",
            "texture": "gravelly",
            "is_cloned": false
        },
        {
            "id": "amado",
            "name": "Amado",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/amado.wav",
            "accent": "american",
            "age": "old",
            "gender": "male",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "low",
            "style": "narrative",
            "tempo": "fast",
            "texture": "smooth",
            "is_cloned": false
        },
        {
            "id": "anny",
            "name": "Anny",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/anny.wav",
            "accent": "american",
            "age": "youth",
            "gender": "female",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "neutral",
            "style": "narrative",
            "tempo": "neutral",
            "texture": "thick",
            "is_cloned": false
        },
        {
            "id": "Anthony",
            "name": "Anthony",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/Anthony.wav",
            "accent": "american",
            "age": "adult",
            "gender": "male",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "neutral",
            "style": "training",
            "tempo": "slow",
            "texture": "thick",
            "is_cloned": false
        },
        {
            "id": "arthur",
            "name": "Arthur",
            "sample": "https://peregrine-samples.s3.amazonaws.com/editor-samples/arthur.wav",
            "accent": "british",
            "age": "adult",
            "gender": "male",
            "language": "English (US)",
            "language_code": "en-US",
            "loudness": "neutral",
            "style": "narrative",
            "tempo": "neutral",
            "texture": "smooth",
            "is_cloned": false
        },
    ]

    const [data, setData] = useState(dataDemo)



    const getUniques = (list) => {
        return Array.from(new Set(list.map(JSON.stringify))).map(JSON.parse)
    }

    const genders = [
        "male",
        "female",
        // "Auto",
    ]


    const [gender, setGender] = useState('male')



    const languagesDemo = getUniques(data.map(el => el.language))

    const [languages, setLanguages] = useState(languagesDemo)
    const [language, setLanguage] = useState(languagesDemo[0])



    const agesDemo = getUniques(data.filter(el => el.language == language).map(el => el.age))

    const [ages, setAges] = useState(agesDemo)
    const [age, setAge] = useState(data[0].age)


    const voicesDemo = getUniques(data.filter(el => el.language == language && el.age == age).map(el => { return ({ name: el.name, id: el.id, sample: el.sample }) }))


    const [voices, setVoices] = useState(voicesDemo)
    const [voice, setVoice] = useState(voicesDemo[0])



    const loudnessesDemo = data.map(el => el.loudness)

    const [loudnesses, setLoudnesses] = useState(loudnessesDemo)
    const [loudness, setLoudness] = useState(loudnessesDemo[0])



    const formats = [
        "MP3",
        "WAV",
        "FLAC",
        "ALAW",
        "ULAW"
    ]

    const [format, setFormat] = useState("WAV")
    const [generatedVoice, setGeneratedVoice] = useState({
        id: "",
        voice: "",
        name: "",
        text: "",
        url: "",
        size: "",
        duration: ""
    })


    const [requestOptions, setRequestOptions] = useState({
        "text": prompt,
        "speed": 1,
        "voice": voice.id,
        "quality": "medium",
        "output_format": format.toLowerCase(),
        "sample_rate": 24000
    })


    const modall = () => {
        return (
            <Modal
                isVisible={visible}
                coverScreen={true}
                onBackButtonPress={() => setVisible(false)}
                onDismiss={() => setVisible(false)}
                deviceHeight={Dimensions.get('window').height * 1.1}
                animationIn="fadeInUp"
            >
                <View style={{
                    zIndex: 11,
                    width: Dimensions.get('window').width * .8,
                    alignSelf: "center",
                    backgroundColor: styleColors.placeholder,
                    borderRadius: 9,
                    paddingHorizontal: 11,
                    paddingVertical: 11,
                }}>
                    <PlayerComponent url={audioLink} details={generatedVoice} />


                    <View style={{

                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: '100%',
                        marginTop: 22,
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
                                width: "75%",
                            }}
                            onPress={() => setVisible(false)}
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
                Alert.alert(
                    'Storage Permission error',
                    err,
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'OK' },
                    ]
                )
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
        let fileName = `GenBotVoice_${requestOptions.voice}_${generatedVoice.id}` + Math.floor(date.getTime() + date.getSeconds() / 2) + ext

        const { config, fs } = RNFetchBlob;
        const destPath = fs.dirs.DownloadDir + `/GenBot/Audio/${requestOptions.voice}/` + fileName;

        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path: destPath,
                description: `Audio generated by AI tools with a prompt of ${prompt}`,
            },
        };
        config(options)
            .fetch('GET', image_URL)
            .then(res => {
                // Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                setIsDownloading(false)
            })
            .catch(error => {
                Alert.alert(
                    'Fetching Sound Data error',
                    error,
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'OK' },
                    ]
                )
                setIsDownloading(false)
            });
    };

    const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
    };



    const handleDownload = () => {
        setIsDownloading(true)
        console.log(audioLink)
        setTimeout(() => {
            setVisible(false)

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
                checkPermission(audioLink)

                toast.update(id, "Successfully downloaded \n To : GenBot", {
                    type: "success",
                });
            } catch (error) {
                // console.log('download error', error)
                Alert.alert(
                    'Download error',
                    error,
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'OK' },
                    ]
                )
                toast.update(id, "Error while downloading", {
                    type: "danger",
                });

            }

            setIsDownloading(false)


        }, 1000);
    };


    const fetchData = async () => {
        setFetchingData(true)
        var url = `${API_URL}/voices`

        var myHeaders = new Headers();
        myHeaders.append("X-User-Id", voiceOverConfig.USER_ID);
        myHeaders.append("Authorization", `Bearer ${voiceOverConfig.SECRET_KEY}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)

                let initOptions = result[0]


                setLanguages(getUniques(result.map(el => el.language)))
                setLanguage(initOptions.language)

                setAges(getUniques(result.filter(el => el.language == language && el.gender == gender).map(el => el.age)))
                setAge(initOptions.age)

                setVoices(getUniques(result.filter(el => el.language == language && el.age == age && el.gender == gender).map(el => { return ({ name: el.name, id: el.id, sample: el.sample }) })))
                setVoice(initOptions)
                setLoudnesses(getUniques(result.filter(el => el.language == language && el.age == age && el.gender == gender).map(el => el.loudness)))
                setLoudness(initOptions.loudness)


            })
            .catch(error => {
                Alert.alert(
                    'Error',
                    error,
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'OK' },
                    ]
                )
            })
            .finally(() => {
                setFetchingData(false)
            })
            ;
    };


    const handleGenerating = async () => {
        Keyboard.dismiss()
        setAudioLink('')
        console.log('handling')
        var url = `${API_URL}/tts`
        let id
        let audioLink


        // return
        setIsLoading(true)
        try {
            audioLink = ""

            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    AUTHORIZATION: `Bearer ${voiceOverConfig.SECRET_KEY}`,
                    'X-USER-ID': voiceOverConfig.USER_ID
                },
                body: JSON.stringify(requestOptions)
            };


            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    id = result.id
                    setRespond(result)
                })
                .catch(error =>
                    Alert.alert(
                        'Error',
                        error,
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'OK' },
                        ]
                    ))
                .finally(res => {
                    setGeneratedVoice({
                        id: "",
                        voice: "",
                        name: "",
                        text: "",
                        url: "",
                        size: "",
                        duration: ""
                    })

                    if (id) {
                        var link = `${API_URL}/tts/${id}?format=event-stream`


                        const fetchRequestOptions = {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                'content-type': 'application/json',
                                AUTHORIZATION: `Bearer ${voiceOverConfig.SECRET_KEY}`,
                                'X-USER-ID': voiceOverConfig.USER_ID
                            }
                        }

                        fetch(link, fetchRequestOptions)
                            .then(response => response.text())
                            .then(result => {
                                var demo1 = result.split("data: ", undefined)
                                var demo1 = demo1[demo1.length - 1]
                                var demo2 = JSON.parse(demo1)

                                audioLink = demo2.url
                                let name = data.filter(el => el.id == requestOptions.voice)[0].name
                                setGeneratedVoice({ ...demo2, voice: requestOptions.voice, text: requestOptions.text, name: name })

                                setAudioLink(audioLink)
                                audioLink && setVisible(true)
                                scrollViewRef.current.scrollToEnd({ animated: true })

                            })
                            .catch(error =>
                                Alert.alert(
                                    'Error',
                                    error,
                                    [
                                        { text: 'Cancel', style: 'cancel' },
                                        { text: 'OK' },
                                    ]
                                ))
                            .finally(() => {
                                setIsLoading(false)
                            })
                    }
                    else {
                        console.log('respond error', respond)
                        Alert.alert(
                            'Respond error',
                            respond,
                            [
                                { text: 'Cancel', style: 'cancel' },
                                { text: 'OK' },
                            ]
                        )
                        setIsLoading(false)
                    }
                })

        }
        catch (error) {
            setIsLoading(false)
            console.log('Generating error', error)
            // Alert.alert(
            //     'Generating error',
            //     // error,
            //     [
            //         { text: 'Cancel', style: 'cancel' },
            //         { text: 'OK' },
            //     ]
            // )
        }
    };


    const [audioLink, setAudioLink] = useState('')
    const [sample, setSample] = useState(true)



    return (
        <ScreenWrapper fill back title='AI Voiceover Generator'>


            {modall()}
            {!fetchingData ?
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    ref={scrollViewRef}
                    contentContainerStyle={{
                        paddingBottom: 33,
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
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 5,
                                marginBottom: 5,
                            }}>


                                <TypingAnimation
                                    dotMargin={9}
                                    dotColor={Colors.lighter}

                                />
                            </View>}

                        <View style={styles.promptContainer}>

                            <TextInput
                                value={prompt}
                                onChangeText={(value) => { setRequestOptions({ ...requestOptions, text: value }); setPrompt(value); }}
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


                        <View style={{
                            marginBottom: 9,
                        }}>
                            <Text style={[styles.title, { color: styleColors.color }]}>Gender</Text>



                            <View style={{
                                flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>



                                {genders.map((gen, i) =>
                                    <Gender
                                        key={i}
                                        title={gen}
                                        end={i == (genders.length - 1)}
                                        selected={gender == gen}
                                        onPress={() => handleGenderSelection(gen)}
                                    />)}
                            </View>



                        </View>




                        <View style={{
                            marginBottom: 9,
                        }}>
                            <Text style={[styles.title, { color: styleColors.color }]}>Language ({languages.length})</Text>




                            <Picker
                                mode='dropdown'
                                selectedValue={language}
                                style={{
                                    paddingVertical: 0,
                                    marginVertical: 0,
                                    backgroundColor: styleColors.placeholder
                                }}
                                dropdownIconColor={styleColors.color}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLanguage(itemValue.toLowerCase())
                                    // used to re-render the PlayerComponent sample
                                    setSample(false)
                                    setTimeout(() => {
                                        setSample(true)
                                    }, 16);


                                }}>
                                {languages.map((el, i) => {
                                    var selected = el == language

                                    return (
                                        <Picker.Item key={i} label={el.replace(/\b\w/g, letter => letter.toUpperCase())} value={el} style={{
                                            borderRadius: 9,
                                            color: mode == "light" ? selected ? "rgb(0, 0, 0)" : "rgb(150, 150, 150)" : selected ? "rgb(255, 255, 255)" : "rgb(100, 100, 100)",
                                            fontWeight: selected ? "700" : "bold",
                                            backgroundColor: styleColors.placeholder,
                                        }} />
                                    )
                                })}


                            </Picker>



                        </View>





                        <View style={{
                            marginBottom: 9,
                        }}>
                            <Text style={[styles.title, { color: styleColors.color }]}>Age ({ages.length})</Text>




                            <Picker
                                mode='dropdown'
                                selectedValue={age}
                                style={{
                                    paddingVertical: 0,
                                    marginVertical: 0,
                                    backgroundColor: styleColors.placeholder
                                }}
                                dropdownIconColor={styleColors.color}
                                onValueChange={(itemValue, itemIndex) => {
                                    setAge(itemValue)


                                    var newData = getUniques(data.filter(el => el.language == language && el.age == itemValue && el.gender == gender).map(el => { return ({ name: el.name, id: el.id, sample: el.sample }) }))


                                    var initOptions = newData[0]
                                    setVoices(newData)

                                    setVoice(initOptions)
                                    // used to re-render the PlayerComponent samplesetVoices(newData)
                                    setSample(false)
                                    setTimeout(() => {
                                        setSample(true)
                                    }, 16);

                                    setRequestOptions({ ...requestOptions, voice: initOptions.id })

                                    setLoudnesses(getUniques(data.filter(el => el.language == language && el.age == itemValue && el.gender == gender).map(el => el.loudness)))
                                    setLoudness(initOptions.loudness)




                                }}>
                                {ages.map((el, i) => {
                                    var selected = el == age

                                    return (
                                        <Picker.Item key={i} label={el.replace(/\b\w/g, letter => letter.toUpperCase())} value={el} style={{
                                            borderRadius: 9,
                                            color: mode == "light" ? selected ? "rgb(0, 0, 0)" : "rgb(150, 150, 150)" : selected ? "rgb(255, 255, 255)" : "rgb(100, 100, 100)",
                                            fontWeight: selected ? "700" : "bold",
                                            backgroundColor: styleColors.placeholder,
                                        }} />
                                    )
                                })}


                            </Picker>



                        </View>





                        <View style={{
                            marginBottom: 9,
                        }}>
                            <Text style={[styles.title, { color: styleColors.color }]}>Voice ({voices.length})</Text>




                            <Picker
                                mode='dropdown'

                                selectedValue={voice.id}
                                style={{
                                    paddingVertical: 0,
                                    marginVertical: 0,
                                    backgroundColor: styleColors.placeholder
                                }}
                                dropdownIconColor={styleColors.color}
                                onValueChange={(itemValue, itemIndex) => {
                                    setVoice(voices.filter(el => el.id == itemValue)[0])
                                    // used to re-render the PlayerComponent samplesetRequestOptions({ ...requestOptions, voice: itemValue })
                                    setSample(false)
                                    setTimeout(() => {
                                        setSample(true)
                                    }, 16);
                                }}>
                                {voices.map((el, i) => {
                                    var selected = el.id == voice.id

                                    return (
                                        <Picker.Item key={i} label={el.name} value={el.id} style={{
                                            borderRadius: 9,
                                            color: mode == "light" ? selected ? "rgb(0, 0, 0)" : "rgb(150, 150, 150)" : selected ? "rgb(255, 255, 255)" : "rgb(100, 100, 100)",
                                            fontWeight: selected ? "700" : "bold",
                                            backgroundColor: styleColors.placeholder,
                                        }} />
                                    )
                                })}


                            </Picker>



                        </View>

                        <Text style={[styles.title, { color: styleColors.color }]}>Sample</Text>

                        {
                            sample
                                ?
                                <PlayerComponent
                                    url={voice.sample}
                                    details={{ name: voice.name }}
                                    style={{
                                        // backgroundColor: null,
                                        backgroundColor: styleColors.softFill,
                                        color: mode == 'dark' ? Colors.lighter : 'rgb(91, 91, 91)'
                                    }}
                                />
                                :
                                <ActivityIndicator size={22} color={styleColors.color} />
                        }




                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            paddingTop: 15,
                            paddingBottom: 5,
                        }}>
                            <Text style={{ color: styleColors.color, opacity: .4 }}>------------------------ result options ------------------------</Text>
                        </View>




                        <View style={{
                            marginBottom: 9,
                        }}>
                            <Text style={[styles.title, { color: styleColors.color }]}>Output format</Text>




                            <Picker
                                mode='dropdown'
                                selectedValue={format}
                                style={{
                                    paddingVertical: 0,
                                    marginVertical: 0,
                                    backgroundColor: styleColors.placeholder
                                }}
                                dropdownIconColor={styleColors.color}
                                onValueChange={(itemValue, itemIndex) => {
                                    setFormat(itemValue)
                                    setRequestOptions({ ...requestOptions, output_format: itemValue.toLowerCase() })
                                }}>
                                {formats.map((el, i) => {
                                    var selected = el == format

                                    return (
                                        <Picker.Item key={i} label={"." + el} value={el} style={{
                                            borderRadius: 9,
                                            color: mode == "light" ? selected ? "rgb(0, 0, 0)" : "rgb(150, 150, 150)" : selected ? "rgb(255, 255, 255)" : "rgb(100, 100, 100)",
                                            fontWeight: selected ? "700" : "bold",
                                            backgroundColor: styleColors.placeholder,
                                        }} />
                                    )
                                })}


                            </Picker>



                        </View>






                        {audioLink
                            &&
                            <View style={{
                                marginTop: 22,
                                paddingHorizontal: 14,
                                zIndex: 11,
                                backgroundColor: styleColors.backgroundColor,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: Dimensions.get('window').width,
                            }}>











                            </View>}
                    </View>





                    {
                        generatedVoice.id.length > 3
                        &&
                        <View style={{
                            marginTop: 22,
                            paddingHorizontal: 14,
                            zIndex: 11,
                            backgroundColor: styleColors.backgroundColor,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: Dimensions.get('window').width,
                        }}>


                            <Pressable

                                android_ripple={{ color: 'rgba(40, 40, 40, .3)' }}
                                style={{
                                    paddingHorizontal: 9,
                                    paddingVertical: 14,
                                    alignItems: "center",
                                    flexDirection: 'row',
                                    justifyContent: "center",
                                    borderColor: mode == "dark" ? styleColors.color : undefined,
                                    borderRadius: 9,
                                }}
                                onPress={() => setVisible(true)}
                            >

                                <Ionicons name={"play"} color={Colors.red} size={17} />
                                <Text style={{
                                    color: Colors.red,
                                    fontSize: 16,
                                    zIndex: 55,
                                    marginStart: 7,
                                    fontWeight: "500"
                                }}>Play Sound</Text>


                            </Pressable>


                        </View>}








                    <View style={{
                        marginTop: generatedVoice.id.length > 3 ? 11 : 44,
                        zIndex: 11,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <CustomButton
                            disabled={!prompt.length > 5}
                            style={{ opacity: prompt.length > 4 ? 1 : .2, }}
                            onPress={handleGenerating}
                            label={isLoading ? "Generating ..." : generatedVoice.id.length < 3 ? "Generate" : "Generate again!"}
                            isLoading={isLoading}
                        />

                    </View>


                    <View style={{
                        height: kb.isVisible ? kb.height * 1 : 5,
                    }} />

                </ScrollView>
                :
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                    <ActivityIndicator size={22} color={styleColors.color} />
                    <Text style={[styles.title, { color: styleColors.color, fontSize: 14, marginTop: 11, }]}>waite a while ...</Text>
                </View>
            }




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
    typingContainer: {
        zIndex: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        paddingVertical: 8,
        height: 'auto',
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
    },
    title: {
        fontSize: 19,
        color: Colors.primary,
        fontWeight: "500",
        marginVertical: 4,
        marginBottom: 9,

    }
})