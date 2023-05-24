import React, { useContext } from 'react';
import {
  View,
  Text,
  Share,
  ImageBackground,
  Image,
  TouchableOpacity,
  useColorScheme,
  StyleSheet
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../hooks/useContext';
import Colors from '../../constants/theme/Colors';
import Layout from '../../constants/theme/Layout';



const CustomDrawer = props => {

  const navigation = useNavigation()

  
  const {
    displayMode, 
    styleColors,
    appData,
    setVisibleLogout,
  } = useContext(AppContext)


    // Get Device Display Mode
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
    <View style={{flex: 1, backgroundColor: bkg, paddingTop:0}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: bkg, paddingTop:0}}>
          <View
           style={{
            backgroundColor:styleColors.androidRippleColor,
            paddingHorizontal:15,
            paddingVertical:22,
            // marginBottom:11,
            backgroundColor:Colors.primary
          }}>


                <View 
                  style={[styles.profileContainer,{
                    backgroundColor:styleColors.placeholderTextColor,
                  }]}
                >
                  <Image
                  source={{uri:appData.user.photoURL ? appData.user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6CtBpkapybS4LjkdLC1SZnUpApzu439CAq_CYrLQLHwhW2CG3MwpblZvTreUfOhxKroQ&usqp=CAU"}}
                  style={styles.profileImage}
                  />
                  {/* <Ionicons name={"person"}  size={26} color={Colors.lighter}/> */}
                </View>
            
            {/* username & coins */}
            <View>
              
              <Text
              style={[styles.userName,{
                color:styleColors.color,
                color:Colors.lighter,
              }]}>
                {appData.user.displayName}
              </Text>
              <View style={styles.coinsContainer}>
                <Text
                  style={[styles.userCoins,{
                    color:styleColors.color,
                    color:Colors.lighter,
                  }]}>
                  {appData.user.coins} Coins
                </Text>
                <FontAwesome5 name="coins" size={15} color={Colors.yellow} />
              </View>
          
            </View>
          </View>

          


          <View style={{
            width:"100%",
            backgroundColor:bkg,
            // backgroundColor:'red',
            height:19,
            top:-11,
            bottom:1,
            margin:0,
            // position:"absolute",
            zIndex:11,
            borderRadius:22,
          }}/>

          {/* </View> */}
        
        <View style={[styles.drawerItemsContainer, {backgroundColor: bkg}]}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={onShare} style={{paddingVertical: 15}}>
          <View style={styles.shareConatiner}>
            <Ionicons name="share-social-sharp" size={21} color={styleColors.color}/>
            <Text
              style={[styles.shareTitle, {color:styleColors.color}]}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setVisibleLogout(true)}} style={{paddingVertical: 15}}>
          <View style={styles.signoutContainer}>
            <MaterialIcons name="logout" size={21} color={Colors.red}/>
            <Text
              style={styles.signoutTitle}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage:{
    // flex:1,
    height:55,
    width:55,
  },
  profileContainer:{
    height:55,
    width:55,
    borderRadius:55,
    overflow:"hidden",
    alignItems:"center",
    justifyContent:"center",
    marginBottom:5
  },
  coinsContainer:{
    flexDirection: 'row',
    alignItems:"center",
  },
  userName:{
    color: '#fff',
    fontSize: 18,
    marginBottom: 1
  },
  
  userCoins:{
    color: '#fff',
    fontSize: Layout.font.h2,
    marginEnd:9,
    marginBottom: 1
  },
  
  drawerItemsContainer:{
    flex: 1, 
    paddingTop: 1,
  },
  // Share Tell a friend
  shareConatiner:{flexDirection: 'row', alignItems: 'center'},
  shareTitle:{
    fontSize: Layout.font.h2,
    fontFamily: 'Roboto-Medium',
    marginLeft: 9,
    fontWeight:"600",
    
  },

  // Sign out
  signoutContainer:{flexDirection: 'row', alignItems: 'center'},
  signoutTitle:{
    fontSize: Layout.font.h2,
    fontFamily: 'Roboto-Medium',
    marginLeft: 9,
    fontWeight:"600",
    color:Colors.red
  }


})

export default CustomDrawer;