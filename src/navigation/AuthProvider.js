// import dependencies
import React, { createContext, useContext, useState } from 'react';

// import Firbase auth dependencies
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';



import { useNavigation } from '@react-navigation/native';
import AppContext from '../hooks/useContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const {
    setAppData,
    appData,
  } = useContext(AppContext)



  const navigation = useNavigation()

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            if (email == '' || password == '') {
              alert("Filling all fields are required ...")
              return
            }
            await auth().signInWithEmailAndPassword(email, password)
              .then(res => {
                console.info(res);
                navigation.navigate("DrawerNav")
              })

              .catch(error => {
                alert(error)

                console.log('Something went wrong with Login: ', error);
              });
          } catch (e) {
            alert(e)
            console.log(e);
          }
        },
        googleLogin: async () => {
          try {
            console.info('try')

            /**
           * Getting users ID token
           */
            const { idToken } = await GoogleSignin.signIn();
            console.info('idToken', idToken)
            /**
           * Create Google credential with the token
           */

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            console.info('googleCredential', googleCredential)
            /**
           * Sign-in the user with the credential
           */
            await auth().signInWithCredential(googleCredential)

              .catch(error => {
                alert(error)

                console.log('Something went wrong with googleCredential login : ', error);
              });
          } catch (error) {
            console.info('catch')
            alert(error)
            console.log({ error });
          }
        },
        googleSignUp: async () => {
          try {
            console.log('try')
            /**
           * Getting the users ID token
           */
            const { idToken, user } = await GoogleSignin.signIn();
            // console.log('idToken', idToken)
            console.log('user', user)

            /**
           * Create  Google credential with the token
           */
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // console.log('googleCredential', googleCredential)
            /**
           * Sign-in the user with the credential
           */
            await auth().signInWithCredential(googleCredential)
              .then(() => {
                firestore().collection('users').doc(auth().currentUser.uid)
                  .set({
                    displayName: user.name,
                    email: user.email,
                    coins: 121,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    photoURL: user.photo,
                    uid: auth().currentUser.uid,
                  })

                  .then(res => {

                    setAppData({
                      ...appData, user: {
                        displayName: user.name,
                        email: user.email,
                        coins: 121,
                        photoURL: user.photo,
                        uid: user.id,
                      }
                    })
                    navigation.navigate("DrawerNav")
                    setTimeout(() => {
                      navigation.navigate('Home')
                    }, 10)
                  })

              })

              .catch(error => {
                alert(error)
                console.log('Something went wrong with googleCredential sign up: ', error);
              });
          } catch (error) {
            console.log('catch')
            alert(error)
            console.log({ error });
          }
        },

        sendPasswordResetEmail: async (email, navigation) => {
          try {
            if (email == '') {
              alert("Filling all fields are required ...")
              return
            }
            await auth().sendPasswordResetEmail(email)
              .then(() => {
                alert('Please check your email...')

                navigation.navigate('Login')
              }).catch(function (e) {
                alert(e)
              })

          } catch (error) {
            alert(error)
          }
        },

        register: async (email, password, ConfirmPassword) => {
          try {
            if (email == '' || password == '' || ConfirmPassword == '') {
              alert("Filling all fields are required ...")
              return
            }
            if (password !== ConfirmPassword) {
              alert("Passwords Not matched")
              return
            }
            await auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                /**
              * Once the user creation has happened successfully, we can add the currentUser into firestore
              * with the appropriate details.
              */

                firestore().collection('users').doc(auth().currentUser.uid)
                  .set({
                    fname: '',
                    lname: '',
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                  })

                navigation.navigate("DrawerNav")




                  /**
                 * ensure we catch any errors at this stage to advise us if something does go wrong
                 */
                  .catch(error => {
                    alert(error)
                    console.log('Something went wrong with added user to firestore: ', error);
                  })
              })
              /**
             * we need to catch the whole sign up process if it fails too.
             */
              .catch(error => {
                alert(error)
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (e) {
            alert(e)
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            navigation.navigate("WelcomeScreen")
            console.log('logout')
          } catch (e) {
            alert(e)
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
