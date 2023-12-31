import React, { useState, useContext, useEffect } from "react";
import { auth } from "../FireComp.jsx";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  //states

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userid, setUserid] = useState("null");
  const [error,setError]=useState('');

  //getting the current logged in person user id

  const getCurrentUser = async () => {
    const person = await auth.onAuthStateChanged((user) => {
      if (user) {
        setUserid(user.uid);
      }
    });
  };

  //functions
  //Registration a user using email and password
  const registerWithMailPass = async () => {

    if (email===""){
      setError('Please put a valid Email');
      return;
    }
    if (pass===""){
      setError('Insert atleast six digit password');
      return;
    }


    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const user = userCredential.user;
      // console.log(user);
      // const userId = user.uid;
    } catch (error) {
      console.log(error);
    }
  };

  // login user using mail and password

  const signInwithMailPass = async () => {

    if (email===""){
      setError('Please put a valid Email');
      return;
    }
    if (pass===""){
      setError('Insert a valid Password');
      return;
    }


    // console.log(email);
    // console.log(pass);


    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const user = userCredential.user;
      // setCurUid(user.uid);
      console.log("Login Method Succeeded");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        console.log("User not found. Please register first.");
      } else {
        console.log("Login Method Failed");
        console.error(error);
      }
    }
  };

  //signOut user
  const signOut = async () => {
    try {
      await auth.signOut();
      setUserid("null");
      console.log("Log Out Cmplete");
    } catch (error) {
      console.log(error);
    }
  };


  //make a random number every time 

  const generateRandomNumber = () => {

    const min = 100000; // Minimum six-digit number (100000)
    const max = 999999; // Maximum six-digit number (999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;


  }

  const forgetPassword = async () => {
    if (email===""){
      setError('Please insert your Email');
      return;
    }
  


    try {
      
      await sendPasswordResetEmail(auth, email);
    
      console.log("Reset email send");
    } catch (error) {
      console.log(error);
    
    }
  };

  const value = {
    getCurrentUser,
    registerWithMailPass,
    signInwithMailPass,
    signOut,
    generateRandomNumber,
    email,
    setEmail,
    pass,
    setPass,
    userid,
    setUserid,
    forgetPassword,
    error,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
