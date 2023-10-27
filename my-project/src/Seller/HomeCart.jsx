import React, { useState } from "react";

import productAvater from "../assets/productAvater.jpg";
import { useNavigate } from "react-router-dom";

const HomeCart = ({ name, image, price, description, stock }) => {

    const navigate = useNavigate();

    const goToDetail = (e) => {

        e.preventDefault();


        const detail = {
            name: name,
            image: image,
            price: price,
            description: description,
            stock: stock,
        }





        navigate(
            "/productDetail", {
                state: {
                    name, image, price, description, stock
                }
        }
        );




    }








    return (
        <>
            <div
                className={`m-4 p-2 rounded-xl shadow-md hover:scale-95 hover:duration-500 bg-white h-72 w-52 flex flex-col justify-evenly border-t-2 ${stock ? "border-green-500" : "border-red-400"
                    } hover:cursor-progress `}

                onClick={goToDetail}
            >
                <div className=" h-2/3">
                    <img src={image} alt={name} />
                </div>

                <div className="mt-2 bg-slate-50 rounded-sm ">
                    <label> {name} </label>
                </div>

                <div className="mt-2 bg-slate-50 rounded-sm ">
                    <label> {price} </label>
                </div>
            </div>
        </>
    );  
};

export default HomeCart;
