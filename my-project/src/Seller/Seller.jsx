import { auth } from "../FireBase/FireComp";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SellerBar from "./SellerBar";
import MyProduct from "./MyProduct";
import SellerHome from "./SellerHome";
import Post from "./Post";
import ChatHome from "../Chat Application/ChatHome";
const Seller = () => {
  // state
  const [go, setGo] = useState(false);
  const [post, setPost] = useState(false);
  const [myproduct, setMyproduct] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const { signOut, userid, getCurrentUser } = useAuth();

  const navigate = useNavigate();

  const changePage = (text) => {
    setCurrentPage(text);
  };

  //handleClick

  const HandleClick = () => {
    console.log("click");
    setPost(true);
  };

  const LogOut = async () => {
    signOut();

    navigate("/");
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <div className="h-full overflow-hidden  bg-slate-50 ">
        <SellerBar
          currentPage={currentPage}
          changePage={changePage}
          LogOut={LogOut}
        />

        {currentPage === "myProduct" ? (
          <MyProduct />
        ) : currentPage === "createPost" ? (
          <Post changePage={changePage} />
        ) : currentPage === "chatRoom" ? (
          <ChatHome />
        ) : (
          <SellerHome />
        )}
      </div>
    </>
  );
};

export default Seller;
