import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shoppingCart from "../../assets/shopping-cart.png";
import { getDatabase, ref, push, get } from "firebase/database";
import CartManager from "../CartManager";

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
  const [isAdded, setIsAdded] = useState(false);
  const [colKey, setColKey] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const cartManager = new CartManager();

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

          if (cartItem.product_id === id) {
            setIsAdded(true);
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
    setIsAdded(false);
  };

  const addInCart = async () => {
    if (isAdded) {
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
    };

    const add = await cartManager.addToCart(myCart);
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div className="bg-blue-400  h-48 w-44 m-4 rounded-lg shadow-md px-2   flex flex-col justify-evenly">
        <ul> {refresh} </ul>

        <ul> {colKey} </ul>

        <ul>
          <div
            className={` ${
              isAdded ? "bg-yellow-300" : "bg-white"
            } w-fit m-2 p-1 cursor-pointer`}
            onClick={addInCart}
          >
            <img className="h-5  " src={shoppingCart} alt="Cart" />
          </div>
        </ul>
        <ul>{isAdded}</ul>

        <ul className="bg-slate-50 px-1 rounded-md">Name: {name}</ul>
        <ul className="bg-slate-100 px-1 rounded-md">Price: {price}</ul>
        <ul className="bg-slate-200 px-1 rounded-md">
          Available: {isAvail === true ? "Yes" : "No"}
        </ul>

        <button
          className="bg-slate-50 rounded-md"
          type="button"
          onClick={handleDetails}
        >
          Details
        </button>
      </div>
    </>
  );
};

export default Product;
