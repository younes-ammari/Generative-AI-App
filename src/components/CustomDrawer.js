import React, { useContext } from 'react';
import {
  View,
  Text,
  Share,
  ImageBackground,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../hooks/useContext';
import Colors from '../constants/Colors';

const CustomDrawer = props => {

  const navigation = useNavigation()

  
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setVisibleLogout,
  } = useContext(AppContext)


  const deviceMode = useColorScheme()


  const mode = displayMode=="auto" ? deviceMode : displayMode

  const bkg = styleColors.placeholder

  const onShare = async () => {
    const shareOptions = {
      // content: {
        title: 'Install our App',
        message: 'We use the latest AI available tools install our app now \n https://play.google.com/store/apps/details?id=AzoBot'
      // }
      ,
      // options:{
        url: 'https://play.google.com/store/apps/details?id=AzoBot',
        social:"SMS",
        // social: Share.Social.WHATSAPP,
        // whatsAppNumber: "9199999999",  // country code + phone number
        // filename: 'test' , // only for base64 file in Android
    // }
  };
    try {
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        console.log("type", result)
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("type", result.activityType)
        } else {
          // shared
          console.log("shared", result)
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };


  return (
    <View style={{flex: 1, backgroundColor: bkg}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: bkg}}>
          <View
          // resizeMode=""
          // source={require('../images/drawerBackground.jpg')}
           style={{
            //  width:"100%",
            marginHorizontal:9,
            marginTop:11,
            // opacity:.5,
            // flex:1,
            
            // backgroundColor:'red',
             paddingHorizontal:15,
             // justifyContent:"center",
            //  alignItems:"center",
             flexDirection:'row',
            //  paddingVertical:22,
            //  paddingTop:33,
             padding:33,
          }}>
            {/* <MaterialCommunityIcons name='robot-outline'size={66} color={mode=="dark"  ? Colors.lighter : Colors.primary}  />
            <Text style={{
              // marginTop:22,
              color:styleColors.color,
              fontSize:25,
              fontWeight:"500",
            }}>IceBot</Text> */}


              <View style={{
                width:"113%",
                position:"absolute",
                height:70,
                height:111,
                backgroundColor:`rgba(${Colors.rgb.primary}, .9)`,
                borderRadius:16,
                overflow:"hidden",

              }}>
                
              <Image 
                source={require("../images/drawerBackground.jpg")}
                resizeMode='cover'
                style={{
                  opacity:.5,
                  width:'100%',
                  height:111,
                  // height:70,
                  // paddingBottom:85,
                  // flex:1,
                  position:"absolute",


                }}
                />
                
              </View>
            


                <View 
                  style={{
                    height:55,
                    width:55,
                    marginEnd:9,
                    borderRadius:55,
                    backgroundColor:styleColors.placeholderTextColor,
                    borderWidth:1,
                    borderColor:Colors.lighter,
                    alignItems:"center",
                    justifyContent:"center",
                    bottom:-5,
                  }}
                >
                  <Ionicons name={"person"}  size={26} color={Colors.lighter}/>
                </View>
            
            
            <View style={{
                    bottom:-13,
                    // paddingVertical:15,

            }}>
              
              <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginBottom: 1,
              }}>
                {appData.user.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    // color: '#fff',
                    color:Colors.lighter,
                    // opacity:.8,
                    fontFamily: 'Roboto-Regular',
                    marginRight: 5,
                  }}>
                  120 Coins
                </Text>
                <FontAwesome5 name="coins" size={14} color={Colors.yellow} />
              </View>
          
          </View>

          </View>
        
        <View style={{flex: 1, backgroundColor: bkg, paddingTop: 1}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={onShare} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-sharp" size={21} color={styleColors.color}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 9,
                fontWeight:"600",
                color:styleColors.color
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setVisibleLogout(true)}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="logout" size={21} color={Colors.red}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 9,
                fontWeight:"600",
                // color:styleColors.color
                color:Colors.red
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;