import { Dimensions, SafeAreaView, KeyboardAvoidingView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import Colors from './constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from './hooks/useContext';
import { ScrollView } from 'react-native-gesture-handler';

export default function ScreenWrapper(props) {
  
  const navigation = useNavigation()


    
  const {
    mode, 
    setMode,
    styleColors,
    appData,
  } = useContext(AppContext)

  // const styleColors = Colors[mode=="auto" ? useColorScheme() : mode]

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // backgroundColor: Colors.primary,
    backgroundColor: styleColors.backgroundColor,
  };

  const Tag = props.scroll ? ScrollView : View
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        // hidden
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        barStyle={'light-content'}
        // backgroundColor={Colors.primary}
      />
      <View style={{
        height:Dimensions.get('window').height*1,
        width:Dimensions.get('window').width,
        paddingTop:props.back || props.title ? 9 : 0,

      }}>
        <Tag style={{
          // backgroundColor:'red',
          flex:1,
          // alignItems:"flex-start",
          justifyContent:"flex-start",
          // justifyContent:"center",
          // alignItems:"center",
          }}>

          {
            props.back || props.title 
            ?
            <View style={{
              // height:555,
              // flex:1,
              width:"100%",
              paddingTop:1,
              // backgroundColor:'red',
              flexDirection:'row',
              alignItems:'center',
              justifyContent:"center",
              paddingTop:12,
              marginBottom:21,
              paddingHorizontal:5,
              // position:'relative',

            }}>

          
            {
              props.back 
              &&
              <View style={{
                // position:"absolute",
                // left:11,
                // top:'50%',
                // bottom:'50%',
                zIndex:13,
                alignItems:"center",
                justifyContent:"center",
                borderRadius:22,
                overflow:'hidden'

              }}>

              <Pressable style={{
                padding:5,
                height:44,
                width:44,
                alignItems:"center",
                justifyContent:"center",
                borderRadius:12
                
              }}
              android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}
              onPress={()=>navigation.goBack()}
              >
                <Icon name="ios-arrow-back" size={28} color={styleColors.header.backIconColor} />
              </Pressable>
              </View>
            }

            {
              props.title 
              &&
              <View style={{
                
                // position:"absolute",
                // left:'50%',
                // right:'50%',
                // width:'100%',
              // backgroundColor:'red',
                flex:1,
                zIndex:11,
                paddingLeft:11,
                alignItems: !props.back ? "center" : "flex-start",
                // justifyContent:"center",
              }}>
                <Text style={[styles.title, {color:styleColors.color}]}>{props.title}</Text>
              </View>  

            }

        
          </View>
          :
          <></>
          }

        

        {props.children}
        </Tag>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:21, 
    fontWeight:"400",
    textAlign:"center",
    // textAlign:"left",

  },
})