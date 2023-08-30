import { Navigate } from "react-router-dom";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { auth } from "../FireBase/FireComp";
import { useEffect, useState } from "react";
export default function Registration() {
  const { registerWithMailPass,  setEmail,  setPass } = useAuth();

  const [go, setGo] = useState(false);

  const checked = async () => {
    await registerWithMailPass();
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      setGo(true);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      setGo(true);
    }
  });

  console.log(go);

  if (go) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <p className="text-2xl font-bold">Registration</p>

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
          Click
        </button>
      </form>
    </>
  );
}
