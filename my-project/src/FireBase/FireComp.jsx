// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACapE9cA0WLmFIKDLzZLfCa29u8GPhnPQ",
  authDomain: "cse299-223c3.firebaseapp.com",
  projectId: "cse299-223c3",
  storageBucket: "cse299-223c3.appspot.com",
  messagingSenderId: "121600296711",
  appId: "1:121600296711:web:d09ca700bfdd458c6f67a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth(app);



