// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9PNNvEe7MZWlpRnoFnTp4U14dHMDw0w8",
  authDomain: "cse299-e8b7c.firebaseapp.com",
  projectId: "cse299-e8b7c",
  storageBucket: "cse299-e8b7c.appspot.com",
  messagingSenderId: "84772072600",
  appId: "1:84772072600:web:00c05ee28ae26188b434ed"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth(app);
// const database=getDatabase(app);



