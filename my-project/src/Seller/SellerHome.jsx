import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import HomeCart from "./HomeCart";
import { BeatLoader } from "react-spinners";

const SellerHome = () => {
  console.log("Home");

  const [data, setData] = useState([]);
  const [home, setHome] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  //take current user id from context provider useAuth

  const { userid, getCurrentUser } = useAuth();

  //get the current user using use effect
  useEffect(() => {
    getCurrentUser();
  }, []);

  const db = getFirestore();
  useEffect(() => {
    setLoading(true);

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

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (async () => {
      await delay(2000); // Wait for 2 seconds
      setLoading(false);
      fetchData();
    })();
  }, [refresh]);

  console.log(data);

  if (loading) {
    return (
      <>
        <div className=" min-h-screen flex justify-center items-center">
          <BeatLoader color="#1931b1" size={20} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className=" flex flex-wrap">
          {data.map((p) => {
            return (
              <HomeCart
                key={Math.random()}
                name={p.product_name}
                image={p.image}
                price={p.price}
                description={p.description}
                stock={p.stock}
              />
            );
          })}
        </div>
      </>
    );
  }
};

export default SellerHome;
