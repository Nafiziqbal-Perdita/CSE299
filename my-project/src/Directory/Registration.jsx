import { Navigate } from "react-router-dom";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { auth } from "../FireBase/FireComp";
import { useEffect, useState } from "react";

import { getFirestore,setDoc, doc } from "firebase/firestore";

export default function Registration() {
  const { registerWithMailPass, setEmail, setPass, setUserid } = useAuth();
  //states
  const [go, setGo] = useState(false);
  const [type, setType] = useState("buyer");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [description, setDescription] = useState("");

  //if signed in then it will navigate to the home directory
  const checked = async () => {
    await registerWithMailPass();
    const user = auth.currentUser;
    console.log(user);

    // making connection with database;

    const db = getFirestore();

    if (user) {
      try {
        const docRef = await setDoc(doc(db, "users", user.uid), {
          first_name: first_name,
          last_name: last_name,
          type: type,
          description: description,
        });
        console.log("Document written with ID: ",docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    console.log("confirmed");

    if (user) {
      setGo(true);
      setUserid(user.uid);
    }

    console.log(type);
    console.log(first_name);
    console.log(last_name);
    console.log(description);
  };

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      setGo(true);
      setUserid(user.uid);
    }
  });

  // Detailed related works

  console.log(go);

  if (go) {
    return <Navigate to="/Wrap" />;
  }

  return (
    <>
      <p className="text-2xl font-bold">Registration</p>

      <form action="">
        <input
          className="border border-black m-5"
          type="text"
          placeholder="Enter First Name"
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <br />
        <input
          className="border border-black m-5"
          type="text"
          placeholder="Enter Last Name"
          onChange={(e) => setLast_name(e.target.value)}
        />
        <br />

        {/* type radio button  */}

        <div className="m-4 bg-slate-100 flex justify-between space-x-2 ">
          <label>Select Seller If you want to sell products</label>
        </div>

        <div className="m-4 w-36 flex justify-between space-x-2 ">
          <input
            type="radio"
            value="buyer"
            name="gender"
            checked={type === "buyer"}
            onChange={(e) => setType(e.target.value)}
          />
          Buyer
          <input
            type="radio"
            value="seller"
            name="gender"
            checked={type === "seller"}
            onChange={(e) => setType(e.target.value)}
          />{" "}
          Seller
        </div>

        <div className="m-4   ">
          <input
            className="border-2 w-52 h-12"
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Enter Email  */}
        <input
          className="border border-black m-5"
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {/* Enter Password  */}
        <input
          className="border border-black m-5"
          type="text"
          placeholder="Enter Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <br />

        {/* submit button for regestration */}

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
