import { Dimensions, FlatList, Keyboard, KeyboardAvoidingView, LogBox, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Message from '../components/Message'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useKeyboard } from '../hooks/useKeyboard'
import TypeWriter from '../components/TypeWriter'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors'


export default function Chat({navigation}) {

    const kb = useKeyboard();
    const scrollViewRef = useRef();
    const scrollViewChatRef = useRef();
    const [message, setMessage]= useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [respond, setRespond]= useState('')
    
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
    console.log('kb', kb)





  return (
    <ScreenWrapper back>

        <View style={styles.titleContainer}>

        <Text style={styles.title}>Chat</Text>
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

                                    item.id >= maxID && item.isRespond
                                    ?
                                    <TypeWriter scrollRef={scrollViewChatRef} delay={50} text={item.content}/>
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
                    borderRadius: !kb.isVisible ?  16 : 0,
                    zIndex:11,
                    marginHorizontal: !kb.isVisible ?  22 : 0,
                    // flex:1,
                    // paddingBottom:25,
                    backgroundColor:"white",
                    // backgroundColor:'red',
                    
                    // paddingBottom:keyboardOffset==0 ? 8 :115,
                    // marginBottom:15,
                    // marginTop:7,
                    position : kb.isVisible ? "relative" : "absolute" ,
                    bottom : kb.isVisible ? kb.height*1.08 : 41,
                    }]}>
                    <TextInput 
                        pointerEvents={'none'}
                        multiline
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
                            borderWidth:1,
                            color:Colors.darker,
                            borderColor:"rgba(100, 100, 100, .7)",
                            borderRadius:8,
                            paddingHorizontal:11,
                            paddingVertical:7,
                            zIndex:1,
                            
                        }}
                        placeholder='write a message here ...'
                        value={message}
                        onChangeText={(text)=>setMessage(text)}
                        />
                    
                    
                    <TouchableOpacity style={{
                        opacity:message.length<4?.7:1,
                        paddingHorizontal:13,
                        borderRadius:8,
                        height:44,
                        zIndex:2,
                        // position:"absolute",
                        // right:8,
                        // bottom:8,
                        paddingVertical:5,
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:'#0b67f5',
                        flexDirection:'row',
                    }}
                    // disabled={message.length<4}
                    onPress={handleSendEvent}
                    >
                        
                        <Icon name="send" size={17} color={"#FFF"} />
                        <Text style={{fontSize:16, color:"white", marginLeft:9}}>Send</Text>
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