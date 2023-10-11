import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { auth } from "../FireBase/FireComp";
import { useEffect, useState } from "react";
const LogIn = () => {
  const { signInwithMailPass, setEmail, setPass,setUserid,userid } = useAuth();

  const [go, setGo] = useState(false);

  const checked = async () => {
    await signInwithMailPass();
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      setGo(true);
      setUserid(user.uid);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;

    console.log(user);
    if (user) {
      setGo(true);
      setUserid(user.uid);
    }
  });

  console.log(go);
  console.log('current',userid);

  if (go) {
    return <Navigate to="/Wrap"   />;
  }

  return (
    <>
      <p className="text-2xl font-bold">Login</p>

      <form action="">
        <input
          className="border border-black m-5"
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="border border-black m-5"
          type="text"
          placeholder="Enter Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <button
          className="border border-black m-5 rounded-lg p-2"
          onClick={checked}
          type="button"
        >
          Log In
        </button>
        or
        <button
          className="border border-black m-5 rounded-lg p-2"
          type="button"
        >
          <Link to="/SignUp">Sign Up</Link>
        </button>
      </form>
    </>
  );
};

export default LogIn;
