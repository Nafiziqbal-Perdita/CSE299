import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shoppingCart from "../../assets/shopping-cart.png";
import { getDatabase, ref, push, get } from "firebase/database";
import CartManager from "../CartManager";
import { useAuth } from "../../FireBase/Authentication/AuthContext";

const Product = ({
  id,
  name,
  price,
  desc,
  creator_id,
  avail,
  image,
  buyerId,
}) => {
  // states
  const [isAvail, setIsAvail] = useState(false);
  const [checked, setChecked] = useState(false);
  const [colKey, setColKey] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [staticQuantity, setStaticQuantity] = useState(1);

  const cartManager = new CartManager();
  //by the help context api getting the current user
  const { getCurrentUser, userid } = useAuth();

  useEffect(() => {
    getCurrentUser();

    console.log(userid);
  }, []);

  //useEffect
  useEffect(() => {
    if (avail) {
      setIsAvail(true);
    }
    checkCartList();
  }, [refresh]); // Make sure 'refresh' is in the dependency array

  const navigate = useNavigate(); // Use useNavigate here

  const handleDetails = () => {
    console.log("Detailed page");

    // When the "Details" button is clicked, navigate to the Details component
    // and pass the necessary data as state
    navigate("/Details", {
      state: {
        id,
        name,
        price,
        desc,
        creator_id,
        avail,
        buyerId,
        image,
      },
    });
  };

  const checkCartList = async () => {
    console.log("Checking the cart datas");

    // Initialize Firebase database
    const db = getDatabase();

    // Reference to the "myCart" collection
    const cartRef = ref(db, "myCart");

    const snapShot = await get(cartRef);

    if (snapShot.exists()) {
      // Data exists, you can access it using snapshot.val()
      const cartData = snapShot.val();

      //iterate over the cart data

      for (const key in cartData) {
        if (cartData.hasOwnProperty(key)) {
          const cartItem = cartData[key];

          if (cartItem.buyer_id === userid && cartItem.product_id === id) {
            console.log(cartItem.product_name);
            console.log(cartItem.buyer_id);
            setChecked(true);
            // setIsAdded(true);
            setColKey(key);
          }
        }
      }
    }
  };

  //remove the cart
  const removeTheCart = async (key) => {
    console.log("In remove function");
    await cartManager.deleteFromCart(key);
    setRefresh(refresh + 1);
    setChecked(false);
  };

  const addInCart = async () => {
    if (checked) {
      console.log("Already in Cart now it will be removed");

      removeTheCart(colKey);

      return;
    }

    const myCart = {
      creator_id: creator_id,
      product_id: id,
      product_name: name,
      product_image: image,
      product_price: price,
      product_desc: desc,
      buyer_id: buyerId,
      inStock: avail,
      quantity: staticQuantity,
    };

    const add = await cartManager.addToCart(myCart, userid);
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div className=" relative ">
        <div
          className=" absolute left-3/4 top-48 h-10 w-10  "
          onClick={addInCart}
        >
          <svg
            className="h-full w-full rounded-md p-1 hover:scale-95 hover:duration-300  "
            width="128"
            height="128"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill={`${checked ? "#22c55e" : "#eab308"}`}
              d="M6 14.5a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 6 14.5zm10 0a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 16 14.5zM16 8V2H4a1 1 0 0 0-1-1H0v1h2l.751 6.438A2 2 0 0 0 4 12h12v-1H4a1 1 0 0 1-1-1v-.01L16 8z"
            />
          </svg>
        </div>

        <div
          className={`m-4 p-2 rounded-xl  bg-white h-72 w-52 flex flex-col justify-evenly border-t-2 ${
            avail ? "border-green-500" : "border-red-400"
          } hover:cursor-progress `}


          onClick={handleDetails}


        >
          <div className=" h-2/3 ">
            <img src={image} alt={name} />
          </div>

          <div className="mt-2 bg-slate-50 rounded-sm ">
            <label> {name} </label>
          </div>

          <div className="mt-2 bg-slate-50 rounded-sm ">
            <label> {price} </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
