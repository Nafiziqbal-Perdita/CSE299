import React, { useEffect, useState } from "react";
import { auth } from "../FireBase/FireComp";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    getDoc,
} from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const MyAccount = () => {
    const location = useLocation();

    const { userid, mail } = location.state;

    const navigate = useNavigate();

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        number: "",
        cuAd: "",
        peAd: "",
        birth: "",
        description: "",
    });

    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);


    const { getCurrentUser } = useAuth();

    const findUserByUid = async () => {
        if (userid) {
            const db = getFirestore();

            const usersCollection = doc(db, "users", userid);
            console.log(userid);

            // Use the getDoc function to fetch the document
            getDoc(usersCollection)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const documentData = docSnapshot.data();
                        // console.log("Document data:", documentData);

                        setUser((prevUser) => ({
                            ...prevUser,
                            first_name: documentData.first_name || prevUser.first_name,
                            last_name: documentData.last_name || prevUser.last_name,
                            gender: documentData.gender || prevUser.gender,
                            number: documentData.number || prevUser.number,
                            cuAd: documentData.cuAd || prevUser.cuAd,
                            peAd: documentData.peAd || prevUser.peAd,
                            birth: documentData.birth || prevUser.birth,
                            description: documentData.description || prevUser.description,
                        }));
                    } else {
                        console.log("Document does not exist.");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                });
        } else {
            // Handle the case where the user is not authenticated
            console.error("User is not authenticated");
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        setUpdate(true);
        const db = getFirestore();
        const userRef = doc(db, "users", userid);

        try {
            await updateDoc(userRef, user);
            console.error("Successfully updating user data:");
            showMessageFor5Seconds("Successfully updating user data");
            setShowMessage(true);



        } catch (error) {
            console.error("Error updating user data:", error);
            showMessageFor5Seconds("Error updating user data");
            setShowMessage(true);
        }
        setUpdate(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getCurrentUser();
            await findUserByUid();
        };

        fetchData();
    }, []);





    const showMessageFor5Seconds = (m) => {
        setMessage(m);
        setShowMessage(true);
    };


    useEffect(() => {
        if (showMessage) {
            // Display the message for 5 seconds
            const timeout = setTimeout(() => {
                setShowMessage(false);
            }, 5000);

            return () => {
                // Clear the timeout when the component unmounts or when showMessage changes
                clearTimeout(timeout);
            };
        }
    }, [showMessage]);






    console.log(user);
    return (
        <>
            <div>
                <div className="bg-gray-100 m-1 p-2 rounded-lg shadow-md flex items-center space-x-2 ">
                    <svg
                        className=" hover:scale-75 duration-500 "
                        onClick={() => {
                            navigate("/Wrap");
                        }}
                        width="48"
                        height="48"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#0ea5e9"
                            d="M19 7v6c0 1.103-.896 2-2 2H3v-3h13V8H5v2L1 6.5L5 3v2h12a2 2 0 0 1 2 2z"
                        />
                    </svg>
                    <label className=" font-sherif text-lg ">back to Home</label>
                </div>

                {/* // now the details page  */}

                <div class="bg-gray-100">
                    <div class="container  mx-auto my-5 p-5">
                        <div class="md:flex no-wrap md:-mx-2 ">
                            {/* <!-- Left Side --> */}
                            <div class="w-full md:w-3/12 md:mx-2">
                                {/* <!-- Profile Card --> */}
                                <div class="bg-white  p-3 border-t-4 shadow-md border-green-400">
                                    <div class="flex items-center justify-center overflow-hidden">
                                        <svg
                                            width="128"
                                            height="128"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill="#0ea5e9"
                                                fill-rule="evenodd"
                                                d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4Zm7.943 14.076A9.959 9.959 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.958 9.958 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22a9.947 9.947 0 0 0 5.675-1.765a10.055 10.055 0 0 0 1.918-1.728l.355-.413l-.005-.018ZM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                                        <p>
                                            {user.first_name} {user.last_name}
                                        </p>
                                    </h1>
                                    <h3 class="text-gray-600 font-lg text-semibold leading-6">
                                        Owner at Own Company Inc.
                                    </h3>
                                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                        {edit ? (
                                            <textarea
                                                className="  h-36 w-full"
                                                value={user.description}
                                                onChange={(e) => {
                                                    setUser({ ...user, description: e.target.value });
                                                }}
                                            />
                                        ) : (
                                            <p>{user.description}</p>
                                        )}
                                    </p>
                                    <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        <li class="flex items-center py-3">
                                            <span>Status</span>
                                            <span class="ml-auto">
                                                <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                                                    Active
                                                </span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- End of profile card --> */}
                            </div>
                            {/* <!-- Right Side --> */}
                            <div class="w-full  md:w-9/12 mx-2 h-64">
                                {/* <!-- Profile tab -->
                <!-- About Section --> */}
                                <div class="bg-white p-3 shadow-sm rounded-sm">
                                    {/* this is about section  */}
                                    <div class="flex items-center justify-between space-x-2 font-semibold text-gray-900 leading-8">
                                        <div className="flex items-center justify-center space-x-3">
                                            <span class="text-green-500">
                                                <svg
                                                    class="h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </span>
                                            <span class="tracking-wide">About</span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-5">
                                            <button
                                                className="h-10 w-10 hover:scale-75 hover:duration-500"
                                                onClick={() => {
                                                    setEdit(!edit);
                                                }}
                                            >
                                                <svg
                                                    className="h-full w-full"
                                                    width="48"
                                                    height="48"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g fill="none">
                                                        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                                                        <path
                                                            fill={`${edit ? "#22c55e" : "#3b82f6"}`}
                                                            d="M15 3c1.296 0 2.496.41 3.477 1.11l-9.134 9.133a1 1 0 1 0 1.414 1.414l9.134-9.134A5.977 5.977 0 0 1 21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10Zm6.657-.657a1 1 0 0 1 0 1.414L19.89 5.523a6.035 6.035 0 0 0-1.414-1.414l1.766-1.766a1 1 0 0 1 1.414 0Z"
                                                        />
                                                    </g>
                                                </svg>
                                            </button>
                                            <button
                                                className="bg-green-400 text-slate-50 m-1 py-1 px-3 rounded-lg shadow-sm hover:scale-75 hover:duration-500 hover:bg-green-600"
                                                onClick={(e) => {
                                                    updateUser(e);
                                                }}
                                            >
                                                {update ? "loading" : <span>Update</span>}
                                            </button>
                                        </div>
                                    </div>
                                    {/* // this is details sectoin */}
                                    <div>
                                        <hr />
                                    </div>
                                    <div className="">
                                        <div class="text-gray-700 relative   ">


                                            {showMessage ? (

                                                <div className="bg-slate-50 flex items-center justify-center "  >
                                                    <p className="bg-white py-1 px-2 m-2 rounded-md shadow-lg text-sm font-serif  " >
                                                        Succesfully Updated Account
                                                    </p>
                                                </div>

                                            ) : ""}

                                            <div class=" flex flex-col space-y-2">
                                                <div class="grid grid-cols-2 items-center  ">
                                                    <div class="px-4 py-2 font-semibold">First Name</div>
                                                    <div class="px-4 py-2 flex items-center justify-center   ">
                                                        <input
                                                            className={`p-1  rounded-xl ${edit ? "border" : ""
                                                                } `}
                                                            type="text"
                                                            placeholder="Enter First Name"
                                                            value={user.first_name}
                                                            onChange={(e) => {
                                                                if (!edit) return;
                                                                setUser({
                                                                    ...user,
                                                                    first_name: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2 items-center  ">
                                                    <div class="px-4 py-2 font-semibold">Last Name</div>
                                                    <div class="px-4 py-2 flex items-center justify-center   ">
                                                        <input
                                                            className={`p-1  rounded-xl ${edit ? "border" : ""
                                                                } `}
                                                            type="text"
                                                            placeholder="Type Here"
                                                            value={user.last_name}
                                                            onChange={(e) => {
                                                                if (!edit) return;
                                                             
                                                                setUser({ ...user, last_name: e.target.value });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2 items-center  ">
                                                    <div class="px-4 py-2 font-semibold">Gender</div>
                                                    <div class="px-4 py-2 flex items-center justify-center   ">
                                                        <input
                                                            className={`p-1  rounded-xl ${edit ? "border" : ""
                                                                } `}
                                                            type="text"
                                                            placeholder="Ex. Male "
                                                            value={user.gender}
                                                            onChange={(e) => {
                                                                if (!edit) return;
                                                                setUser({ ...user, gender: e.target.value });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2 items-center  ">
                                                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                                                    <div class="px-4 py-2 flex items-center justify-center   ">
                                                        <input
                                                            className={`p-1  rounded-xl ${edit ? "border" : ""
                                                                } `}
                                                            type="text"
                                                            placeholder="+88"
                                                            value={user.number}
                                                            onChange={(e) => {
                                                                if (!edit) return;
                                                                setUser({ ...user, number: e.target.value });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2 items-center  ">
                                                    <div class="px-4 py-2 font-semibold">
                                                        Current Adress
                                                    </div>
                                                    <div class="px-4 py-2 flex items-center justify-center   ">
                                                        <input
                                                            className={`p-1  rounded-xl ${edit ? "border" : ""
                                                                } `}
                                                            type="text"
                                                            placeholder=" Ex. Kuril,Dhaka   "
                                                            value={user.cuAd}
                                                            onChange={(e) => {
                                                                if (!edit) return;
                                                                setUser({ ...user, cuAd: e.target.value });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2 items-center  ">
                                                    <div class="px-4 py-2 font-semibold">
                                                        Permanent Adress
                                                    </div>
                                                    <div class="px-4 py-2 flex items-center justify-center   ">
                                                        <input
                                                            className={`p-1  rounded-xl ${edit ? "border" : ""
                                                                } `}
                                                            type="text"
                                                            placeholder=" Ex. Kuril,Dhaka   "
                                                            value={user.peAd}
                                                            onChange={(e) => {
                                                                if (!edit) return;
                                                                setUser({ ...user, peAd: e.target.value });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2 items-center  ">
                                                    <div class="px-4 py-2 font-semibold">Email</div>
                                                    <div class="px-4 py-2 flex items-center justify-center   ">
                                                        <input
                                                            className="p-1  rounded-xl border"
                                                            type="text"
                                                            value={mail}
                                                            placeholder=" Ex. farm@gmail.com  "
                                                        />
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2 items-center  ">
                                                    <div class="px-4 py-2 font-semibold">Birthday</div>
                                                    <div class="px-4 py-2 flex items-center justify-center   ">
                                                        <input
                                                            className={`p-1  rounded-xl ${edit ? "border" : ""
                                                                } `}
                                                            type="text"
                                                            placeholder=" Ex. Feb 06, 1998 "
                                                            value={user.birth}
                                                            onChange={(e) => {
                                                                if (!edit) return;
                                                                setUser({ ...user, birth: e.target.value });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyAccount;
