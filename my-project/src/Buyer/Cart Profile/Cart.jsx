import React, { useEffect, useState } from "react";
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
  quantity,
  path,
  removeItem,
  update,
}) => {
  //states
  const [quan, setQuan] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataPath, setDataPath] = useState(path);

  //useEffect
  useEffect(() => {
    if (quantity > 1) {
      setQuan(quantity);
    }
  }, []);

  //hook calling
  const navigate = useNavigate();

  //class assigning

  const cartManager = new CartManager();

  const updateCartData = async (newQuan) => {
    console.log("the quantity is", newQuan);
    //carts data
    const updateCart = {
      buyer_id: buyer_id,
      creator_id: creator_id,
      inStock: inStock,
      product_desc: product_desc,
      product_id: product_id,
      product_image: product_image,
      product_name: product_name,
      product_price: product_price,
      quantity: newQuan,
    };
    // console.log("before updating");
    console.log(dataPath);
    setLoading(true);

    await cartManager.updateCartQuan(updateCart, dataPath);

    console.log("Waiting for 2 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Done waiting!");

    setLoading(false);

    //when the function will call the total carts will get updated
    update();
  };

  const increment = () => {
    setQuan((prev) => {
      const newQuantity = prev + 1;
      updateCartData(newQuantity);
      return newQuantity;
    });
  };

  const decrement = () => {
    setQuan((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        updateCartData(newQuantity);
        return newQuantity;
      }
      return prev;
    });
  };

  // console.log(dataPath);
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
        <div
          className=" bg-gray-200   h-28 w-2/3 flex items-center justify-between py-2 px-2 rounded-lg shadow-md
        hover:scale-95 hover:duration-500 
        "
        >
          <div className="h-20 p-1 ">
            <img
              className="h-full rounded-full"
              src={product_image}
              alt="name"
            />
          </div>
          <div className="text-lg font-serif font-bold">{product_name}</div>
          <div className=" w-44 h-16 p-2 flex justify-center items-center ">
            <label className="text-sm font-mono font-semibold">
              {product_price}
            </label>
          </div>

          <div className=" flex flex-col items-center justify-center ">
            <ul
              className="h-9 p-1 hover:scale-125 hover:duration-500 "
              onClick={async () => {
                await increment();
              }}
            >
              <svg
                className="h-full"
                width="64"
                height="64"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#06b6d4"
                  d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"
                />
              </svg>
            </ul>

            {loading ? (
              <div>
                <svg
                  className=" animate-spin "
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m11 9l2-.5l.5 2" />
                    <path d="M13 8.5A6.76 6.76 0 0 1 7 13h0a6 6 0 0 1-5.64-3.95M3 5l-2 .5l-.5-2" />
                    <path d="M1 5.5C1.84 3.2 4.42 1 7 1h0a6 6 0 0 1 5.64 4" />
                  </g>
                </svg>
              </div>
            ) : (
              <ul className=" text-lg text-center font-sans font-semibold  mt-1 ">
                {quan}
              </ul>
            )}

            <ul
              className="p-1 h-10 hover:scale-125 hover:duration-500"
              onClick={async () => {
                if (quan > 1) {
                  await decrement();
                }
              }}
            >
              <svg
                className="h-full"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="#06b6d4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14"
                />
              </svg>
            </ul>
          </div>

          <div className="flex items-center justify-center space-x-1 ">
            <div
              className="h-10 hover:scale-110 hover:duration-500"
              onClick={() => removeItem(dataPath)}
            >
              <svg
                className="h-full"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#ea580c"
                  d="m21.41 11.58l-9-9C12.04 2.21 11.53 2 11 2H4a2 2 0 0 0-2 2v7c0 .53.21 1.04.59 1.41l.41.4c.9-.54 1.94-.81 3-.81a6 6 0 0 1 6 6c0 1.06-.28 2.09-.82 3l.4.4c.37.38.89.6 1.42.6c.53 0 1.04-.21 1.41-.59l7-7c.38-.37.59-.88.59-1.41c0-.53-.21-1.04-.59-1.42M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m2.62 14.54L6 19.41l-2.12 2.13l-1.42-1.42L4.59 18l-2.13-2.12l1.41-1.41L6 16.59l2.12-2.12l1.41 1.41L7.41 18l2.12 2.12l-1.41 1.42Z"
                />
              </svg>
            </div>
            <div
              className="h-10 hover:scale-110 hover:duration-500"
              onClick={navigateToDetail}
            >
              <svg
                className="h-full"
                width="128"
                height="128"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#3b82f6"
                  d="M4.25 4A2.25 2.25 0 0 0 2 6.25v2.5A2.25 2.25 0 0 0 4.25 11h2.5A2.25 2.25 0 0 0 9 8.75v-2.5A2.25 2.25 0 0 0 6.75 4h-2.5ZM3.5 6.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-2.5ZM11.25 5a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10Zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7Zm-7 5A2.25 2.25 0 0 0 2 15.25v2.5A2.25 2.25 0 0 0 4.25 20h2.5A2.25 2.25 0 0 0 9 17.75v-2.5A2.25 2.25 0 0 0 6.75 13h-2.5Zm-.75 2.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-2.5ZM11.25 14a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10Zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Cart;
