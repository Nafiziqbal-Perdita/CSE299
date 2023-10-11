import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, ref, push, get, remove } from "firebase/database";
import CartManager from "../CartManager";
import Cart from "./Cart";
const Carts = () => {
    // states
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const { userid } = location.state;

    const cartManager = new CartManager();

    //useEffect
    useEffect(() => {

        const callMan = async () => {

            await getTheCarts();

        }
        callMan();



    }, [refresh]);



    const removeItem = async (path) => {


        await cartManager.deleteFromCart(path);
        setRefresh(!refresh);



    }






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
                        cartItem.count = 1; // Initialize count (you can change it as needed)

                        myData.push(cartItem);
                    }
                }
            }
        } else {
            console.log("Nothing Here");
        }

        setData(myData);
        console.log(myData);

    };

    console.log("State data");
    console.log(data);

    return (
        <>
            <div>Carts Profile</div>
            {userid}


            <div

                onClick={() => {
                    navigate("/Buyer");

                }}

            >Home</div>





            {
                data.map((d) => {


                    return <Cart
                        key={Math.random()}

                        buyer_id={d.buyer_id}
                        creator_id={d.creator_id}
                        inStock={d.inStock}
                        product_desc={d.product_desc}
                        product_id={d.product_id}
                        product_image={d.product_image}
                        product_name={d.product_name}
                        product_price={d.product_price}
                        path={d.key}
                        removeItem={removeItem}


                    />;


                })
            }










        </>
    );
};

export default Carts;
