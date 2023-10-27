import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
import ProductCart from "../Common Components/ProductCart";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { Navigate } from "react-router-dom";
const MyProduct = () => {
  const [data, setData] = useState([]);
  const [home, setHome] = useState(false);
  const [refresh, setRefresh] = useState(false);

  //take current user id from context provider useAuth

  const { userid, getCurrentUser } = useAuth();

  //get the current user using use effect
  useEffect(() => {
    getCurrentUser();
  }, []);

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
  }, [refresh]);

  console.log(data);

  //delete a item cart
  const deleteDocument = async (docId) => {
    const db = getFirestore();
    const documentRef = doc(db, "posts", docId);

    try {
      await deleteDoc(documentRef);
      console.log("Document successfully deleted!");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <>
      {/* <div className="flex h-11 items-center justify-center">
        <button
          className="bg-blue-400 m-2 py-1 px-2 rounded-md text-yellow-50 font-bold"
          onClick={(e) => {
            setHome(!home);
          }}
        >
          Home
        </button>
      </div> */}

      <div className="bg-slate-100 h-full flex">
        {/* the data is filtered by the current user id because here those items will be provided that what is created by the current user  */}

        {data
          .filter((item) => item.creator_id === userid)
          .map((item) => (
            <ProductCart
              key={Math.random()}
              image={item.image}
              product_id={item.product}
              detail={item.description}
              userid={item.creator_id}
              name={item.product_name}
              price={item.price}
              stock={item.stock}
              category={item.category}
              deleteEvent={deleteDocument}
            />
          ))}
      </div>
    </>
  );
};

export default MyProduct;
