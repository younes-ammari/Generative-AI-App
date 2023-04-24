import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import Colors from './constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from './hooks/useContext';
import { ScrollView } from 'react-native-gesture-handler';

export default function ScreenWrapper(props) {
  
  const navigation = useNavigation();


  
  const {
    displayMode, 
    loadAppDataHandler,
    setMode,
    styleColors,
    appData,
  } = useContext(AppContext)

  
  React.useEffect(()=>{
    // loadAppDataHandler();
    
  }, [])
  
  
  const deviceMode = useColorScheme()
    
  // const styleColors = Colors[displayMode=="auto" ? deviceMode : displayMode]
  
  

  // const styleColors = Colors[useColorScheme()]
  // var styleColors = Colors["dark"]
  const backgroundStyle = {
    
    backgroundColor: styleColors.backgroundColor,
  };

  const Tag = props.scroll ? ScrollView : View
  const styleProp = props.scroll ? "contentContainerStyle" : "style"
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
        paddingTop:props.back || props.title ? 5 : 0,

      }}>
        <Tag style={[{
          // flex:1,
          // justifyContent:"flex-start",
          }, !props.scroll && {
            flex:1,
            justifyContent:"flex-start",}
            ]} contentContainerStyle={[props.scroll && {
              // backgroundColor:'red',
              // padding:555,
              paddingBottom:71,
            }]}>

          {
            props.back || props.title 
            ?
            <View style={{
              width:"100%",
              paddingTop:1,
              flexDirection:'row',
              alignItems:'center',
              justifyContent:"center",
              paddingTop:12,
              marginBottom:21,
              paddingHorizontal:5,

            }}>

          
            {
              props.back 
              &&
              <View style={{
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
                
                flex:1,
                zIndex:11,
                paddingLeft:11,
                justifyContent:"center",
                flexDirection:props.icon ? "row" : undefined,
                alignItems: !props.back ? "center" : "flex-start",
              }}>
                {
                  props.icon 
                  &&
                  props.icon

                }
                <Text style={[styles.title, {color:styleColors.color, marginStart:9,}]}>{props.title}</Text>
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
  },
})