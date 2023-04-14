/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "react-native-url-polyfill/auto"
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  PermissionsAndroid,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigator from './src/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToastProvider } from 'react-native-toast-notifications'
import { AppContextProvider } from "./src/hooks/useContext";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'WRITE_EXTERNAL_STORAGE Permission',
        message:
          'WRITE_EXTERNAL_STORAGE App needs access to your EXTERNAL_STORAGE ' +
          'so you can save awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

function App(): JSX.Element {

  return (
    <AppContextProvider>      
      <SafeAreaProvider>
        <ToastProvider>
          <Navigator/>
        </ToastProvider>
      </SafeAreaProvider>
    </AppContextProvider>
  );
}

export default App;
