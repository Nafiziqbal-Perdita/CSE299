import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { auth } from "../FireBase/FireComp";
import { useEffect, useState } from "react";
const Home = () => {
  const [go, setGo] = useState(false);
  const { signOut } = useAuth();

  const checked = async () => {
    await signOut();
    const user = auth.currentUser;
    console.log(user);
    if (!user) {
      setGo(true);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
    if (!user) {
      setGo(true);
    }
  });

  console.log(go);

  if (go) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      THis is home
      <br />
      <Link to="/Login">Login</Link>
      <br />
      <Link to="/SignUp">SignUp</Link>
      <br />
      <button onClick={checked}>SignOut</button>
    </>
  );
};

export default Home;
