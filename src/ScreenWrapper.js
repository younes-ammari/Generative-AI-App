import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import Colors from './constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from './hooks/useContext';
import { ScrollView } from 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';


export default function ScreenWrapper(props) {
  
  const navigation = useNavigation();
  var status
  if (props.drawer){

    status  = useDrawerStatus()
  }


  
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
    
  const mode =displayMode=="auto" ? deviceMode : displayMode
  
  

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
        // paddingTop:props.back || props.title ? 5 : 0,

      }}>
        <Tag style={[{
          flex:1,
          // paddingTop:55,
          // justifyContent:"flex-start",
          }, !props.scroll && {
            flex:1,
            justifyContent:"flex-start",}
            ]} contentContainerStyle={[props.scroll && {
              // backgroundColor:'red',
              // padding:555,
              paddingBottom:71,
            }]}>

              {props.fill
              &&<View style={{
                width:"100%",
                backgroundColor:styleColors.backgroundColor,
                zIndex:1,
                position:"absolute",
                height:66,
                elevation:1,
              }}/>}
          
              {
                props.drawer
                &&
                <View style={{
                  zIndex:16,
                  height:44,
                  width:44,
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius:22,
                  position:"absolute",
                  left:10,
                  top:10,

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
                  onPress={()=>navigation.toggleDrawer()}
                  >
                    <Icon name="menu" size={29} color={props.drawerIconColor ? props.drawerIconColor : styleColors.header.backIconColor} />
                  </Pressable>
              </View>
              }

              {
                props.button
                &&
                <View style={{
                  zIndex:16,
                  minHeight:44,
                  minWidth:44,
                  alignItems:"center",
                  justifyContent:"center",
                  borderRadius:22,
                  position:"absolute",
                  right:10,
                  top:10,

                }}>
                    {props.button}
              </View>
              }

                {
                props.back
                &&
                  <Pressable style={{
                    padding:5,
                    height:44,
                    width:44,
                    top:10,
                    left:15,
                    position:"absolute",
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:12,
                    // backgroundColor:'red',
                    zIndex:22,
                    
                  }}
                  android_ripple={{ color: 'rgba(20, 20, 20, .1)' }}
                  onPress={()=>navigation.goBack()}
                  >
                    <Icon name="ios-arrow-back" size={28} color={styleColors.header.backIconColor} />
                  </Pressable>
                }
            

            {
              props.title 
              &&
              <View style={{
                
                // flex:1,
                zIndex:5,
                top:17,
                left:65,
                position:"absolute",
                // top:10,
                // bottom:10,
                // paddingLeft:11,
                // alignSelf:"center",
                justifyContent:"center",
                flexDirection:props.icon ? "row" : undefined,
                alignItems: !props.back ? "center" : "flex-start",
              }}>
                {
                  props.icon 
                  &&
                  props.icon

                }
                <Text style={[styles.title, {color:styleColors.color}]}>{props.title}</Text>
              </View>  

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