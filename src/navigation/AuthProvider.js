// import dependencies
import React, {createContext, useState} from 'react';

// import Firbase auth dependencies
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { useNavigation } from '@react-navigation/native';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);


  const navigation = useNavigation()

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            if (email==''||password==''){
              alert("Filling all fields are required ...")
              return 
            }
            await auth().signInWithEmailAndPassword(email, password) 
            .then(res=>{
              console.info(res);
              navigation.navigate("TabNav")
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

    /**
   * Getting users ID token
   */
            const { idToken } = await GoogleSignin.signIn();
    /**
   * Create Google credential with the token
   */
     
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    /**
   * Sign-in the user with the credential
   */
            await auth().signInWithCredential(googleCredential)
        
            .catch(error => {
												alert(error)

                console.log('Something went wrong with googleCredential login : ', error);
            });
          } catch(error) {
			  alert(error)
            console.log({error});
          }
        },
        googleSignUp: async () => {
          try {
    /**
   * Getting the users ID token
   */
            const { idToken } = await GoogleSignin.signIn();
    /**
   * Create  Google credential with the token
   */
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    /**
   * Sign-in the user with the credential
   */
            await auth().signInWithCredential(googleCredential)
           
            .catch(error => {
				alert(error)
                console.log('Something went wrong with googleCredential sign up: ', error);
            });
          } catch(error) {
			  alert(error)
            console.log({error});
          }
        },



  //       fbLogin: async () => {
  //         try {
  //   /**
  //  * Attempt login with permissions
  //  */
  //           const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  //           if (result.isCancelled) {
				
  //             throw 'User cancelled the login process';
  //           }
  //   /**
  //  * Once signed in, get the users AccesToken
  //  */
  //           const data = await AccessToken.getCurrentAccessToken();

  //           if (!data) {
  //             throw 'Something went wrong obtaining access token';
  //           }
  //   /**
  //  * Create Firebase credential with the AccessToken
  //  */
  //           const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  //   /**
  //  * Sign-in the user with the credential
  //  */
  //           await auth().signInWithCredential(facebookCredential)
 
  //           .catch(error => {
	// 			alert(error)
  //               console.log('Something went wrong with facebookCredential sign up: ', error);
  //           });
  //         } catch(error) {
	// 		  alert(error)
  //           console.log({error});
  //         }
  //       },

        fbLogin: async () => {
          try {
            const result = await LoginManager.logInWithPermissions(['email']);
        
            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }
        
            const data = await AccessToken.getCurrentAccessToken();
        
            if (!data) {
              throw 'Something went wrong obtaining access token';
            }
        
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        
            await auth().signInWithCredential(facebookCredential)
              .catch(error => {
                console.log('Something went wrong with Facebook sign in: ', error);
              });
          } catch (error) {
            console.log({error});
          }
        },
        

  //       fbSignUp: async () => {
  //         try {
  //   /**
  //  * Attempt login with permissions
  //  */
  //           const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  //           if (result.isCancelled) {
  //             throw 'User cancelled the login process';
  //           }
  //   /**
  //  * Once signed in, get the users AccesToken
  //  */
  //           const data = await AccessToken.getCurrentAccessToken();

  //           if (!data) {
  //             throw 'Something went wrong obtaining access token';
  //           }
  //   /**
  //  * Create a Firebase credential with the AccessToken
  //  */
  //           const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  //   /**
  //  * Sign-in the user with the credential
  //  */
  //           await auth().signInWithCredential(facebookCredential)

  //           .catch(error => {
	// 			alert(error)
  //               console.log('Something went wrong with sign up facebookCredential: ', error);
  //           });
  //         } catch(error) {
	// 		  alert(error)
  //           console.log({error});
  //         }
  //       },

  fbSignUp: async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['email']);
  
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
  
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
  
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
      await auth().signInWithCredential(facebookCredential);
    } catch(error) {
      alert(error);
      console.log({error});
    }
  },
  

sendPasswordResetEmail:async(email,navigation)=>{
	try {
    if (email==''){
      alert("Filling all fields are required ...")
      return 
    }
		await auth().sendPasswordResetEmail(email)
		.then(() => {
			alert(	'Please check your email...')
			
			navigation.navigate('Login')
		}).catch(function (e) {
								alert(e)
      })

	} catch(error) {
			alert(error)
          }
},

        register: async (email, password,ConfirmPassword) => {
          try {
            if (email==''||password==''||ConfirmPassword==''){
              alert("Filling all fields are required ...")
              return 
            }
            if (password!==ConfirmPassword){
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

              navigation.navigate("TabNav")




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
