import { auth } from "../FireBase/FireComp";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Seller = () => {
  // state
  const [go, setGo] = useState(false);
  const [post, setPost] = useState(false);
  const [myproduct, setMyproduct] = useState(false);

  const { signOut, userid, getCurrentUser } = useAuth();

  //handleClick

  const HandleClick = () => {
    console.log("click");
    setPost(true);
  };

  const LogOut = async () => {
    signOut();
    setGo(true);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (go) {
    return <Navigate to="/Login" />;
  }
  if (post) {
    return <Navigate to="/Post" />;
  }
  if (myproduct) {
    return <Navigate to="/MyProduct" />;
  }

  return (
    <>
      <div>This is Seller Account</div>

      <div className="bg-slate-100 font-bold flex justify-center space-x-5 ">
        <ul
          onClick={() => {
            setPost(!post);
          }}
        >
          Create Post
        </ul>
        <ul
          onClick={() => {
            setMyproduct(!myproduct);
          }}
        >
          My Products
        </ul>
        <ul>All</ul>
        <ul>Id: {userid} </ul>
        <ul onClick={LogOut}>LogOut</ul>
      </div>
    </>
  );
};

export default Seller;
