import { useEffect, useState } from "react";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../FireBase/FireComp";
import { BounceLoader } from "react-spinners";
const Wrapper = () => {
  //Auth Provider
  const { signOut, userid, getCurrentUser } = useAuth();

  const [data, setData] = useState([]);
  const [type, setType] = useState({});





  const nowType = (data) => {

    const myUser = auth.currentUser.uid;



    console.log("in the type", data);

    console.log("in the type user", myUser);

    data.forEach((doc) => {

      if (myUser === doc.id) {
        console.log('Got id');
        // console.log(doc.id);
        console.log(doc.type);

        goNavigate(doc.type);

      }

    })







  }



  const fetchData = async () => {
    const db = getFirestore();
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = [];

      querySnapshot.forEach((doc) => {
        userData.push({
          id: doc.id,
          ...doc.data(),
        });
      }

      );

      await nowType(userData);

      setData(userData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };


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




  const navigate = useNavigate();

  const goNavigate = (type) => {


    if (type === 'seller') {
      navigate('/Seller');
    } else {
      navigate('/Buyer');
    }




  }







  return (
    <>

      <div className="h-screen w-screen flex justify-center items-center">


        <div>
          <BounceLoader color="#36d7b7" size={150} />
        </div>


      </div>
    </>
  );
};

export default Wrapper;