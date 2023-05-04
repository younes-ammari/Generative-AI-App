// import dependencies
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import Screens
// import SignupScreen from '../screens/SignupScreen';
// import LoginScreen from '../screens/LoginScreen';
// import ResetPasswordScreen from '../screens/ResetPasswordScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';

// import react-native-community
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';

// import colors
// import Colors from '../theme/colors';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';
import Register from '../screens/Register';
import Colors from '../constants/Colors';
import ForgotPassword from '../screens/ForgotPassword';
import ResetCode from '../screens/ResetCode';


// const webClientId= '657963629746-rnj8nm5e3fjnrb4rq3d0n5a2nq5mr9hb.apps.googleusercontent.com'
const webClientId= '657963629746-rnj8nm5e3fjnrb4rq3d0n5a2nq5mr9hb.apps.googleusercontent.com'



const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
    /**
   * No need to wait for `setItem` to finish, although you might want to handle errors.
   */
        AsyncStorage.setItem('alreadyLaunched', 'true'); 
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }

    /**
   * Add some errors handling, also you can simply do setIsFirstLaunch(null).
   */

    });
  
    GoogleSignin.configure({
      webClientId: webClientId,
    });
  
  }, []);



  return (
    <Stack.Navigator initialRouteName={routeName} screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="WelcomeScreen"
        component={Login}
        // options={{headerShown:false,header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={Login}/>

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}/>
	  
      <Stack.Screen
        name="ResetCode"
        component={ResetCode}/>
	  
	  <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}/>
	  
      <Stack.Screen
        name="Signup"
        component={Register}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
