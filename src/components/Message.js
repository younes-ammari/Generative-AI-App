import { Dimensions, Image, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import { TypingAnimation } from "react-native-typing-animation";
import AppContext from '../hooks/useContext';

export default function Message({
    text='hello world',
    respond=false,
    isLoading=false,

}) {

          
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setAppDataHandler,
    
  } = React.useContext(AppContext)


  const deviceMode = useColorScheme()
    
  const mode = displayMode=="auto" ? deviceMode : displayMode
  
  


    const images={
        chatGPT:{uri:"https://www.primelawgroup.com/wp-content/uploads/2023/02/chatgpt-icon.png"},
        // person:{uri:"https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png"}
        person:{uri:"https://www.pngitem.com/pimgs/m/391-3918613_personal-service-platform-person-icon-circle-png-transparent.png"}
    }



  return (
    <View style={[styles.container, {
        flexDirection:respond ? 'row-reverse' : 'row',
        alignItems:"flex-start",
        justifyContent:respond ? "flex-start" : "flex-end" ,
        justifyContent:"flex-end",
        // width:Dimensions.get('window').width*.95,
        // marginHorizontal:88,
        alignSelf:"center",
        width:"100%",
        paddingHorizontal:25,
        marginBottom:4,
        // backgroundColor:respond ? null : 'rgba(100, 100, 100, .2)'
        // backgroundColor:!respond ? null : 'rgba(100, 100, 100, .2)'
        marginStart:27,
        marginEnd:11,
    }]}>


            <View style={[styles.message, {
                // flexWrap:"wrap",
                // flex:1,
                borderRadius:0,
                borderTopLeftRadius:respond ? 0 : 12,
                borderTopRightRadius:!respond ? 0 : 12,
                borderBottomRightRadius:12,
                padding:2,
                borderBottomLeftRadius:12,
                // alignSelf:"flex-start",
                // alignItems:respond ? "flex-start" : "flex-end",
                // justifyContent:"flex-start",
                backgroundColor:respond ? 'rgba(1, 51, 253, .15)' : 'rgba(100, 100, 100, .2)' ,
                marginTop:5,
                paddingHorizontal:11,
                paddingVertical:9,
            }]}>

                {
                    isLoading
                    ?
                    <TypingAnimation dotColor={styleColors.color} dotMargin={8}/>
                    :
                    <Text style={{
                        color:styleColors.color,
                        opacity:!!respond ?  .8 : 1,
                        }}>{text}</Text>
                }
            
        </View>
        <View style={[styles.sender, {
            // backgroundColor:respond ? null : Colors.primary,
            backgroundColor:respond ? null : "rgba(100, 100, 100, 1)",
            borderRadius:16,
            // backgroundColor:'red'
        }]}>
            
            {
                respond 
                ?
                <MaterialCommunityIcons name='robot' color={Colors.primary} size={25} />
                // <Image
                // style={[styles.sender, {
                //     // backgroundColor: 'white' ,
                //     // overlayColor:'red'
                //     // padding:15,
                //     opacity:respond ? 1 : .5,
                //     borderWidth:1.4,
                //     // borderColor:'black'
                //     borderColor:respond ? '#0b67f5' : '#FF5668'
                // }]}
                // source={respond ? images.chatGPT : images.person}
                // />
                :
                // <Icon name="user" size={20} color="#0b67f5" />
                // <Icon name="user-alt" allowFontScaling size={12} color="rgba(255, 255, 255, 1)" />
                <Icon name="user-alt" allowFontScaling size={12} color="rgba(255, 255, 255, 1)" />

            }
        
            
        </View>


    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:11,
        marginVertical:1,
        padding:5,
        // width:"100%",
        // borderWidth:1,
        // borderRadius:8,
        // flexDirection:'row',
        // alignSelf:"flex-start",
        // alignItems:"flex-start",
        justifyContent:"flex-start",
        // backgroundColor:'red',
        // justifyContent:"space-between"

    },
    message:{
        // borderWidth:1,
        borderRadius:8,
        // flex:1,
        // width:"auto",
        color:Colors.darker,
        paddingVertical:6,
        paddingHorizontal:8,
        marginHorizontal:5,
    },
    sender:{
        // flex:1,
        margin:1,
        marginTop:5,
        marginBottom:5,
        height:28,
        width:28,
        alignItems:"center",
        justifyContent:"center",
        
        borderRadius:22,
    }
})