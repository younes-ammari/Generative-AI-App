import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {AuthScreen, Chat, Home, ImageGen, Login, Mode, Pay, Settings} from './screens/Index'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './constants/Colors';
import { Easing } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


const StackNav=({navigation})=>{
  return(

    <Stack.Navigator 
    initialRouteName="HomeScreen"
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
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ImageGen" component={ImageGen} />
    </Stack.Navigator>
    )
}

const TabNav=({route, navigation})=>{
  
  const {appData, ...otherparams} = route.params
  // console.log(appData)

  return(
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          // statusBarHidden:true,
          headerShown:false,
  
          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontWeight: 'bold',
          },
        
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
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home}
        initialParams={appData} 
        options={{
          headerShown:false,
          
        }}
        />
        <Tab.Screen name="Pay" component={Pay} />
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
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="Mode" component={Mode} />
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

const styles = StyleSheet.create({})