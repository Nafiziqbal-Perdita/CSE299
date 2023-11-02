import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Directory/Home";
import LogIn from "./Directory/Login";
import Registration from "./Directory/Registration";
import Wrapper from "./Directory/Wrapper";
import Post from "./Seller/Post";
import Seller from "./Seller/Seller";
import Buyer from "./Buyer/Buyer";
import MyProduct from "./Seller/MyProduct";
import EditPost from "./Seller/EditPost";
import Details from "./Buyer/Product DIrectory/Details";
import Carts from "./Buyer/Cart Profile/Carts";
import CartProductDetails from "./Buyer/Cart Profile/CartProductDetail";
import SellerHome from "./Seller/SellerHome";
import SellerProductDetail from "./Seller/SellerProductDetail";
import ChatHome from "./Chat Application/ChatHome";
import Messenger from "./Chat Application/Messenger";
import MyAccount from "./Account/MyAccount";
import CheckOut from "./Buyer/CheckOut/CheckOut";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/Wrap" element={<Wrapper />} />
          <Route path="/SignUp" element={<Registration />} />
          <Route path="/Seller" element={<Seller />} />
          <Route path="/productDetail" element={<SellerProductDetail />} />
          <Route path="/Home" element={<SellerHome />} />
          <Route path="/Buyer" element={<Buyer />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/MyProduct" element={<MyProduct />} />
          <Route path="/EditPost" element={<EditPost />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/Carts" element={<Carts />} />
          <Route path="/CartProductDetails" element={<CartProductDetails />} />
          <Route path="/chatRoom" element={<ChatHome />} />
          <Route path="/chat" element={<Messenger />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/checkOut" element={<CheckOut />} />
        </Routes>
      </Router>
    </>
  );
}
