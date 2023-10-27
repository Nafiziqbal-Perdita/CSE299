import { collection, getDocs, getFirestore } from "firebase/firestore";
import ChatCart from "./ChatCart";
import { useEffect, useState } from "react";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import chatClass from "./chatClass";
import SellerBar from "../Seller/SellerBar";
import { useNavigate } from "react-router-dom";
import { auth } from "../FireBase/FireComp";

const ChatHome = () => {
  const [room, setRoom] = useState([]);
  const [type, setType] = useState("");
  const { userid, getCurrentUser } = useAuth();
  const chat = new chatClass();

  const currentUser = auth.currentUser.uid;

  console.log('current user', currentUser);




  const navigate = useNavigate();
  useEffect(() => {
    const db = getFirestore();
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chatRoom"));
        const data = querySnapshot.docs.map((doc) => ({
          roomId: doc.id, // Include the ID
          ...doc.data(), // Include the document data
        }));
        setRoom(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getType = async () => {
      const theType = await chat.findType(userid);
      console.log(theType);
      setType(theType);
    };

    getCurrentUser();
    console.log(userid);
    getType();
    fetchData();
  }, []);

  console.log("state data", room);
  console.log("res", type);

  return (
    <>
      <div className="bg-slate-50 h-screen  flex items-center justify-center ">
        <div className="bg-white  h-5/6 w-5/6 ">
          <div className="bg-slate-100 h-14 m-1 p-1 rounded-xl flex items-center justify-between shadow-md ">
            <div className=" flex items-center justify-center p-5 rounded-lg space-x-5 ">
              <div
                className="h-8"
                onClick={() => {
                  navigate("/Wrap");
                }}
              >
                <svg
                  className="h-full"
                  width="128"
                  height="128"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#0ea5e9"
                    d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
                  />
                </svg>
              </div>
              <div className="px-2 py-1 rounded-md  text-lg font-serif font-extrabold text text-gray-700">
                Chat History
              </div>
            </div>
          </div>

          {
            type === "seller"
              ? room
                .filter((e) => e.from === currentUser || e.to === currentUser)
                .map((e, ind) => (
                  <ChatCart
                    key={ind}
                    roomId={e.roomId}
                    name={e.toName}
                    time={e.lastTime}
                  />
                ))
              : type === "buyer"
                ? room
                  .filter((e) => e.from === currentUser || e.to === currentUser)
                  .map((e, ind) => (
                    <ChatCart
                      key={ind}
                      roomId={e.roomId}
                      name={e.fromName}
                      time={e.lastTime}
                    />
                  ))
                : "Loading"
          }
          {/* Add debug logs */}
          {console.log("Type:", type)}




        </div>
      </div>
    </>
  );
};

export default ChatHome;
