import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartManager from "../CartManager";

import MainComment from "../../Comment/MainComment";

const Details = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { id, name, price, desc, creator_id, avail, buyerId, image } =
    location.state;

  const cartManager = new CartManager();

  const handleClick = async () => {
    console.log("Entered");
    if (!avail) {
      return;
    }

    const newCart = {
      creator_id: creator_id,
      product_id: id,
      product_name: name,
      product_image: image,
      product_price: price,
      product_desc: desc,
      buyer_id: buyerId,
      inStock: avail,
    };

    await cartManager.addToCart(newCart);
    // console.log("Cart added in the data base");

    navigate("/Buyer");
  };

  return (
    <>
      <div>This is details page</div>

      <div>
        <img className=" h-28 " src={image} alt={name} />

        <h2>Product Details</h2>
        <p>ID: {id}</p>
        <p>Buyer ID: {buyerId}</p>
        <p>Name: {name}</p>
        <p>Price: {price}</p>
        <p>Description: {desc}</p>
        <p>Creator ID: {creator_id}</p>
        <p>Available: {avail ? "Yes" : "No"}</p>
      </div>

      <button className="bg-yellow-400" onClick={handleClick}>
        Add To Cart
      </button>


<hr />
<hr />
<hr />
<hr />

<div>

    <MainComment/>
</div>








    </>
  );
};

export default Details;
