import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, ref, push, get, remove } from "firebase/database";
import CartManager from "../CartManager";
import Cart from "./Cart";

import backIcon from "../../assets/back.png";


const Carts = () => {
    // states
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const { userid } = location.state;

    const cartManager = new CartManager();

    //useEffect
    useEffect(() => {
        const callMan = async () => {
            await getTheCarts();
        };
        callMan();
    }, [refresh]);

    useEffect(() => {
        calculatePrice();
    }, [data]);

    const removeItem = async (path) => {
        await cartManager.deleteFromCart(path);
        setRefresh(!refresh);
        //when the function will call the total carts will get updated

        getUpdate();
    };

    //function to trim the characters except the number characters

    function findLongestConsecutiveNumber(inputString) {
        const matches = inputString.match(/\d+/g); // Match sequences of digits

        if (!matches) {
            return null; // No number sequences found
        }

        let longestSequence = "";
        let currentSequence = "";

        for (const match of matches) {
            if (currentSequence === "") {
                currentSequence = match;
            } else {
                const currentNum = parseInt(match, 10);
                const prevNum = parseInt(currentSequence, 10);

                if (currentNum === prevNum + 1) {
                    currentSequence += match;
                } else {
                    if (currentSequence.length > longestSequence.length) {
                        longestSequence = currentSequence;
                    }
                    currentSequence = match;
                }
            }
        }

        // Check if the last sequence is the longest
        if (currentSequence.length > longestSequence.length) {
            longestSequence = currentSequence;
        }

        const result = parseInt(longestSequence, 10);
        return isNaN(result) ? 0 : result;
    }

    // calculating the total price of the products

    const calculatePrice = () => {
        let sum = 0;

        data.map((d) => {
            console.log("enter");
            console.log(d.product_price);
            // const getPrice = extractNumbersFromString(d.product_price);
            const getPrice = findLongestConsecutiveNumber(d.product_price);
            console.log(getPrice);
            const subTotal = d.quantity * getPrice;
            console.log(subTotal);
            sum += subTotal;
        });

        setTotalPrice(sum);
    };

    const getUpdate = () => {
        setRefresh(!refresh);
    };

    // Initialize Firebase database
    const db = getDatabase();

    const getTheCarts = async () => {
        console.log("Enter for Searching");
        // Reference to the "myCart" collection
        const cartRef = ref(db, "myCart");

        const snapShot = await get(cartRef);

        let myData = [];

        if (snapShot.exists()) {
            // Data exists, you can access it using snapshot.val()
            const cartData = snapShot.val();
            // console.log("myCart data:", cartData);

            //iterate over the cart data

            for (const key in cartData) {
                if (cartData.hasOwnProperty(key)) {
                    const cartItem = cartData[key];

                    //conditional statement
                    if (cartItem.buyer_id === userid) {
                        // Add the key and count to the cartItem before pushing to myData
                        cartItem.key = key; // Add the key

                        myData.push(cartItem);
                    }
                }
            }
        } else {
            console.log("Nothing Here");
        }

        setData(myData);
        // console.log(myData);
    };

    console.log("State data");
    console.log(data);

    return (
        <div className="  items-center h-screen flex flex-col " >

            <>
                <div className="bg-gray-100 w-full m-1 p-2 rounded-lg shadow-md flex items-center space-x-2 ">
                    <img
                        src={backIcon}
                        alt=""
                        className="h-10 hover:scale-90 hover:duration-300"
                        onClick={() => {
                            navigate("/Buyer");

                        }}

                    />
                    <label className=" font-sherif text-lg ">back to Home</label>
                </div>


                <div className="bg-transparent border shadow-md m-4 h-14 w-2/4 rounded-md flex items-center justify-evenly     ">
                    <span className="p-2 m-2 bg-yellow-400 rounded-md shadow-md text-slate-50 font-bold text-lg  hover:bg-yellow-600 hover:animate-pulse  ">
                        Total Price: {totalPrice} Tk
                    </span>

                    <span className="p-2 m-2  bg-green-400 font-bold rounded-md shadow-md text-lg   hover:bg-green-600 hover:scale-90 hover:animate-pulse hover:duration-500  ">


                        <button className="text-slate-100 h-6 flex justify-evenly items-center"



                            onClick={() => {


                                navigate('/checkOut', {
                                    state:{
                                        data,
                                        totalPrice
                                    }
                                } 
                                
                                
                                
                                );





                            }}


                        >


                            <svg

                                className="h-full"

                                width="48" height="48" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12.91 5.5H1.09c-.56 0-.8-.61-.36-.9L6.64.73a.71.71 0 0 1 .72 0l5.91 3.87c.44.29.2.9-.36.9Z" />
                                    <rect width="13" height="2.5" x=".5" y="11" rx=".5" />
                                    <path d="M2 5.5V11m2.5-5.5V11M7 5.5V11m2.5-5.5V11M12 5.5V11" />
                                </g>
                            </svg>

                            <span>
                                Billing
                            </span>

                        </button>



                    </span>

                </div>



                <div className="flex flex-wrap space-y-2  justify-center m-2 p-2 ">
                    {data.map((d) => {
                        return (
                            <Cart
                                key={Math.random()}
                                buyer_id={d.buyer_id}
                                creator_id={d.creator_id}
                                inStock={d.inStock}
                                product_desc={d.product_desc}
                                product_id={d.product_id}
                                product_image={d.product_image}
                                product_name={d.product_name}
                                product_price={d.product_price}
                                quantity={d.quantity}
                                path={d.key}
                                removeItem={removeItem}
                                //update the carts when the function is called
                                update={getUpdate}
                            />
                        );
                    })}
                </div>


            </>




        </div>
    );
};

export default Carts;
