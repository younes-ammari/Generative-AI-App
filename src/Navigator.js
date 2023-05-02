import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import {About, Account, AIVoiceGen, AuthScreen, Chat, History, Home, ImageGen, Login, Mode, NewInfo, Pay, PlayerScreen, Rec, Register, Coins, Settings, Voice, ForgotPassword, ResetCode, ResetPassword, Content, Video} from './screens/Index'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from './constants/Colors';
import { Easing } from 'react-native-reanimated';
import AppContext from './hooks/useContext';
import Player from './screens/Player';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';



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
            return route.name !== "Coins" ?
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
        <Tab.Screen name="Coins" component={Coins} />
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
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetCode" component={ResetCode} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Register" component={Register} />
      
      <Stack.Screen name="Pay" component={Pay} />
      <Stack.Screen name="TabNav" component={DrawerNav} />


      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="Mode" component={Mode} />
      <Stack.Screen name="Voice" component={Voice} />

      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="NewInfo" component={NewInfo} />

      <Stack.Screen name="AIVoiceGen" component={AIVoiceGen} />
      <Stack.Screen name="Player" component={Player} />


      <Stack.Screen name="Rec" component={Rec} />
      {/* <Stack.Screen name="TabNav" component={TabNav} /> */}
      <Stack.Screen name="About" component={About} />

      <Stack.Screen name="Chat" component={Chat} options={{
          transitionSpec: {
            open: config,
            close: configClose,
          },
          
        }}/>
        <Stack.Screen name="ImageGen" component={ImageGen} options={{
          transitionSpec: {
            open: config,
            close: configClose,
          },
          
        }}/>
    </Stack.Navigator>
      
    </NavigationContainer>
  )
}

