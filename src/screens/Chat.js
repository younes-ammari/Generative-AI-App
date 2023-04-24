import { Dimensions, FlatList, Keyboard, KeyboardAvoidingView, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Message from '../components/Message'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useKeyboard } from '../hooks/useKeyboard'
import TypeWriter from '../components/TypeWriter'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors'
import { TypingAnimation } from "react-native-typing-animation";
import { Configuration, OpenAIApi } from "openai"
import config from '../config/openAI'
import AppContext from '../hooks/useContext'
// import AnimatedRing from '../components/RecordingEffect'
import Voice from '@react-native-community/voice';


export default function Chat({navigation}) {
    const configuration = new Configuration({
        apiKey: config.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
    
      const history = [{
        content:"hello",
        isRespond:true,
      }];

    const kb = useKeyboard();
    const scrollViewRef = useRef();
    const inputRef = useRef();
    const scrollViewChatRef = useRef();
    const [isFocused, setIsFocused] = useState(false)

    const [isWriting, setIsWriting] = useState(false)
    const delay = 50
    
    const [message, setMessage]= useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [respond, setRespond]= useState('')


    
    const WH = Dimensions.get('window').height
    const WW = Dimensions.get('window').width;


    const { displayMode, styleColors, appData} = useContext(AppContext)

    const deviceMode = useColorScheme()
    
    const mode = displayMode=="auto" ? deviceMode : displayMode
    
    
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);

    
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
    setMessage(newMessage)
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



    if (kb.isVisible){
    scrollViewRef.current.scrollToEnd({ animated: true })
    // inputRef.current.placeholder = "55"
    // console.log('placeholder', inputRef.current)
    }

    const demos = [
        {
            id:1,
            isRespond:true,
            content:'welcome in ChatGPT'
        },
        {
            id:2,
            isRespond:false,
            content:'content message content message '
        },
        {
            id:3,
            isRespond:true,
            content:'content respond content respond content respond content respond '
        },
        {
            id:4,
            isRespond:false,
            content:'content message content message '
        },
        {
            id:5,
            isRespond:true,
            content:'content respond content respond content respond content respond '
        },
        {
            id:6,
            isRespond:false,
            content:'content message content message '
        },
        {
            id:7,
            isRespond:true,
            content:'content respond content respond content respond content respond '
        },
        {
            id:8,
            isRespond:false,
            content:'content message content message '
        },
        {
            id:9,
            isRespond:true,
            content:'content respond content respond content respond content respond '
        },
        {
            id:10,
            isRespond:false,
            content:'content message content message '
        },
        {
            id:11,
            isRespond:true,
            content:'content respond content respond content respond content respond '
        },
        {
            id:12,
            isRespond:false,
            content:'content message content message '
        },
        {
            id:13,
            isRespond:true,
            content:'content respond content respond content respond content respond '
        },
    ]

    const [data, setData] = useState([{
        id:0,
        isRespond:true,
        content:`Hey ${appData.user.name}, how can i assist you !`
    }])

    const messages = [];

    const handleChat0=async()=>{
        const user_input = message;
        var i = 0
        var old = []

        for (const [input_text, completion_text] of history) {
            i=i+1
            old.push(
                {
                    id:`user-id-${i}`,
                    isRespond:false,
                    role: "user", 
                    content: input_text
                },
                {
                    id:`assistant-id-${i}`,
                    isRespond:true,
                    role: "assistant", 
                    content: completion_text
                }
            );
            messages.push({ role: "user", content: input_text });
            messages.push({ role: "assistant", content: completion_text });
        }

        messages.push({ role: "user", content: user_input });

        try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const completion_text = completion.data.choices[0].message.content;
        console.log(completion_text);

        history.push([user_input, completion_text]);
        
        } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        }
    }
    
    const handleChat=async()=>{
        const user_input = message;
        var i = 0
        var old = []
        var maxID = data.length>0 ? Math.max(...data.map(el=>el.id)) : 1
        var oldData = data
        var newData= [...oldData, 
                {
                    id:maxID+1,
                    role: "user",
                    isRespond:false,
                    content:user_input
                },
                {
                    id:maxID+2,
                    role: "assistant",
                    isRespond:true,
                    content:""
                },
            ]

        setData(newData)


        messages.push({ role: "user", content: user_input });

        setIsLoading(true)
        try {
            var mes = newData.map(el=>{
                if (!el.role){el.role = 'user'}
                return{role:el.role, content:el.content}})
            console.log('mes', mes)
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: mes,
        });

        const completion_text = completion.data.choices[0].message.content;
        console.log(completion_text);

        history.push([user_input, completion_text]);

        newData[newData.length-1] = {
            id:maxID+2,
            isRespond:true,
            content:completion_text
        }
        console.log('last', newData[newData.length-1])
        setData(newData)
        
        } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        }
        setIsLoading(false)
    }
    
    const handleSendEvent=()=>{
        var maxID = data.length>0 ? Math.max(...data.map(el=>el.id)) : 1
        console.log(maxID)
        var oldData = data
        console.log(oldData)
        if (message.length>3){
            handleChat();
           
            setRespond('...')
            setMessage('')
            Keyboard.dismiss()
            
            
        }
    }
    // console.log('kb', kb)
    
