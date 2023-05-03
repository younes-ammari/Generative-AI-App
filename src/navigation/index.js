// import dependencies
import React from 'react';
// import AuthProvider Context and Routes
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import {NavigationContainer} from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import { AppContextProvider } from '../hooks/useContext';

const Providers = () => {
  return (
    <AppContextProvider>
        <ToastProvider>
          <NavigationContainer>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </NavigationContainer>
        </ToastProvider>
    </AppContextProvider>      
  );
}

export default Providers;