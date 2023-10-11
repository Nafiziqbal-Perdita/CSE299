
import { useEffect, useState } from "react";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { auth } from "../FireBase/FireComp";
import { Navigate, useNavigate } from "react-router-dom";
import Products from "./Product DIrectory/Products";
const Buyer = () => {

  const [go, setGo] = useState(false);


  const { signOut, userid, getCurrentUser } = useAuth();

  const navigate = useNavigate();


  useEffect(() => {

    getCurrentUser();


  }, []);






  const goCart = () => {



    navigate("/Carts", {

      state: {
        userid,


      }


    });


  }










  const LogOut = async () => {
    signOut();
    setGo(true);
  };


  if (go) {
    return <Navigate to="/Login" />;
  }

  return (
    <>

      <div className="bg-slate-100 font-bold flex justify-center space-x-5 ">

        <ul>Buyer</ul>
        <ul>Id: {userid} </ul>
        <ul onClick={LogOut} >LogOut</ul>

        <ul

          onClick={goCart}

        >My Carts</ul>

      </div>


      <div>

        <Products buyerId={userid} />


      </div>




    </>
  );
};

export default Buyer;
