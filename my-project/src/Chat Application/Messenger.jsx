import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import chatClass from "./chatClass";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { Timestamp, serverTimestamp } from "firebase/firestore";

const Messenger = () => {
    const { userid, getCurrentUser } = useAuth();
    //defines the states
    const [text, setText] = useState("");
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState([]);
    const [refresh, setRefresh] = useState(false);


    const chatContainerRef=useRef(null);




    const location = useLocation();
    const { roomId,name } = location.state;
    console.log(roomId);

    const chat = new chatClass();


    const navigate = useNavigate();


    const allUpdateRoom = async () => {
        const myType = await chat.findType(userid);

        console.log("MyType", myType);
        let data = {
            fromCount: false,

            toCount: false,
        };

        if (myType === "seller") {
            data = {
                fromCount: false,

                toCount: false,
            };
        } else {
            data = {
                fromCount: false,

                toCount: false,
            };
        }

        console.log("value", count);

        try {
            await chat.updateRoom(roomId, data);
            // console.log("Room also updated");
        } catch (error) {
            console.log(error);
        }
    };






    const roomUpdate = async () => {
        const myType = await chat.findType(userid);

        console.log("MyType", myType);
        let data = {
            fromCount: false,

            toCount: false,
            lastTime: serverTimestamp(),
        };

        if (myType === "seller") {
            data = {
                fromCount: false,

                toCount: true,
                lastTime: serverTimestamp(),
            };
        } else {
            data = {
                fromCount: false,

                toCount: true,
                lastTime: serverTimestamp(),
            };
        }

        // console.log("value", count);

        try {
            await chat.updateRoom(roomId, data);
            console.log("Room also updated");
        } catch (error) {
            console.log(error);
        }
    };

    const giveText = async (e) => {
        e.preventDefault();
        if (text === "") return;
        console.log(text);
        setCount((prev) => prev + 1);

        const textData = {
            person: userid,
            text,
            room: roomId,
            time: serverTimestamp(),
        };

        try {
            await chat.sendText(textData);
            console.log("Message Send");
            setText("");

            setRefresh(!refresh);

            await roomUpdate();
        } catch (error) {
            console.log(error);
        }
    };




    const getAlltheMessageData = async () => {



        try {


            const tm = await chat.allTheTexts(roomId);
            console.log(tm);
            setMessage(tm);



        } catch (error) {
            console.log(error);
        }





    }




    useEffect(() => {
        const intervalId = setInterval(async () => {
            // This function will run every second



            await getAlltheMessageData();

        }, 1000); // 1000 milliseconds = 1 second

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);



    useEffect(() => {
        (async () => {

            await getCurrentUser();

            await allUpdateRoom();


        })();

    }, []);




// Add a useEffect hook to scroll to the bottom when messages change
useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [message]); // Ensure this effect runs whenever the message state changes





    return (
        <>
            <div className="  m-2" ref={chatContainerRef} >




                <div className="container shadow-md flex items-center justify-center  bg-white mx-auto">
                    <div className="max-w-2xl w-2/3  border rounded">
                        <div>
                            <div className="w-full">

                                <div className="relative shadow-md flex justify-between items-center p-3 border-b border-gray-300">



                                    <div className="h-10 w-12  "


                                        onClick={() => {

                                            navigate('/chatRoom');

                                        }}


                                    >


                                        <svg
                                            className="h-full w-full"
                                            width="128" height="128" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#10b981" fill-rule="evenodd" d="m2.87 7.75l1.97 1.97a.75.75 0 1 1-1.06 1.06L.53 7.53L0 7l.53-.53l3.25-3.25a.75.75 0 0 1 1.06 1.06L2.87 6.25h9.88a3.25 3.25 0 0 1 0 6.5h-2a.75.75 0 0 1 0-1.5h2a1.75 1.75 0 1 0 0-3.5H2.87Z" clip-rule="evenodd" />
                                        </svg>


                                    </div>





                                    <img
                                        className="object-cover w-10 h-10 rounded-full"
                                        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                                        alt="username"
                                    />
                                    <span className="block ml-2 font-bold text-gray-600">
                                     {name}
                                    </span>

                                </div>
                                <div className="relative bg-white w-full p-6 overflow-y-auto h-[30rem]"   ref={chatContainerRef}   >
                                    <ul className="space-y-2 flex flex-col ">


                                        {

                                            message.map((m, i) => {

                                                if (m.person === userid) {
                                                    return (

                                                        <li className="flex  justify-end">
                                                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                                                <span className="block">{m.text}</span>
                                                            </div>
                                                        </li>

                                                    );
                                                } else {

                                                    return (

                                                        <li className="flex  justify-start">
                                                            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                                                <span className="block">
                                                                    {m.text}

                                                                </span>
                                                            </div>
                                                        </li>

                                                    );

                                                }


                                            })

                                        }




                                    </ul>
                                </div>

                                <div className="flex bg-slate-50   items-center justify-between w-full p-3 py-3 border-t border-gray-300">
                                    <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            />
                                        </svg>
                                    </button>

                                    <input
                                        type="text"
                                        placeholder="Message"
                                        className="block w-full py-2 pl-4 mx-3 bg-white  border border-slate-300 rounded-full outline-none focus:text-gray-700"
                                        name="message"
                                        value={text}
                                        onChange={(e) => {
                                            setText(e.target.value);
                                        }}
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="hover:scale-125 hover:duration-500"
                                        onClick={(e) => {
                                            return giveText(e);
                                        }}
                                    >
                                        <svg
                                            className="w-5 h-5 text-gray-500 hover:text-gray-800 origin-center transform rotate-90"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messenger;
