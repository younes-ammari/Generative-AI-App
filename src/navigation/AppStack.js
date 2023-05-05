import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import ProfileScreen from '../screens/ProfileScreen';

import Octicons from 'react-native-vector-icons/Octicons';

// import Home from '../screens/Home';

// import Chat from '../screens/Chat';

// import ImageGen from '../screens/ImageGen';

// import  Settings  from '../screens/Settings'
import {useColorScheme, Pressable } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack'
import { Home, Chat, ImageGen, Settings, AIVoiceGen, Pay, About, Content, History, Mode, NewInfo, Rec, Video, Voice, Account, Coins, WebViewer } from '../screens/Index';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { Easing } from 'react-native-reanimated';
import AppContext from '../hooks/useContext';
import CustomDrawer from '../components/CustomDrawer';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';






const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


const DrawerNav=({route, navigation})=>{
  
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
  } = useContext(AppContext)

  const deviceMode = useColorScheme()
  const mode = displayMode=="auto" ? deviceMode : displayMode
    
  // const styleColors = Colors[displayMode=="auto" ? deviceMode : displayMode]
  
  

  
  // const {appDatas, ...otherparams} = route.params
  // console.log(appDatas)

  return(
    <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={({ route, navigation }) => ({
          overlayColor:"rgba(0, 0, 0, .6)",
          drawerContentStyle:{
            // backgroundColor:styleColors.placeholder,
            // borderRadius:19,
            // backgroundColor:"red"
          },
          headerShown: false,
          drawerActiveBackgroundColor: Colors.primary,
          drawerActiveTintColor: '#fff',
          // drawerInactiveTintColor: '#333',
          // drawerInactiveTintColor: styleColors.placeholderTextColor,
          drawerInactiveTintColor: styleColors.color,
          drawerItemStyle:{
            padding:0,
            // backgroundColor:'red',
            // justifyContent:"flex-start",
            // flexDirection:'row',
            // alignItems:"flex-start",
            // margin:0,
            borderRadius:9,
          },
          drawerLabelStyle: {
            marginLeft: -20,
            // fontFamily: 'Roboto-Medium',
            fontSize: 16,
            paddingVertical:4,
          },
          drawerPosition:'left',
          drawerContentOptions:{
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            itemStyle: { alignItems:'flex-end' },
          },

          headerLeft: props => 
            <Pressable onPress={navigation.toggleDrawer} style={{

              padding:15,
              // paddingLeft:10,
            }}>
              <Ionicons name={"menu"} size={29} color={styleColors.color}/>
            </Pressable>,
          headerStyle:{
            // paddingTop:1,
            // marginTop:1,
            backgroundColor:"rgba(0, 0, 0, 0)"
          },
          headerTransparent:true,
          headerTitle:'',
          drawerIcon:({focused, size})=>
              <Ionicons name={"menu"} size={20} color={'red'} />
        
          // drawerIcon:
        })}
      >
        <Drawer.Screen name="Home" component={Home}
        initialParams={appData} 
        options={{
          // headerShown:false,
          drawerIcon:({focused, size, color})=>
              <Ionicons name={"home"} size={20} color={color} />
        }}
        />

        <Drawer.Screen name="History" component={History}
        initialParams={appData} 
        options={{
          // headerShown:false,
          drawerIcon:({focused, size, color})=>
              <Octicons name={"history"} size={20} color={color} />
        }}
        />

        <Drawer.Screen name="Coins" component={Coins} 
        options={({ route, navigation }) => ({
          // headerShown:false,
          drawerIcon:({focused, size, color})=>
              <FontAwesome5 name={"coins"} size={20} color={color} />,
          
          headerTransparent:true,
          headerTitle:'',
          headerLeft: props => 
          <Pressable onPress={navigation.toggleDrawer} style={{

            padding:15,
            // paddingLeft:10,
          }}>
            <Ionicons name={"menu"} size={29} color={Colors.lighter}/>
          </Pressable>,
        })}
        />

        <Drawer.Screen name="Account" component={Account} 
        options={{
          headerShown:false,
          drawerIcon:({focused, size, color})=>
              <Ionicons name={"person"} size={21} color={color} />
        }}
        />


        {/* <Drawer.Screen name="Settings" component={Settings} 
        options={{
          // headerShown:false,
          drawerIcon:({focused, size, color})=>
              <Ionicons name={"settings"} size={20} color={color} />
        }}
        /> */}
        

        <Drawer.Screen name="Darkmode" component={Mode} 
        options={{
          // headerShown:false,
          drawerIcon:({focused, size, color})=>
              <Ionicons name={"moon"} size={20} color={color} />
        }}
        />

        <Drawer.Screen name="About us" component={About} 
        options={{
          // headerShown:false,
          drawerIcon:({focused, size, color})=>
              <Ionicons name={"information-circle"} size={22} color={color} />
        }}
        />
      </Drawer.Navigator>
  )
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const configClose = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};




export default function AppStack() {
  return (
      <Stack.Navigator 
    initialRouteName="AuthStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        // statusBarHidden:true,
        headerShown:false,

        headerTintColor: '#fff',
        headerTitleStyle: {
          // fontWeight: 'bold',
        },
        
        transitionConfig: () => ({
          transitionSpec: {
            duration: 1400,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
          },
          screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;
  
            const height = layout.initHeight;
            const translateY = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [height, 0, -height],
            });
  
            const opacity = position.interpolate({
              inputRange: [index - 1, index - 0.99, index],
              outputRange: [0, 1, 1],
            });
  
            return { opacity, transform: [{ translateY }] };
          },
        }),
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      
      <Stack.Screen name="TabNav" component={DrawerNav} />
      <Stack.Screen name="Pay" component={Pay} />

      <Stack.Screen name="WebViewer" component={WebViewer} initialParams={{url:"google.com"}} />


      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="Mode" component={Mode} />
      <Stack.Screen name="Voice" component={Voice} />

      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="NewInfo" component={NewInfo} />

      <Stack.Screen name="AIVoiceGen" component={AIVoiceGen} />


      <Stack.Screen name="About" component={About} />

      <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="ImageGen" component={ImageGen}/>
    </Stack.Navigator>
      
  )
}


// export default AppStack;
