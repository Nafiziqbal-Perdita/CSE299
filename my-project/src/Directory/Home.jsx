import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { auth } from "../FireBase/FireComp";
import { useEffect, useState } from "react";
const Home = () => {
  const { signOut } = useAuth();
  const [go, setGo] = useState(false);
  const [userId, setUserId] = useState("");

  //checking the user is signed in or not if signed it then remain in Home directory or it will navigate to login directory

  const checked = async () => {
    await signOut();
    const user = auth.currentUser;

    console.log(user);
    if (!user) {
      setGo(true);
    } else {
      setUserId(user.uid);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;

    console.log(user);
    if (!user) {
      setGo(true);
    } else {
      setUserId(user.uid);
    }
  });

  console.log(go);

  if (go) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen ">
        <div className="text-2xl font-extrabold">This is Home</div>

        <div className="m-2 p-2 bg-green-300">
          <p>Currently logged in : {userId}</p>
        </div>

        <div className="m-2 p-2 bg-slate-200">
          <Link to="/Login">Login</Link>
        </div>

        <div className="m-2 p-2 bg-slate-100">
          <Link to="/SignUp">SignUp</Link>
        </div>

        <div className="m-2 bg-slate-300 p-2">
          <button onClick={checked}>SignOut</button>
        </div>
      </div>
    </>
  );
};

export default Home;
