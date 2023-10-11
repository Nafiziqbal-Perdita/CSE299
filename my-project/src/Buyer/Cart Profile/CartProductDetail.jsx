import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const CartProductDetails = () => {




    //calling hooks for useLocation
    const location = useLocation();
    const navigate = useNavigate();

    const { buyer_id,
        creator_id,
        inStock,
        product_desc,
        product_id,
        product_image,
        product_name,
        product_price,

    } = location.state;


    const goCarts = () => {


        navigate("/Carts", {
            state: {
                userid: buyer_id,
            }
        })


    }






    return (


        <>

            <div>This is details page</div>



            <div>

                <img

                    className=" h-28 "


                />



                <h2>Product Details</h2>
                <p>ID: {product_id} </p>
                <p>Buyer ID: {buyer_id} </p>
                <p>Name: {product_name} </p>
                <p>Price: {product_price} </p>
                <p>Description: {product_desc} </p>
                <p>Creator ID: {creator_id} </p>
                <p>Available:{inStock ? "Yes" : "No"} </p>
            </div>

            <button
                className="bg-yellow-400"
                onClick={() => {
                    return goCarts();
                }}

            >

                Go to MyCart



            </button>


        </>
    );

}

export default CartProductDetails;