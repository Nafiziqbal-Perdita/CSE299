import React, { useState, useContext, useEffect } from "react";
import { auth } from "../FireComp.jsx";
import {
  createUserWithEmailAndPassword,
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
  

  //functions
  //Registration a user using email and password
  const registerWithMailPass = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const user = userCredential.user;
      // console.log(user);
      const userId = user.uid;

      setCurUid(userId);
    } catch (error) {
      console.log(error);
    }
  };

  // login user using mail and password

  const signInwithMailPass = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );

      const user = userCredential.user;
      setCurUid(user.uid);
  
      console.log("Login Method Succeed");
    } catch (error) {
      console.log("Login Method failed");
      console.log(error);
    }
  };

  //signOut user
  const signOut = async () => {
    try {
      await auth.signOut();
      
      console.log("Log Out Cmplete");

      setNavigate(false);
    } catch (error) {
      console.log(error);
    }
  };


  

  




  const value = {
    registerWithMailPass,
    signInwithMailPass,
    signOut,
    email,
    setEmail,
    pass,
    setPass,
  
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
