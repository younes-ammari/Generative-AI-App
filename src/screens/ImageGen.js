import { Dimensions, FlatList, Keyboard, ActivityIndicator, KeyboardAvoidingView, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Message from '../components/Message'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useKeyboard } from '../hooks/useKeyboard'
import TypeWriter from '../components/TypeWriter'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import Colors from '../constants/Colors'
import Lottie from 'lottie-react-native';
import { Configuration, OpenAIApi } from 'openai';
import config from '../config/openAI'

export default function ImageGen({navigation}) {

    const configuration = new Configuration({
        apiKey: config.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
    
    const kb = useKeyboard();
    const scrollViewRef = useRef();
    const scrollViewChatRef = useRef();
    const [visible, setIsVisible]= useState(false)
    
    const [isLoading, setIsLoading] = useState(false)

    
    const result=[
        {
            url:'https://images.nightcafe.studio/jobs/rY2TxlazqPUzLomNPmnM/rY2TxlazqPUzLomNPmnM--1--gs4f2.jpg?tr=w-640,c-at_max'
        }
    ]
    const [respond, setRespond]= useState(result)
    const [prompt, setPrompt]= useState('')
    const [number, setNumber]= useState(1)
    const [size, setSize]= useState("1024x1024")
    const [isPremium, setIsPremium] = useState(false)
    const [selectedImage, setSelectedImage] = useState({url:"https://images.nightcafe.studio/jobs/rY2TxlazqPUzLomNPmnM/rY2TxlazqPUzLomNPmnM--1--gs4f2.jpg?tr=w-640,c-at_max"})
    
    const WH = Dimensions.get('window').height
    const WW = Dimensions.get('window').width

    useEffect(() => {
        
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    const SizeComponent=({title="1024x1024", end=false})=>{

        return(
            <Pressable style={{
                flex:1,
                paddingHorizontal:11,
                paddingVertical:11,
                // marginHorizontal:8,
                marginRight:!end ? 7 : 0,
                borderRadius:9,
                backgroundColor:title==size ? Colors.primary : null,
                marginVertical:8,
                borderWidth:2,
                borderColor:'rgba(100, 100, 100, .8)'

            }}
            onPress={()=>setSize(title)}
            >
                <Text style={{
                    fontSize:15,
                    fontWeight:"500",
                    textAlign:"center",
                    opacity:title==size ? 1 : .6,
                    color:title==size ? Colors.lighter : Colors.darker,
                }}>{title}</Text>

            </Pressable>
        )
    }



    if (kb.isVisible){
    // scrollViewRef.current.scrollToEnd({ animated: true })
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }

    const demos = [
        {
            id:1,
            isRespond:true,
            content:'welcome in ChatGPT'
        },
    ]

    const [data, setData] = useState(demos)
    

    const handleGenerating=async()=>{
        Keyboard.dismiss()

        // setPrompt('')
        setIsLoading(true)
        const response = await openai.createImage({
            prompt: "A cute baby sea otter",
            n: number,
            size: size,
          });

        var resp = response.data.data
        setRespond(resp)
        console.log(resp)
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

    const GeneratedImageComponent=({info})=>{
        var url = "https://user-images.githubusercontent.com/3059371/49334754-3c9dfe00-f5ab-11e8-8885-0192552d12a1.gif"

        return(
            <Pressable 
            android_ripple={{color:'rgba(100, 100, 100, .7)', }}
            style={{
                
                width:(Dimensions.get('window').width /2) -21 ,
                backgroundColor:`rgba(220, 220, 220, 1)`,
                marginBottom:9,
                elevation:5,
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
                    zIndex:-1,
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
                    zIndex:-1,
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
                        // backgroundColor:'rgba(30, 200, 30, .9)',
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
                    onPress={()=>setIsVisible(false)}
                    >
                        {/* <OcticonsIcon name='download' size={22} color={Colors.lighter}/> */}
                        <Lottie style={{
                            // height:55,
                            // width:55
                        }} source={require('../lottie/download.json')} autoPlay loop />
                            
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
    )}

  return (
    <ScreenWrapper back>
        
        {modall()}

        <View style={styles.titleContainer}>

        <Text style={styles.title}>Image Generator</Text>
        </View>
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
            <View style={[styles.chatContainer, {
                flex:1,
                paddingHorizontal:14,
                // justifyContent:"flex-start",
                // alignContent:'flex-start',
                // alignItems:'flex-start',
                // maxHeight:WH*.78,
                // maxHeight:WH*.9,
                // paddingBottom:10
                // backgroundColor:'red',
                // height:Dimensions.get('window').height*.85
                }]}>

                                    
                                
                <TextInput 
                      value={prompt}
                      onChangeText={(value)=>setPrompt(value)}
                      multiline={true} // ios fix for centering it at the top-left corner 
                      numberOfLines={7} 
                      placeholder='Prompt' 
                    //   placeholderTextColor={clr == Colors.lighter ? "rgba(200, 200, 200, .5)" : "rgba(100, 100, 100, .5)"}
                      style={{
                        backgroundColor:'rgba(100, 100, 100, .041)',
                        padding:10,
                        fontSize:15,
                        justifyContent:"flex-start",
                        alignContent:'flex-start',
                        alignItems:'flex-start',
                        textAlignVertical: 'top',
                        verticalAlign:"top",
                        borderWidth:1,
                        borderColor:Colors.primary,
                        borderRadius:8,
                        marginVertical:5,
                        marginBottom:11,

                    }}
                />
                {
                    number>1 
                    &&
                    <Text style={{
                        color:Colors.red,
                        fontSize:14,
                        textAlign:"center",
                        fontWeight:"600",
                        marginRight:10,
                    }}>require premium subscription</Text>
                }

                <View style={{
                    flexDirection:'row',
                    alignItems:"center",
                    justifyContent:'flex-start',
                    // flex:1,
                    // backgroundColor:'red'

                }}>

                    <Text style={{
                                color:Colors.darker,
                                fontSize:18,
                                fontWeight:"400",
                                marginRight:10,
                            }}>Image Number:</Text>

                <Pressable style={{
                    padding:8,
                    backgroundColor:'rgba(100, 100, 100, .15)',
                    marginHorizontal:3,
                    borderRadius:22,
                    height:44,
                    width:44,
                    alignItems:"center",
                    justifyContent:"center",
                }}
                onPress={()=>setNumber(number+1)}
                >
                    <Icon name='plus' size={17} color={`rgba(${Colors.rgb.primary}, 0.9)`}/>
                </Pressable>


                <Text style={{
                    marginHorizontal:5,
                    // backgroundColor:'rgba(100, 100, 100, .041)',
                    padding:10,
                    fontSize:22 ,
                    color:Colors.darker,
                    textAlign:"center",
                    fontWeight:"500",
                    // justifyContent:"flex-start",
                    // alignContent:'flex-start',
                    // alignItems:'flex-start',
                    textAlignVertical:"center",
                    verticalAlign:"middle",
                    // borderWidth:1,
                    borderColor:Colors.primary,
                    borderRadius:8,
                    marginVertical:5,
                    marginBottom:11,
                    
                }}>{number}</Text>

                
                <Pressable style={{
                    padding:8,
                    backgroundColor:'rgba(100, 100, 100, .15)',
                    marginHorizontal:3,
                    borderRadius:22,
                    height:44,
                    width:44,
                    alignItems:"center",
                    justifyContent:"center",
                }}
                onPress={()=>setNumber(number>1 ? number-1 : 1)}
                >
                    <Icon name='minus' size={17} color={`rgba(${Colors.rgb.primary}, 0.9)`}/>
                </Pressable>



                </View>


                <View style={{
                    flexDirection:'row',
                    alignItems:"center",
                    // justifyContent:'space-evenly',
                    justifyContent:"space-between",
                    marginBottom:5,
                }}>



                    {sizes.map((el, i)=><SizeComponent key={i} title={el} end={i==(sizes.length-1)}/>)}
                </View>


            </View>

            <View style={{

                flexDirection:'row',
                alignItems:"center",
                // width:'100%',
                // backgroundColor:"red",
                marginHorizontal:14,
                flexWrap:'wrap',
                justifyContent:"space-between",
            }}>



            {
                isLoading
                ?
                <View style={{
                    alignItems:"center",
                    width:"100%",
                    paddingVertical:55,
                    justifyContent:"center",
                }}>

                <ActivityIndicator size={55} color={Colors.primary}/>
                <Text style={{
                    marginTop:18,
                    fontSize:16,
                }}>generating ...</Text>
                </View>
                :
                respond.map((el, i)=><GeneratedImageComponent key={i} info={el} />)
            }
            </View>

            

               
            


        <View style={{
            height: kb.isVisible ? kb.height*1 : 90,
            // backgroundColor:'red',
        }} />
        </View>

        </ScrollView>

        


        <View style={{
            
            position:"absolute",
            bottom:kb.isVisible ? kb.height*1-4 : 0,
            left:0,
            right:0,
            // marginHorizontal:14,
            paddingHorizontal:14,
            zIndex:11,
            paddingVertical:5,
            paddingBottom:15,
            backgroundColor:Colors.lighter,
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
                opacity: prompt.length>5 ? 1 : .4,
                paddingVertical:14,
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:Colors.primary,
                borderRadius:9,
            }}
            onPress={handleGenerating}
            >
                {
                    isLoading
                    ?
                    <ActivityIndicator
                        color={Colors.lighter}
                    />
                    :
                    
                    <Text style={{
                        color:Colors.lighter,
                        fontSize:16,
                        fontWeight:"500"
                    }}>Generate</Text>
                }

        </Pressable>
        
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
        height:'auto',
        // height:55,
        alignSelf:"center",
        borderRadius:16,
        paddingHorizontal:9,
        // elevation:9,
        // backgroundColor:Colors.lighter,
        // marginBottom:14,
        // marginBottom:55,
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
        fontSize:18,
        // color:"#FFF",
        color:Colors.primary,
        fontWeight:"500"

    }
})