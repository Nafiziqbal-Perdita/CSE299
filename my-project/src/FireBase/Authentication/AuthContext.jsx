import React, { useState, useContext, useEffect } from "react";
import { auth } from "../FireComp.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Navigate } from "react-router-dom";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  //states
  const [navigate,setNavigate]=useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [curUid, setCurUid] = useState("");//checking the current user id for future safety

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
      setNavigate(true);
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

  // useEffect(() => {
  //   console.log("CurId:" + curUid);

  //   setNavigate(true);


  // }, [curUid]);


  




  const value = {
    registerWithMailPass,
    signInwithMailPass,
    signOut,
    email,
    setEmail,
    pass,
    setPass,
    navigate
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
