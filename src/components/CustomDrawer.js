import React, { useContext } from 'react';
import {
  View,
  Text,
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
  } = useContext(AppContext)


  const deviceMode = useColorScheme()


  const mode = displayMode=="auto" ? deviceMode : displayMode


  return (
    <View style={{flex: 1, backgroundColor: styleColors.backgroundColor}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: styleColors.backgroundColor}}>
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
             alignItems:"center",
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
                    backgroundColor:Colors.yellow,
                  }}
                />
            <View>
              
              <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginBottom: 5,
              }}>
                {appData.user.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Roboto-Regular',
                    marginRight: 5,
                  }}>
                  120 Coins
                </Text>
                <FontAwesome5 name="coins" size={14} color="#fff" />
              </View>
          
          </View>

          </View>
        
        <View style={{flex: 1, backgroundColor: styleColors.backgroundColor, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} color={styleColors.color}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color:styleColors.color
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Login')}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={Colors.red}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
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