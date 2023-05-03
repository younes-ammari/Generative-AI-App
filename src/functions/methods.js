import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword 
} from "firebase/auth";
import app from "../config/firebaseConfig";

export const auth = getAuth(app);



export const SignUp=(
    email,  
    password,
    displayName
)=>{
    
    createUserWithEmailAndPassword(auth, email, password, displayName)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Successfully Signed Up")
    // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("SignUp message", errorMessage)

        // ..
    });
}


export const SignIn=(
    email, 
    password
)=>{
    

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Successfully Signed In")
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("SignIn message", errorMessage)
    });
}

