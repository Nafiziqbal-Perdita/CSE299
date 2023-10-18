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
  update
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


    console.log('Waiting for 2 seconds...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Done waiting!');

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
        <div className="bg-blue-400  h-48 w-44 m-4 rounded-lg shadow-md px-2   flex flex-col justify-evenly">
          <ul>
            <div
              className={`bg-yellow-300  w-fit m-2 p-1 cursor-pointer`}
              onClick={() => removeItem(dataPath)}
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

          {loading ? (
            <div>{quan}...</div>
          ) : (
            <ul className="bg-gray-100 rounded-md px-1 flex items-center ">
              Quantity: {quan}
              <div className="flex ml-2">
                <ul
                  className="text-lg p-1"
                  onClick={async () => {

                    await increment();


                  }}
                >
                  +
                </ul>
                <ul
                  className="text-lg p-1"
                  onClick={async () => {

                    if (quan > 1) {
                      await decrement();

                    }
                  }}
                >
                  -
                </ul>
              </div>
            </ul>
          )}

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
