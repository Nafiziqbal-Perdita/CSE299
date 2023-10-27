import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { auth } from "../FireBase/FireComp";
import { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import LogIn from "./Login";
import { onAuthStateChanged } from "firebase/auth";
const Home = () => {
  const [go, setGo] = useState(false);

  //checking the user is signed in or not if signed it then remain in Home directory or it will navigate to login directory
  // Create an observer to check the user's authentication state
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      // You can access user information using user (e.g., user.uid, user.displayName).
      console.log("User is logged in:", user);
      setGo(true);
    } else {
      // User is signed out.
      console.log("User is logged out");
      setGo(false);
    }
  });

  useEffect(() => {
    // To stop observing the authentication state (e.g., when the component unmounts)
    // Call this function to unsubscribe from the observer.
    unsubscribe();
  }, []);

  if (go) {
    return (
      <>
        <Wrapper />
      </>
    );
  } else {
    return (
      <>
        <LogIn />
      </>
    );
  }
};

export default Home;
