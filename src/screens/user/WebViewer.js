import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview';
import ScreenWrapper from '../../ScreenWrapper';

export default function WebViewer({route, navigation}) {

    const {url, ...otherparams} = route.params
    // const {appDatas, ...otherparams} = route.params
    
  const [nav, setNav] = useState({})
  const webRef = useRef()


  const handleWebViewNavigation = navState => {
    const { url } = navState;
    setNav(navState)
    console.log('url', url, String(url).includes("app"))
    console.log('nav', nav.title)
    
    if (String(url).includes("app")) {
      
      Linking.openURL(url);
      return false;
    }
  
    return true;
  };

  return (
    <ScreenWrapper 
      fill 
      back 
      title={nav.title && String(nav.title).length<33 ? String(nav.title).slice(0, 22) : "loading..."}
      button={
        <View>
          <TouchableOpacity 
                onPress={()=>webRef.current.goBack()} 
                style={styles.backButton} 
                >
                <Text style={styles.title}>Back</Text>
            </TouchableOpacity>

        </View>
      }
      >
        <WebView
            style={styles.webView}
            ref={webRef}
            source={{ uri: url }}
            allowsLinkPreview
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.log('error', nativeEvent)
              // console.warn('WebView error: ', nativeEvent);
            }}
            // scrollEnabled
            // scalesPageToFit
            onHttpError={(error)=>console.log("onHttpError", error)}        
            onNavigationStateChange={(rout)=>handleWebViewNavigation(rout)}
            />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  webView:{
    flex:1,
    backgroundColor:null,
    marginBottom:22,
  },
  backButton:{
    padding:9, 
    borderRadius:4, 
    paddingHorizontal:11,
    // backgroundColor:'red',
    justifyContent:"center", 
    alignItems:"center",
  },
  title:{
    fontSize:16
  }
})