//   console.info('message', message)


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


    }





  return (
    <ScreenWrapper back title="Chat">

        {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>Chat</Text>

        </View> */}

        



        <ScrollView
          keyboardShouldPersistTaps='handled'
        //   scrollEnabled={!kb.isVisible}
          ref={scrollViewRef}
          >
            
        <View style={{
            flex:1,
            // backgroundColor:"red",
            // height:WH*.95,
            // height:WH,
            // maxHeight:WH*.85,
            // paddingBottom:25,
            // alignItems:"center",
            // justifyContent:"center",
        }}>
            {/* <Text style={{color:'red'}}>{String(isWriting)}</Text> */}

            

            {/* {isRecording && <AnimatedRing />} */}
            
            <View style={[styles.chatContainer, {
                flex:1,
                // maxHeight:WH*.78,
                // maxHeight:WH*.9,
                // paddingBottom:10
                // backgroundColor:'red',
                // height:Dimensions.get('window').height*.85
                }]}>

                    
                    

                    <FlatList 
                        ref={scrollViewChatRef}
                        nestedScrollEnabled
                        data={data}
                        keyExtractor={el=>el.id}
                        renderItem={({item})=>
                            {
                                var maxID =  Math.max(...data.map(el=>el.id))
                                return(
                                    isLoading && item.id >= maxID
                                    ?
                                    <Message isLoading respond text={item.content}/>
                                    :

                                    item.id >= maxID && item.isRespond
                                    ?
                                    <TypeWriter scrollRef={scrollViewChatRef} delay={delay} text={item.content} isWriting={(state)=>setIsWriting(state)}/>
                                    :
                                    <Message respond={item.isRespond} text={item.content}/>
                                    )
                            
                            }
                        }
                        style={{
                            // height:kb.isVisible ? WH*.5 - kb.height: null ,

                            // paddingTop:kb.isVisible ? kb.height : 0,
                            paddingVertical:kb.isVisible ? 10 : 0,
                            // paddingBottom:22,
                            // paddingBottom:kb.isVisible ? kb.height : 0
                        }}
                    />
                

                {   isRecording
                &&
                <View style={{
                    width:"100%",
                    backgroundColor:'red',
                    paddingVertical:18,
                    opacity:.8,
                    // position:"absolute",
                    justifyContent:"center",
                    alignItems:"center",
                    // top:"50%",
                    // bottom:"50%",
                    // bottom:"50%",
                    zIndex:5,
                    paddingBottom:33,
                }}>

                {/* <Text style={{
                    color:Colors.lighter,
                    zIndex:21,
                    fontSize:21,
                    textAlign:"center",
                }}>recording ...</Text> */}
                {/* dotAmplitude, dotSpeed, dotY */}

                <TypingAnimation 
                    dotMargin={9}
                    dotColor={Colors.lighter}
                    
                    />
                </View>}
            </View>

            

               
            


        <View style={{
            height: kb.isVisible ? kb.height*1 : 90,
            // backgroundColor:'red',
        }} />
        </View>

        </ScrollView>
    

        <View style={[styles.typingContainer, {
                    // height:51,
                    elevation: !kb.isVisible ?  9 : 0,
                    elevation:0,
                    borderRadius: !kb.isVisible ?  0 : 0,
                    zIndex:11,
                    marginHorizontal: !kb.isVisible ?  0 : 0,
                    // flex:1,
                    // paddingBottom:25,
                    paddingHorizontal:15,
                    backgroundColor:"white",
                    // backgroundColor:'red',
                    backgroundColor:styleColors.placeholder,
                    
                    // paddingBottom:keyboardOffset==0 ? 8 :115,
                    // marginBottom:15,
                    // marginTop:7,
                    position : kb.isVisible ? "relative" : "absolute" ,
                    bottom : kb.isVisible ? kb.height*1 : 0,
                    paddingBottom:kb.isVisible ? 25 : 33,
                    }]}>
                            <TextInput 
                                pointerEvents={'none'}
                                multiline
                                ref={inputRef}
                                // clearTextOnFocus
                                // onSubmitEditing={(text)=>setMessage(text)} 
                                // onBlur={() => Keyboard.dismiss()}
                                onBlur={() => setIsFocused(false)}
                                onFocus={() => setIsFocused(true)}
                                // onFocus={() => Keyboard.dismiss()}
                                // keyboardType='visible-password'
                                
                                placeholderTextColor={'rgba(100, 100, 100, .5)'}
                                style={{
                                    flexWrap:"wrap",
                                    flex:1,
                                    marginRight:8,
                                    borderWidth:kb.isVisible ? 1 : 0,
                                    color:styleColors.color,
                                    borderColor:"rgba(100, 100, 100, .7)",
                                    borderRadius:8,
                                    paddingHorizontal:11,
                                    paddingVertical:7,
                                    zIndex:1,
                                    
                                }}
                                placeholder={isRecording ? "start talking ..." : kb.isVisible ? "write a message ..." : 'click here to start a conversation ...'}
                                value={message}
                                onChangeText={(text)=>setMessage(text)}
                                // keyboardAppearance="dark"
                                keyboardAppearance={mode}
                                />

                            {message.length>4 && <TouchableOpacity style={{
                                position:"absolute",
                                right:127,
                                top:17,
                                bottom:10,
                                opacity:.7,
                                zIndex:11,
                                backgroundColor:styleColors.color,
                                justifyContent:"center",
                                alignItems:"center",
                                borderRadius:22,
                                height:18,
                                width:18,
                            }}
                            onPress={clear}
                            >

                            <Ionicons name="close" size={11} color={styleColors.backgroundColor} />
                            </TouchableOpacity>}
                        {/* </View> */}
                    
                    <TouchableOpacity style={{
                        opacity:.5,
                        paddingHorizontal:13,
                        borderRadius:8,
                        height:44,
                        zIndex:2,
                        display:!kb.isVisible ? "none" : "flex",
                        // position:"absolute",
                        // right:8,
                        // bottom:8,
                        borderRadius:44,
                        paddingVertical:5,
                        marginHorizontal:5,
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
                    
                    
                    <TouchableOpacity style={{
                        opacity:message.length<4 || isWriting ? .2:1,
                        paddingHorizontal:13,
                        borderRadius:8,
                        height:44,
                        zIndex:2,
                        display:!kb.isVisible ? "none" : "flex",
                        // position:"absolute",
                        // right:8,
                        // bottom:8,
                        borderRadius:44,
                        paddingVertical:5,
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:'#0b67f5',
                        flexDirection:'row',
                    }}
                    disabled={message.length<4 || isWriting}
                    onPress={handleSendEvent}
                    >
                        
                        <FontAwesome name="send" size={17} color={"#FFF"} />
                        {/* <Text style={{fontSize:16, color:"white", marginLeft:9}}>Send</Text> */}
                    </TouchableOpacity>

            
        </View>

        
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
        // height:'auto',
        // height:55,
        alignSelf:"center",

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
        fontSize:18,
        // color:"#FFF",
        color:Colors.primary,
        fontWeight:"500"

    }
})