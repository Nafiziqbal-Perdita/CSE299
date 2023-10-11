import React, { useState } from "react";
import shoppingCart from "../../assets/shopping-cart.png";
import CartManager from "../CartManager";
import { useNavigate } from "react-router-dom";

const Cart = ({
  buyer_id,
  creator_id,
  inStock,
  product_desc,
  product_id,
  product_image,
  product_name,
  product_price,
  path,
  removeItem,
}) => {
  //states

  //hook calling
  const navigate = useNavigate();

  //class assigning

  const cartManager = new CartManager();

  const navigateToDetail = () => {
    navigate("/CartProductDetails", {
      state: {
        buyer_id,
        creator_id,
        inStock,
        product_desc,
        product_id,
        product_image,
        product_name,
        product_price,
       
   
      },
    });
  };

  return (
    <>
      <>
        <div className="bg-blue-400  h-48 w-44 m-4 rounded-lg shadow-md px-2   flex flex-col justify-evenly">
          <ul>
            <div
              className={`bg-yellow-300  w-fit m-2 p-1 cursor-pointer`}
              onClick={() => removeItem(path)}
            >
              <img className="h-5  " src={shoppingCart} alt="Cart" />
            </div>
          </ul>

          <ul className="bg-slate-50 px-1 rounded-md">Name: {product_name} </ul>
          <ul className="bg-slate-100 px-1 rounded-md">
            Price:{product_price}{" "}
          </ul>
          <ul className="bg-slate-200 px-1 rounded-md">
            Available: {inStock ? "Yes" : "No"}
          </ul>

          <button
            className="bg-slate-50 rounded-md"
            type="button"
            onClick={navigateToDetail}
          >
            Details
          </button>
        </div>
      </>
    </>
  );
};

export default Cart;
