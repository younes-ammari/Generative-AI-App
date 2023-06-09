// import dependencies
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';


// import react-native-community
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';


// import auth screens
import Login from '../screens/authentication/Login';
import ResetPassword from '../screens/authentication/ResetPassword';
import Register from '../screens/authentication/Register';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import ResetCode from '../screens/authentication/ResetCode';



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
