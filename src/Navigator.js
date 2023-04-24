import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import {About, AIVoiceGen, AuthScreen, Chat, Home, ImageGen, Login, Mode, Pay, PlayerScreen, Rec, Score, Settings, Voice} from './screens/Index'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from './constants/Colors';
import { Easing } from 'react-native-reanimated';
import AppContext from './hooks/useContext';
import Player from './screens/Player';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNav=({route, navigation})=>{
  
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
  } = useContext(AppContext)

  const deviceMode = useColorScheme()
    
  // const styleColors = Colors[displayMode=="auto" ? deviceMode : displayMode]
  
  

  
  // const {appDatas, ...otherparams} = route.params
  // console.log(appDatas)

  return(
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            // backgroundColor: Colors.primary,
          },
          // tabBarBackground:'red',
          // statusBarHidden:true,
          tabBarStyle:{
            backgroundColor:styleColors.tabBar.backgroundColor,
            backgroundColor:styleColors.primary,
            // paddingTop:11,
            height:55,
            paddingBottom:1,
            // elevation:11,
            // position:"absolute",
            // marginHorizontal:15,
            // marginBottom:15,
            // borderRadius:16,
            paddingVertical:2,
            paddingBottom:9,
            // height:55,
          },
          headerShown:false,
  
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   // fontWeight: 'bold',
          // },
        
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
              // route.name= 'll'
                ? 'home'
                : 'home-outline';
            } 
            if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            if (route.name === 'Pay') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            }

            // You can return any component that you like here!
            return route.name !== "Score" ?
            <Ionicons name={iconName} size={focused ? 24 : 20} color={!focused ? "rgba(200, 200, 200, .7)" : '#FFF'} />
            :
            <Entypo name={"credit"} size={focused ? 24 : 20} color={!focused ? "rgba(200, 200, 200, .7)" : '#FFF'} />;
            
          },
          tabBarActiveTintColor: styleColors.tabBar.ActiveTintColor,
          tabBarActiveTintColor: styleColors.lighter,
          // tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home}
        initialParams={appData} 
        options={{
          headerShown:false,
          
        }}
        />
        <Tab.Screen name="Score" component={Score} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
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

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
    initialRouteName="AuthScreen"
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
      
      <Stack.Screen name="Pay" component={Pay} />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Mode" component={Mode} />
      <Stack.Screen name="Voice" component={Voice} />

      <Stack.Screen name="AIVoiceGen" component={AIVoiceGen} />
      <Stack.Screen name="Player" component={Player} />


      <Stack.Screen name="Rec" component={Rec} />
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="About" component={About} />
        <Tab.Screen name="Chat" component={Chat} options={{
          transitionSpec: {
            open: config,
            close: configClose,
          },
          
        }}/>
        <Tab.Screen name="ImageGen" component={ImageGen} options={{
          transitionSpec: {
            open: config,
            close: configClose,
          },
          
        }}/>
    </Stack.Navigator>
      
    </NavigationContainer>
  )
}

