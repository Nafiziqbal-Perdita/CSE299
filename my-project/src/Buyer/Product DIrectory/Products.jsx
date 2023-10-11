import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Product from "./Product";


const Products = ({buyerId}) => {
    //states
    const [data, setData] = useState([]);

    const db = getFirestore();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const fetchedData = [];

                querySnapshot.forEach((doc) => {
                    fetchedData.push({
                        ...doc.data(),
                    });
                });

                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);










    console.log(data);

    return (
        <>
            <div className="bg-gray-50">
                {/* all products will deployed here  */}

                <div className="m-5 p-1    flex flex-wrap   ">
                    {data.map((doc) => {
                        return (
                            <Product
                                key={Math.random()}
                                creator_id={doc.creator_id}
                                desc={doc.description}
                                id={doc.product}
                                price={doc.price}
                                name={doc.product_name}
                                avail={doc.stock}
                                image={doc.image}
                                buyerId={buyerId}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Products;
