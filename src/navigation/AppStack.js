import React, { useContext } from 'react';

import { useColorScheme, Pressable } from 'react-native'

// import screens
import { Home, Chat, ImageGen, Pay, About, Content, Mode, NewInfo, Video, Account, Coins, WebViewer, VoiceGen } from '../screens/Index';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Easing } from 'react-native-reanimated';
import AppContext from '../hooks/useContext';
import CustomDrawer from '../components/navigation/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../constants/theme/Colors';






const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();



const DrawerNav = ({ route, navigation }) => {

  const {
    displayMode,
    setMode,
    styleColors,
    appData,
  } = useContext(AppContext)

  // Get Device Display Mode
  const deviceMode = useColorScheme()
  const mode = displayMode == "auto" ? deviceMode : displayMode


  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({ route, navigation }) => ({
        overlayColor: "rgba(0, 0, 0, .6)",
        drawerContentStyle: {
        },
        headerShown: false,
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: styleColors.color,
        drawerItemStyle: {
          padding: 0,
          borderRadius: 9,
        },
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
          paddingVertical: 4,
        },
        drawerPosition: 'left',
        drawerContentOptions: {
          activeTintColor: 'white',
          inactiveTintColor: 'white',
          itemStyle: { alignItems: 'flex-end' },
        },

        headerLeft: props =>
          <Pressable onPress={navigation.toggleDrawer} style={{

            padding: 15,
            // paddingLeft:10,
          }}>
            <Ionicons name={"menu"} size={29} color={styleColors.color} />
          </Pressable>,
        headerStyle: {
          backgroundColor: "rgba(0, 0, 0, 0)"
        },
        headerTransparent: true,
        headerTitle: '',
        drawerIcon: ({ focused, size }) =>
          <Ionicons name={"menu"} size={20} color={'red'} />

      })}
    >
      <Drawer.Screen name="Home" component={Home}
        initialParams={appData}
        options={{
          drawerIcon: ({ focused, size, color }) =>
            <Ionicons name={"home"} size={20} color={color} />
        }}
      />

      <Drawer.Screen name="Coins" component={Coins}
        options={({ route, navigation }) => ({
          drawerIcon: ({ focused, size, color }) =>
            <FontAwesome5 name={"coins"} size={20} color={color} />,

          headerTransparent: true,
          headerTitle: '',
          headerLeft: props =>
            <Pressable onPress={navigation.toggleDrawer} style={{

              padding: 15,
            }}>
              <Ionicons name={"menu"} size={29} color={Colors.lighter} />
            </Pressable>,
        })}
      />

      <Drawer.Screen name="Account" component={Account}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size, color }) =>
            <Ionicons name={"person"} size={21} color={color} />
        }}
      />




      <Drawer.Screen name="Darkmode" component={Mode}
        options={{
          drawerIcon: ({ focused, size, color }) =>
            <Ionicons name={"moon"} size={20} color={color} />
        }}
      />

      <Drawer.Screen name="About us" component={About}
        options={{
          drawerIcon: ({ focused, size, color }) =>
            <Ionicons name={"information-circle"} size={22} color={color} />
        }}
      />
    </Drawer.Navigator>
  )
}




export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="DrawerNav"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        // statusBarHidden:true,
        headerShown: false,

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


      <Stack.Screen name="DrawerNav" component={DrawerNav} />
      <Stack.Screen name="Pay" component={Pay} />

      <Stack.Screen name="WebViewer" component={WebViewer} initialParams={{ url: "google.com" }} />


      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="Mode" component={Mode} />


      <Stack.Screen name="NewInfo" component={NewInfo} />

      <Stack.Screen name="VoiceGen" component={VoiceGen} />


      <Stack.Screen name="About" component={About} />

      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ImageGen" component={ImageGen} />
    </Stack.Navigator>

  )
}


