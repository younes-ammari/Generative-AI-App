import { Dimensions, FlatList, Keyboard, useColorScheme, ActivityIndicator, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'

import { useKeyboard } from '../hooks/useKeyboard'

import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../constants/Colors'
import Lottie from 'lottie-react-native';
import { Configuration, OpenAIApi } from 'openai';
import { TypingAnimation } from "react-native-typing-animation";


import config from '../config/openAI';
import voiceOverConfig from '../config/playHt';
import RNFetchBlob from 'rn-fetch-blob';
import {useToast } from 'react-native-toast-notifications'
import AppContext from '../hooks/useContext'

import Voice from '@react-native-community/voice';

import {Picker} from '@react-native-picker/picker';

import Sound from 'react-native-sound'


export default function AIVoiceGen({navigation}) {
    // let dirs = RNFetchBlob.fs.dirs
    
    var API_URL = "https://play.ht/api/v2"
    
    const toast = useToast();

    const { displayMode, styleColors} = React.useContext(AppContext)

    const deviceMode = useColorScheme()
    
    const mode = displayMode=="auto" ? deviceMode : displayMode
    
    

    const configuration = new Configuration({
        organization: config.organization,
        apiKey: config.OPENAI_API_KEY,

      });
    const openai = new OpenAIApi(configuration);
    
    const kb = useKeyboard();
    const scrollViewRef = useRef();
    const scrollViewChatRef = useRef();
    const [visible, setIsVisible]= useState(false)
    
    const [isLoading, setIsLoading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)

    
    const demoResult=[
        {
            url:'https://images.nightcafe.studio/jobs/rY2TxlazqPUzLomNPmnM/rY2TxlazqPUzLomNPmnM--1--gs4f2.jpg?tr=w-640,c-at_max'
        }
    ]
    const [respond, setRespond]= useState(demoResult)
    const [prompt, setPrompt]= useState('')
    const [number, setNumber]= useState(1)
    const [isPremium, setIsPremium] = useState(false)
    const [selectedImage, setSelectedImage] = useState({url:"https://images.nightcafe.studio/jobs/rY2TxlazqPUzLomNPmnM/rY2TxlazqPUzLomNPmnM--1--gs4f2.jpg?tr=w-640,c-at_max"})
    
    const WH = Dimensions.get('window').height
    const WW = Dimensions.get('window').width



    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);
    const [recording, setRecording] = useState(false);


    
    const [isRecording, setIsRecording] = useState(false)
  
      
    const speechStartHandler = e => {
      
      console.log('speechStart successful', e);
    };
    const speechEndHandler = e => {
      setLoading(false);
      setIsRecording(false)
      console.log('stop handler', e);
    };
  
    const speechResultsHandler = e => {
      const text = e.value[0];
      setResult(text);
      let newMessage = message + " " + text + " "
      setPrompt(newMessage)
      console.log('result', text)
      console.log('newMessage', newMessage)
    };
  
    const startRecording = async () => {
      setLoading(true);
      setRecording(true);
      try {
        await Voice.start('en-Us');
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
  
    const stopRecording = async () => {
      setRecording(false);
      try {
        await Voice.stop();
        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };
    
    const clear = () => {
        setResult('');
        setPrompt('')
    };


    useEffect(() => {
        fetchData()
        
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;

        return () => {
        Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const GenderComponent=({
        title="1024x1024", 
        end=false,
        icon
    })=>{
        var selected = gender==title
        var iconName = ['female', 'male'].includes(title) ? title : "male"

        return(
            <Pressable style={{
                flex:1,
                // paddingHorizontal:11,
                paddingVertical:11,
                flexDirection:'row',
                justifyContent:"center",
                alignItems:"center",
                // marginHorizontal:8,
                marginRight:!end ? 7 : 0,
                borderRadius:9,
                backgroundColor:selected ? Colors.primary : null,
                marginVertical:4,
                borderWidth:1.5,
                opacity:selected ? 1 : .71,
                borderColor:'rgba(100, 100, 100, .5)'

            }}
            onPress={()=>{
                let initOptions = data[0]
                setGender(title);
                // console.log(initOptions)
                    

                setLanguages(getUniques(data.map(el=>el.language)))
                setLanguage(initOptions.language)

                setAges(getUniques(data.filter(el=>el.gender == title).map(el=>el.age)))
                setAge(initOptions.age)
                
                setVoices(getUniques(data.filter(el=>el.gender == title).map(el=> {return({name: el.name, id:el.id})})))
                setVoice(initOptions)
                setLoudnesses(getUniques(data.filter(el=>el.gender == title).map(el=> el.loudness)))
                setLoudness(initOptions.loudness)
            
            }}
            >
                <Fontisto name={iconName} size={17} color={selected ? Colors.lighter : styleColors.color}/>
                <Text style={{
                    fontSize:15,
                    fontWeight:"500",
                    textAlign:"center",
                    marginStart:5,
                    opacity:selected ? 1 : .9,
                    color:selected ? Colors.lighter : styleColors.color,
                }}>{title.replace(/\b\w/g, letter => letter.toUpperCase())}</Text>

            </Pressable>
        )
    }



    if (kb.isVisible){
    // scrollViewRef.current.scrollToEnd({ animated: true })
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }

    // console.log('kb', kb)

    const dataDemo=[
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

    

    const getUniques=(list)=>{
        return Array.from(new Set(list.map(JSON.stringify))).map(JSON.parse)
    }

    const genders = [
        "male",
        "female",
        // "Auto",
    ]

    
    const [gender, setGender]= useState('male')



    const languagesDemo = getUniques(data.map(el=>el.language))

    const [languages, setLanguages] = useState(languagesDemo)
    const [language, setLanguage] = useState(languagesDemo[0])
    // const [language, setLanguage] = useState(data[0].language)
    


    const agesDemo = getUniques(data.filter(el=>el.language==language).map(el=>el.age))

    const [ages, setAges] = useState(agesDemo)
    // const [age, setAge] = useState(agesDemo[0])
    const [age, setAge] = useState(data[0].age)

    
    const voicesDemo = getUniques(data.filter(el=>el.language==language && el.age==age).map(el=> {return({name: el.name, id:el.id})}))


    const [voices ,setVoices] = useState(voicesDemo)
    // const [voice ,setVoice] = useState(voicesDemo[0])
    const [voice ,setVoice] = useState('null')



    const loudnessesDemo = data.map(el=>el.loudness)

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

    


    const GeneratedImageComponent=({info})=>{
        var url = "https://user-images.githubusercontent.com/3059371/49334754-3c9dfe00-f5ab-11e8-8885-0192552d12a1.gif"

        return(
            <Pressable 
            android_ripple={{color:'rgba(100, 100, 100, .7)', }}
            style={{
                // flex:1,
                maxWidth:(Dimensions.get('window').width /2) -21 ,
                width:(Dimensions.get('window').width /2) -21 ,
                backgroundColor:`rgba(220, 220, 220, 1)`,
                marginBottom:9,
                // elevation:5,
            }}
            onPress={()=>{
                setSelectedImage(info)
                setIsVisible(true);
                console.log('pressed ')
            }}
            >
                <Image
                 source={{uri:info.url}}
                //  source={{uri:url}}
                //  resizeMode="cover"
                //  resizeMode="contain"
                 resizeMode="center"
                 style={{
                    zIndex:1,
                    width:"100%",
                    // width:(Dimensions.get('window').width /2) -25 ,
                    height:150,
                    backgroundColor:`rgba(${Colors.rgb.primary}, .05)`,
                    borderRadius:9,
                    borderWidth:1.1,
                    borderColor:`rgba(${Colors.rgb.primary}, .8)`,
                    // marginHorizontal:14
                 }}
                 />
                 <ActivityIndicator 
                    color={Colors.lighter} 
                    size={44}
                    style={{
                        position:"absolute",
                        left:0,
                        right:0,
                        bottom:0,
                        top:0
                    }}
                    />
            </Pressable>
        )
    }

    const modall=()=>{
        return(
            <Modal 
                isVisible={visible}
                coverScreen={true}
                onBackButtonPress={()=>setIsVisible(false)} 
                onDismiss={()=>setIsVisible(false)} 
                // style={{top:-55}}
                deviceHeight={Dimensions.get('window').height*1.5}
                animationIn="fadeInUp"
                >
                <View style={{ 
                    // flex: 1 , 
                    zIndex:11,
                    width:Dimensions.get('window').width*.8,
                    alignSelf:"center",
                    backgroundColor:Colors.lighter, 
                    // marginVertical:33,
                    // marginHorizontal:22,
                    borderRadius:9,
                    paddingHorizontal:11,
                    paddingVertical:11,
                    // justifyContent:"center",
                    alignItems:"center",
                    }}>
                <Image
                 source={{uri:selectedImage.url}}
                //  source={{uri:url}}
                 resizeMode="cover"
                //  resizeMode="contain"
                //  resizeMode="center"
                 style={{
                     width:Dimensions.get('window').width*.74,
                     height:Dimensions.get('window').width*.74,
                     // width:(Dimensions.get('window').width /2) -25 ,
                     // height:150,
                     backgroundColor:`rgba(${Colors.rgb.primary}, .05)`,
                    borderRadius:9,
                    borderWidth:1.1,
                    borderColor:`rgba(${Colors.rgb.primary}, .8)`,
                    // marginHorizontal:14
                }}
                />

                 <ActivityIndicator 
                    color={Colors.lighter} 
                    size={66}
                    style={{
                        zIndex:-1,
                        position:"absolute",
                        left:0,
                        right:0,
                        bottom:40,
                        top:0
                    }}
                    />
                 <View style={{
                    
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:'100%',
                 }}>
                 <Pressable
                    // disabled={!prompt.length>5}

                    android_ripple={{color:'rgba(40, 40, 40, .3)'}}
                    style={{
                        paddingHorizontal:9,
                        paddingVertical:14,
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:Colors.red,
                        borderRadius:9,
                        marginTop:55,
                        width:"75%",
                        // position:'absolute',
                        // bottom:10,
                        // left:0,
                        // right:0,
                        // marginHorizontal:15,
                    }}
                    onPress={()=>setIsVisible(false)}
                    >
                            
                            <Text style={{
                                color:Colors.lighter,
                                fontSize:16,
                                fontWeight:"500"
                            }}>Back</Text>
                    

                </Pressable>
                 <Pressable
                    // disabled={!prompt.length>5}

                    android_ripple={{color:'rgba(40, 40, 40, .3)'}}
                    style={{
                        paddingHorizontal:9,
                        paddingVertical:14,
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:'rgba(30, 200, 30, .9)',
                        borderRadius:9,
                        marginTop:55,
                        width:"20%",
                        // flexDirection:"row",
                        // justifyContent:"space-between",
                        // position:'absolute',
                        // bottom:10,
                        // left:0,
                        // right:0,
                        // marginHorizontal:15,
                    }}
                    onPress={()=>handleDownload()}
                    >
                        {
                            isDownloading
                            ?
                            <ActivityIndicator color={Colors.lighter} size={21}/>
                            :
                            <OcticonsIcon name='download' size={22} color={Colors.lighter}/>
                        }
                        {/* <Lottie style={{
                            // height:55,
                            // width:55
                        }} source={require('../lottie/download.json')} autoPlay loop /> */}
                            
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
    )};

    
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
    let  fileName = 'image_'+ Math.floor(date.getTime() + date.getSeconds() / 2) + ext
    // let PictureDir = fs.dirs.PictureDir;
    
    const { config, fs } = RNFetchBlob;
    // console.log('fs.dirs')
    console.log('fileName', fileName)
    // const destPath = RNFetchBlob.fs.dirs.DownloadDir + '/ChatGPT App/' + fileName;
    const destPath = fs.dirs.DownloadDir + '/ChatGPT App/'+ fileName;
    // console.log('fs.dirs.PictureDir', fs.dirs.DCIMDir , "\n", destPath)

    let options = {
        fileCache: true,
        addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: destPath ,
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
        .catch(error=>{
            console.log('error fetch', error)
            setIsDownloading(false)
            });
    };

    const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
                /[^.]+$/.exec(filename) : undefined;
    };

    

    const handleDownload=()=>{
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
            try{
                checkPermission(selectedImage.url)
                
                // "normal | success | warning | danger | custom",
                toast.update(id, "Successfully downloaded \n To : ChatGPT App", {
                    type: "success",
                  });
            } catch (error){
                console.log('download error', error)
                toast.update(id, "Error while downloading", {
                    type: "danger",
                  });

                }
                
            setIsDownloading(false)
            
            
        }, 1000);
    };


    
    const handleRecordEvent=()=>{
        var rec = !isRecording
        setIsRecording(!isRecording)
        if (rec){
            console.log('start recording ...')
            startRecording()
            
        }
        else{
            console.log('end recording ...')
            stopRecording()
        }
        setTimeout(() => {
            // setIsRecording(false)
        }, 2000);


    };
    

    const fetchData=async()=>{
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
            
            console.log("result length",result.length)
            setData(result)

            let initOptions = result[0]


            // let initOptions = data[0]
            // setGender(title);

            setLanguages(getUniques(result.map(el=>el.language)))
            setLanguage(initOptions.language)

            setAges(getUniques(result.filter(el=>el.language==language && el.gender == gender).map(el=>el.age)))
            setAge(initOptions.age)
            
            setVoices(getUniques(result.filter(el=>el.language==language && el.age==age && el.gender == gender).map(el=> {return({name: el.name, id:el.id})})))
            setVoice(initOptions)
            setLoudnesses(getUniques(result.filter(el=>el.language==language && el.age==age && el.gender == gender).map(el=> el.loudness)))
            setLoudness(initOptions.loudness)
            
        
        })
        .catch(error => {
            console.log('error', error)
        })
        .finally(()=>{
            setFetchingData(false)
        })
        ;
    };



    
    const [audioLink ,setAudioLink] = useState('')
    const [isPlaying ,setIsPlaying] = useState(false)
    const [started ,setStarted] = useState(false)



    const handleGenerating=async()=>{
        Keyboard.dismiss()
        setAudioLink('')
        
        var url = `${API_URL}/tts`

        // setPrompt('')
        setIsLoading(true)
        try {
            
            const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                AUTHORIZATION: `Bearer ${voiceOverConfig.SECRET_KEY}`,
                'X-USER-ID': voiceOverConfig.USER_ID
            },
            body: JSON.stringify({
                text: prompt,
                voice: voice.id,
                quality: 'medium',
                output_format: format.toLowerCase(),
                speed: 1,
                sample_rate: 24000,
                seed: 1
            })
            };

            
            var myHeaders = new Headers();
            myHeaders.append("X-User-Id", voiceOverConfig.USER_ID);
            myHeaders.append("Authorization", `Bearer ${voiceOverConfig.SECRET_KEY}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "text": prompt,
            // "speed": 1,
            "voice": voice.id,
            // "quality": "medium",
            // "output_format": format.toLowerCase(),
            // "sample_rate": 24000
            });

            // console.log(raw)
            

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(url, options)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                // var resp = result.data.data
                setRespond(result)
                // fetch(result.)
            })
            .catch(error => console.log('error', error))
            .finally(res=>{
                // console.log("respond", respond.created)
                var link = `${API_URL}/tts/${respond.id}?format=event-stream`
                console.log('gg', link)
                    
                                
                var myHeaders = new Headers();
                myHeaders.append("X-User-Id", voiceOverConfig.USER_ID);
                myHeaders.append("Authorization", `Bearer ${voiceOverConfig.SECRET_KEY}`);
                myHeaders.append("Content-Type", "application/json");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                  };
                  
                fetch(link, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var demo1 = result.split("data: ", undefined)
                    var demo1 = demo1[demo1.length-1]
                    var demo2 = JSON.parse(demo1)
                    
                    let audioLink = demo2.url

                    setAudioLink(audioLink)
                    scrollViewRef.current.scrollToEnd({ animated: true })
                    
                    console.log("audioLink", audioLink)
                    // console('ded')
                    })
                .catch(error => console.log('finally error', error))
            })
            
        }
        catch (error){
            console.error("error", error)
        }
        
        setIsLoading(false)
        console.log('finished')
        // setTimeout(() => {
        // }, 800);
    };




    const handlePlaySound=()=>{
        setIsPlaying(true)

        const sound = new Sound(audioLink,
        undefined,
        error => {
        if (error) {
            console.error(error)
            setIsPlaying(false)
        } else {
            setStarted(true)
            setIsPlaying(false)
            console.log("Playing sound");
            
            sound.play(() => {
                // Release when it's done so we're not using up resources
                sound.release();
                // console.log('gelf e')
                setStarted(false)
            });
        }
        });
    }
        




  return (
      <ScreenWrapper back title='AI Voiceover Generator'>
            
        
        {modall()}
{!fetchingData?
        <ScrollView
          keyboardShouldPersistTaps='handled'
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingBottom:22,
          }}
          >

            <View style={[styles.chatContainer, {
                flex:1,
                paddingHorizontal:14,
                }]}>

                    {   isRecording
                    &&
                    <View style={{
                        width:"100%",
                        backgroundColor:'red',
                        paddingVertical:9,
                        paddingBottom:29,
                        opacity:.8,
                        borderRadius:4,
                        // flexDirection:'row',
                        // position:"absolute",
                        justifyContent:"center",
                        alignItems:"center",
                        // top:"50%",
                        // bottom:"50%",
                        // right:"50%",
                        // left:"50%",
                        // bottom:"50%",
                        zIndex:5,
                        // paddingBottom:33,
                        marginBottom:5,
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
                    flexDirection:'row',
                    // alignItems:"center",
                    justifyContent:"space-between"
                }}>
                                    
                    <TextInput 
                        value={prompt}
                        onChangeText={(value)=>setPrompt(value)}
                        multiline={true} // ios fix for centering it at the top-left corner 
                        numberOfLines={7} 
                        placeholder={isRecording ? "start talking ..." : kb.isVisible ? 'Write a prompt here ...' : 'click here to start a conversation ...'} 
                        placeholderTextColor={styleColors.placeholderTextColor}
                        style={{
                            // backgroundColor:'rgba(100, 100, 100, .041)',
                            backgroundColor:styleColors.placeholder,
                            color:styleColors.placeholderText,
                            padding:10,
                            flex:1,
                            fontSize:15,
                            justifyContent:"flex-start",
                            alignContent:'flex-start',
                            alignItems:'flex-start',
                            textAlignVertical: 'top',
                            verticalAlign:"top",
                            borderWidth:1,
                            borderColor:styleColors.primary,
                            borderRadius:8,
                            marginVertical:5,
                            marginBottom:11,
                            
                        }}
                        />

                    <TouchableOpacity style={{
                        opacity:.5,
                        paddingHorizontal:13,
                        borderRadius:8,
                        height:44,
                        zIndex:2,
                        marginTop:5,
                        // display:!kb.isVisible ? "none" : "flex",
                        // position:"absolute",
                        // right:8,
                        // bottom:8,
                        borderRadius:44,
                        paddingVertical:5,
                        marginStart:9,
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:isRecording ? 'rgba(250, 100, 100, .2)' : 'rgba(100, 100, 100, .2)',
                        flexDirection:'row',
                    }}
                    // disabled={message.length<4}
                    onPress={handleRecordEvent}
                    >
                        
                        <Ionicons name="mic" size={17} color={isRecording ? 'red' : styleColors.color} />
                        {/* <Text style={{fontSize:16, color:"white", marginLeft:9}}>Send</Text> */}
                    </TouchableOpacity>
                </View>






                <View style={{
                    marginBottom:9,
                }}>
                <Text style={[styles.title, {color:styleColors.color}]}>Gender</Text>
                


                <View style={{
                    flexDirection:'row',
                    alignItems:"center",
                    justifyContent:"space-between",
                    // marginBottom:5,
                }}>



                    {genders.map((el, i)=><GenderComponent key={i} title={el} end={i==(genders.length-1)}/>)}
                </View>



                </View>




                <View style={{
                    marginBottom:9,
                }}>
                <Text style={[styles.title, {color:styleColors.color}]}>Language ({languages.length})</Text>
                



                    <Picker
                        mode='dropdown'
                        selectedValue={language}
                        style={{
                            paddingVertical:0,
                            marginVertical:0,
                            backgroundColor:styleColors.placeholder
                        }}
                        dropdownIconColor={styleColors.color}
                        onValueChange={(itemValue, itemIndex) =>
                            setLanguage(itemValue.toLowerCase())
                        }>
                            {languages.map((el,i)=>{
                                var selected = el==language
                            
                            return(
                            <Picker.Item key={i} label={el.replace(/\b\w/g, letter => letter.toUpperCase())} value={el} style={{
                                borderRadius:9,
                                // color:mode=="light"? styleColors.color:,
                                color:mode=="light"? selected ? "rgb(0, 0, 0)" : "rgb(150, 150, 150)" : selected ? "rgb(255, 255, 255)" : "rgb(100, 100, 100)",
                                // marginTop:0,
                                fontWeight:selected ? "700" : "bold",
                                backgroundColor:styleColors.placeholder,
                                // backgroundColor:selected ? styleColors.backgroundColor : styleColors.placeholder ,
                            }}/>
                            )})}
                        
                        
                        </Picker>



                </View>





                <View style={{
                    marginBottom:9,
                }}>
                <Text style={[styles.title, {color:styleColors.color}]}>Age ({ages.length})</Text>
                



                    <Picker
                        mode='dropdown'
                        selectedValue={age}
                        style={{
                            paddingVertical:0,
                            marginVertical:0,
                            backgroundColor:styleColors.placeholder
                        }}
                        dropdownIconColor={styleColors.color}
                        onValueChange={(itemValue, itemIndex) =>{
                            setAge(itemValue)

                            
                            var newData = getUniques(data.filter(el=>el.language==language && el.age==itemValue && el.gender == gender).map(el=> {return({name: el.name, id:el.id})}))
                            

                            var initOptions = newData[0]

                            setVoice(initOptions)
                            setLoudnesses(getUniques(data.filter(el=>el.language==language && el.age==itemValue && el.gender == gender).map(el=> el.loudness)))
                            setLoudness(initOptions.loudness)
                        
                            setVoices(newData)
                            setVoice(newData[0])
                            // console.info('names', itemValue, newData.length)



                        }}>
                            {ages.map((el,i)=>{
                                var selected = el==age
                            
                            return(
                            <Picker.Item key={i} label={el.replace(/\b\w/g, letter => letter.toUpperCase())} value={el} style={{
                                borderRadius:9,
                                // color:mode=="light"? styleColors.color:,
                                color:mode=="light"? selected ? "rgb(0, 0, 0)" : "rgb(150, 150, 150)" : selected ? "rgb(255, 255, 255)" : "rgb(100, 100, 100)",
                                // marginTop:0,
                                fontWeight:selected ? "700" : "bold",
                                backgroundColor:styleColors.placeholder,
                                // backgroundColor:selected ? styleColors.backgroundColor : styleColors.placeholder ,
                            }}/>
                            )})}
                        
                        
                        </Picker>



                </View>





                <View style={{
                    marginBottom:9,
                }}>
                <Text style={[styles.title, {color:styleColors.color}]}>Voice ({voices.length})</Text>
                



                    <Picker
                        mode='dropdown'
                        
                        selectedValue={voice.id}
                        style={{
                            paddingVertical:0,
                            marginVertical:0,
                            backgroundColor:styleColors.placeholder
                        }}
                        dropdownIconColor={styleColors.color}
                        onValueChange={(itemValue, itemIndex) =>{
                            setVoice(voices.filter(el=>el.id==itemValue)[0])
                        }}>
                            {voices.map((el,i)=>{
                                var selected = el.id==voice.id
                                // console.log('jj', selected, voice, '=', el)
                                // var selected = el==voice.toLowerCase()
                            
                            return(
                            <Picker.Item key={i} label={el.name} value={el.id} style={{
                                borderRadius:9,
                                // color:mode=="light"? styleColors.color:,
                                color:mode=="light"? selected ? "rgb(0, 0, 0)" : "rgb(150, 150, 150)" : selected ? "rgb(255, 255, 255)" : "rgb(100, 100, 100)",
                                // marginTop:0,
                                fontWeight:selected ? "700" : "bold",
                                backgroundColor:styleColors.placeholder,
                                // backgroundColor:selected ? styleColors.backgroundColor : styleColors.placeholder ,
                            }}/>
                            )})}
                        
                        
                        </Picker>



                </View>




                <View style={{
                    alignItems:"center",
                    justifyContent:"center",
                    paddingTop:15,
                    paddingBottom:5,
                }}>
                    <Text style={{color:styleColors.color, opacity:.4}}>------------------------ result options ------------------------</Text>
                </View>




                <View style={{
                    marginBottom:9,
                }}>
                <Text style={[styles.title, {color:styleColors.color}]}>Output format</Text>
                



                    <Picker
                        mode='dropdown'
                        selectedValue={format}
                        style={{
                            paddingVertical:0,
                            marginVertical:0,
                            backgroundColor:styleColors.placeholder
                        }}
                        dropdownIconColor={styleColors.color}
                        onValueChange={(itemValue, itemIndex) =>
                            setFormat(itemValue)
                        }>
                            {formats.map((el,i)=>{
                                var selected = el==format
                            
                            return(
                            <Picker.Item key={i} label={"."+el} value={el} style={{
                                borderRadius:9,
                                // color:mode=="light"? styleColors.color:,
                                color:mode=="light"? selected ? "rgb(0, 0, 0)" : "rgb(150, 150, 150)" : selected ? "rgb(255, 255, 255)" : "rgb(100, 100, 100)",
                                // marginTop:0,
                                fontWeight:selected ? "700" : "bold",
                                backgroundColor:styleColors.placeholder,
                                // backgroundColor:selected ? styleColors.backgroundColor : styleColors.placeholder ,
                            }}/>
                            )})}
                        
                        
                        </Picker>



                </View>




                        

                {audioLink
                    &&
                    <View style={{
                    marginTop:22,
                    paddingHorizontal:14,
                    zIndex:11,
                    backgroundColor:styleColors.backgroundColor,
                    justifyContent:'center',
                    alignSelf:'center',
                    // alignItems:'center',
                    width:Dimensions.get('window').width,
                }}>
                    
                
                <Pressable
                    // disabled={!audioLink.length>5}

                    android_ripple={{color:'rgba(40, 40, 40, .3)'}}
                    style={{
                        paddingHorizontal:9,
                        // opacity: audioLink.length>4 ? 1 : .2,
                        paddingVertical:14,
                        alignItems:"center",
                        flexDirection:'row',
                        justifyContent:"center",
                        // borderWidth:1,
                        borderColor:mode == "dark" ? styleColors.color : undefined,
                        // backgroundColor:mode == "light" ? styleColors.primary : undefined,
                        borderRadius:9,
                    }}
                    onPress={handlePlaySound}
                        >
                            {
                                isPlaying 
                                ?
                                <ActivityIndicator color={Colors.red} size={21} />
                                :
                                <Ionicons name={started ? "pause-circle-outline" : "play"} color={Colors.red} size={21} />

                            }
                        
                            <Text style={{
                                // color:mode == "light" ?  styleColors.backgroundColor : styleColors.color,
                                color:isPlaying ? styleColors.color : Colors.red,
                                // color: styleColors.backgroundColor,
                                fontSize:16,
                                zIndex:55,
                                marginStart:7,
                                // opacity:audioLink.length>5 ? 1: .4,
                                fontWeight:"500"
                            }}>{isPlaying ? started ? "Stop" : "Playing ..." : "Play Sound"}</Text>
                        

                </Pressable>







                






                </View>}
            </View>




            

               
            


        



        <View style={{
            marginTop:22,
            // position:"absolute",
            // bottom:kb.isVisible ? kb.height*1+0 : 0,
            // opacity:kb.isVisible ? !prompt.length>5 ? 1 : 1 : .4, 
            // left:0,
            // right:0,
            // marginHorizontal:14,
            paddingHorizontal:14,
            zIndex:11,
            backgroundColor:styleColors.backgroundColor,
            justifyContent:'center',
            alignSelf:'center',
            // alignItems:'center',
            width:Dimensions.get('window').width,
        }}>
            
        
        <Pressable
            disabled={!prompt.length>5}

            android_ripple={{color:'rgba(40, 40, 40, .3)'}}
            style={{
                paddingHorizontal:9,
                opacity: prompt.length>4 ? 1 : .2,
                paddingVertical:14,
                alignItems:"center",
                flexDirection:'row',
                justifyContent:"center",
                borderWidth:1,
                borderColor:mode == "dark" ? styleColors.color : undefined,
                backgroundColor:mode == "light" ? styleColors.primary : undefined,
                borderRadius:9,
            }}
            onPress={handleGenerating}
            >
                {
                    isLoading
                    &&
                    <ActivityIndicator
                        // color={mode=="dark" ? styleColors.color : styleColors.backgroundColor}
                        color={styleColors.color}
                    />
                }
                    
                    <Text style={{
                        color:mode == "light" ?  styleColors.backgroundColor : styleColors.color,
                        // color: styleColors.backgroundColor,
                        fontSize:16,
                        zIndex:55,
                        marginStart:7,
                        // opacity:prompt.length>5 ? 1: .4,
                        fontWeight:"500"
                    }}>{isLoading ? "Generating ..." : "Generate"}</Text>
                

        </Pressable>
        
        </View>


        <View style={{
            height: kb.isVisible ? kb.height*1 : 5,
        }} />
        
        </ScrollView>
:
<View style={{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
}}>

    <ActivityIndicator size={22} color={styleColors.color}/>
    <Text style={[styles.title, {color:styleColors.color, fontSize:14, marginTop:11,}]}>waite a while ...</Text>
</View>
}
        
        


    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    typingContainer:{
        zIndex:11,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"flex-end",
        paddingVertical:8,
        // width:'100%',
        height:'auto',
        // height:55,
        alignSelf:"center",
        borderRadius:16,
        paddingHorizontal:9,
        position:'absolute',
        bottom:40,

    },
    chatContainer:{
        flex:1,
        // height:Dimensions.get("window").height*.8,
    },
    titleContainer:{
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        paddingVertical:15,
        marginBottom:9,
        paddingBottom:13,
        // backgroundColor:Colors.primary,
    },
    title:{
        fontSize:19,
        // color:"#FFF",
        color:Colors.primary,
        fontWeight:"500",
        marginVertical:4,
        marginBottom:9,

    }
})