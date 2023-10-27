import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import backIcon from '../../assets/back.png';
import MainComment from "../../Comment/MainComment";
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
            <div className="h-screen bg-slate-50">
                <div className="bg-gray-100 m-1 p-2 rounded-lg shadow-md flex items-center space-x-2 ">
                    <img
                        src={backIcon}
                        alt=""
                        className="h-10 hover:scale-90 hover:duration-300"
                        onClick={() => {
                            return goCarts();
                        }}
                    />
                    <label className=" font-sherif text-lg ">back to Cart</label>
                </div>

                <div className="bg-white m-10 h-2/3 shadow-md shadow-teal-100 flex items-center justify-between ">
                    {/* left bar */}

                    <div className=" h-full w-1/2 m-5 p-10 flex items-center justify-center  ">
                        <div className=" rounded-lg bg-gray-100 shadow-sm h-3/4 w-3/4    ">
                            <img
                                className="h-full w-full rounded-md p-2 border-b border-blue-200"
                                src={product_image}
                                alt={product_name}
                            />
                        </div>
                    </div>

                    {/* right bar */}
                    <div className=" h-full w-1/2  flex flex-col items-start justify-center space-y-5     ">
                        <div className="bg-blue-100 py-1 px-3 w-full rounded-lg ">
                            <span className=" text-3xl font-serif font-bold  ">
                                {product_name}


                            </span>
                        </div>

                        <div className="bg-blue-50 py-1 px-3 w-full rounded-lg ">
                            <span className=" text-lg font-mono font-bold  ">
                                {product_price}

                            </span>
                        </div>

                        <div className="bg-slate-100 py-1 px-3 w-full whitespace-normal rounded-lg">
                            <p className="text-lg font-mono font-bold whitespace-normal">
                                {product_desc}
                            </p>
                        </div>




                    </div>
                </div>

                <div className="m-8 pb-3 pt-1 pl-1 pr-1 bg-slate-100">
                    <MainComment product_id={product_id} />
                </div>
            </div>
        </>




    );

}

export default CartProductDetails;