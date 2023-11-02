import { useEffect, useState } from "react";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { auth } from "../FireBase/FireComp";
import { Navigate, useNavigate } from "react-router-dom";
import Products from "./Product DIrectory/Products";
import BuyerBar from "./BuyerBar";
import carousoul from "./Carosoul/carosoul";
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
      },
    });
  };

  const LogOut = async () => {
    signOut();
    setGo(true);
  };

  if (go) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      <BuyerBar logOut={LogOut} cart={goCart} />




      <div>
    
        <Products buyerId={userid} />
      </div>
    </>
  );
};

export default Buyer;
