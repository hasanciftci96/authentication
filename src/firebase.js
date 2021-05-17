
import firebase from "firebase/app"
import "firebase/auth"
//how to hide your api keys from public
    //create an .env file and store your keys there
    //names should start with REACT_APP_...
    //To see if you did it correct npm start and check dev tools > console to see if you receive an api key error
    //type .env inside .gitignore so the .env file wont be committed

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth() //this is a function being imported from "firebase/auth" module npm installed
export default app