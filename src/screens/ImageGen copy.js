import { Dimensions, FlatList, Keyboard, ActivityIndicator, KeyboardAvoidingView, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Message from '../components/Message'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useKeyboard } from '../hooks/useKeyboard'
import TypeWriter from '../components/TypeWriter'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors'


export default function ImageGen({navigation}) {

    const kb = useKeyboard();
    const scrollViewRef = useRef();
    const scrollViewChatRef = useRef();
    const [message, setMessage]= useState('')
    
    const [isLoading, setIsLoading] = useState(false)
    const [respond, setRespond]= useState('')
    const [prompt, setPrompt]= useState('')
    const [number, setNumber]= useState(1)
    
    const WH = Dimensions.get('window').height
    const WW = Dimensions.get('window').width

    useEffect(() => {
        
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);



    if (kb.isVisible){
    scrollViewRef.current.scrollToEnd({ animated: true })
    }

    const demos = [
        {
            id:1,
            isRespond:true,
            content:'welcome in ChatGPT'
        },
    ]

    const [data, setData] = useState(demos)
    
    const handleSendEvent=()=>{
        var maxID = Math.max(...data.map(el=>el.id))
        console.log(maxID)
        var oldData = data
        if (message.length>3){
            var newData= [...oldData, {
                id:maxID+1,
                isRespond:false,
                content:message
            }]
            setData(newData)
            setTimeout(() => {
                setMessage('')
                Keyboard.dismiss()
                
                scrollViewChatRef.current.scrollToEnd()
            }, 10);
            console.log('submited')
            setTimeout(() => {
                var resp = 'respond to' +message + 'is here ...'
                setRespond(resp)
                setData([...newData, {
                    id:maxID+2,
                    isRespond:true,
                    content:resp.repeat(5)
                }]);
                scrollViewChatRef.current.scrollToEnd({ animated: true })
            }, 1000);
            
        }
    }

    const handleGenerating=()=>{
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }
    console.log('kb', kb)





  return (
    <ScreenWrapper back>

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
                    <Icon name='plus' size={22} color={`rgba(${Colors.rgb.primary}, 0.9)`}/>
                </Pressable>


                {/* <TextInput 
                    value={String(number)}
                    defaultValue={String(number)}
                    // onChangeText={(value)=>setNumber(value)}
                    // multiline={true} // ios fix for centering it at the top-left corner 
                    // numberOfLines={7} 
                    placeholder='1' 
                    keyboardType='numeric'
                    //   placeholderTextColor={clr == Colors.lighter ? "rgba(200, 200, 200, .5)" : "rgba(100, 100, 100, .5)"}
                    style={{
                    marginHorizontal:5,
                    // backgroundColor:'rgba(100, 100, 100, .041)',
                    padding:10,
                    fontSize:21 ,
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
                    
                }}
                /> */}

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
                    <Icon name='minus' size={22} color={`rgba(${Colors.rgb.primary}, 0.9)`}/>
                </Pressable>



                </View>


                <Pressable

                    android_ripple={{color:'rgba(40, 40, 40, .3)'}}
                    style={{
                        paddingHorizontal:9,
                        paddingVertical:13,
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
                                fontSize:15,
                                fontWeight:"400"
                            }}>Generate</Text>
                        }

                </Pressable>
            </View>

            

               
            


        <View style={{
            height: kb.isVisible ? kb.height*1 : 90,
            // backgroundColor:'red',
        }} />
        </View>

        </ScrollView>

        
        
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