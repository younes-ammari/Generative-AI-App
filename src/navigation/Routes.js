
// import dependencies
import React, {useContext, useState, useEffect} from 'react';

// import NavigationContainer, Firebase auth and AuthContext
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

// import AuthStack and AppStack
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AppContext from '../hooks/useContext';
import { AuthScreen } from '../screens/Index';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const {
    storageLoading,
    loadAppDataHandler,
  } = useContext(AppContext)
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    console.log("user", user)
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    loadAppDataHandler()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (storageLoading) return <AuthScreen/>

  return user ? <AppStack /> : <AuthStack />
  // return <AppStack />
};

export default Routes;
