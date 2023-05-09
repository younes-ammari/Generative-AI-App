
// import dependencies
import React, {useContext, useState, useEffect} from 'react';

// import NavigationContainer, Firebase auth and AuthContext
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

// import AuthStack and AppStack
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    console.log("user", user)
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // return user ? <AppStack /> : <AuthStack />
  return user ? <AppStack /> : <AppStack />
};

export default Routes;
