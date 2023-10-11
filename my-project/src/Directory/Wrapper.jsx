import { useEffect, useState } from "react";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Navigate } from "react-router-dom";
const Wrapper = () => {
  //Auth Provider
  const { signOut, userid, getCurrentUser } = useAuth();

  const [data, setData] = useState([]);
  const [type, setType] = useState({});

  

  const fetchData = async () => {
    const db = getFirestore();
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedData = [];

      querySnapshot.forEach((doc) => {
        fetchedData.push({
          id: doc.id,
          ...doc.data(),
        });

        // console.log(doc.id);
        console.log(doc.data());

        if (doc.id === userid) {
          setType(doc.data());
        }
      });

      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  console.log(data);
  console.log(type);

  const callEveryOne = () => {
    (async () => {
      await getCurrentUser();
      await fetchData();
    })();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      callEveryOne();
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>
        This is Wrapper Class
        <div>The id is: {userid}</div>
      </div>

      <div>The Database data is : {type.type}</div>

      {type.type === "seller" ? <Navigate to="/Seller" /> : "null"}
      {type.type === "buyer" ? <Navigate to="/Buyer" /> : "null"}
      {/* <button onClick={signOut}>LogOut</button> */}

      <div className="bg-slate-500 h-32 flex justify-center items-center">
        <label className="text-5xl font-extrabold text-yellow-50">
          <span>Loading</span>
        </label>
      </div>
    </>
  );
};

export default Wrapper;
