import { useEffect, useState } from "react";
import soldClass from "./soldClass";
import Adress from "./Adress";

const SoldCart = ({ image, name, price, quantity, info, id, sent, screen }) => {

    const sold = new soldClass();

    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false);



    const isOpen = () => {

        setOpen(!open);

    }

    const sentProduct = async (e) => {
        e.preventDefault();
        const obj = {
            sent: true
        };
        console.log('enter')

        try {
            await sold.updateDocument(id, obj);
            console.log('success')
            screen();
            setRefresh(!refresh);

        } catch (error) {
            console.error();
        }




    }

    useEffect(() => {

    }, [refresh]);

    return (

        <>



            {open && (<Adress buyer={info} isOpen={isOpen} />
            )}


            <div
                className="  bg-gray-200   h-28 w-5/6 flex items-center justify-between py-2 px-2 rounded-lg shadow-md

        "
            >
                <div className="h-20 p-1 ">
                    <img
                        className="h-full rounded-full"
                        src={image}
                        alt="name"
                    />
                </div>
                <div className="text-lg font-serif font-bold">{name}</div>
                <div className=" w-44 h-16 p-2 flex justify-center items-center ">
                    <label className="text-sm font-mono font-semibold">
                        {price}
                    </label>
                </div>


                <div className="flex flex-col items-center justify-center" >

                    <p className="text-xs" >
                        Number of Itmes:
                    </p>
                    <p className="text-xs" >
                        [kg/piece/hali/dozon]
                    </p>
                    <p>
                        {quantity}
                    </p>

                </div>


                <div className="flex items-center justify-center" >
                    <div className="h-14 hover:scale-90 hover:duration-500 "


                        onClick={(e) => {
                            return sentProduct(e);
                        }}


                    >

                        {
                            sent ? (<svg
                                className="h-full"
                                width="128"
                                height="128"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g
                                    stroke="#22c55e"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                >
                                    <path
                                        fill="#22c55e"

                                        fill-opacity="0"
                                        stroke-dasharray="60"
                                        stroke-dashoffset="60"
                                        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                                    >
                                        <animate
                                            fill="freeze"
                                            attributeName="stroke-dashoffset"
                                            dur="0.5s"
                                            values="60;0"
                                        />
                                        <animate
                                            fill="freeze"
                                            attributeName="fill-opacity"
                                            begin="0.8s"
                                            dur="0.15s"
                                            values="0;0.3"
                                        />
                                    </path>
                                    <path
                                        fill="none"
                                        stroke-dasharray="14"
                                        stroke-dashoffset="14"
                                        d="M8 12L11 15L16 10"
                                    >
                                        <animate
                                            fill="freeze"
                                            attributeName="stroke-dashoffset"
                                            begin="0.6s"
                                            dur="0.2s"
                                            values="14;0"
                                        />
                                    </path>
                                </g>
                            </svg>) : (<svg


                                className="h-full"
                                width="128" height="128" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path stroke-dasharray="60" stroke-dashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
                                    </path>
                                    <path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0" />
                                    </path>
                                </g>
                            </svg>)
                        }


                    </div>

                    <div className="h-10 hover:scale-90 hover:duration-500 "


                        onClick={() => {
                            isOpen();
                        }}


                    >


                        <svg

                            className="h-full"

                            width="128" height="128" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="21" fill="#2196F3" />
                            <path fill="#fff" d="M22 22h4v11h-4z" />
                            <circle cx="24" cy="16.5" r="2.5" fill="#fff" />
                        </svg>



                    </div>
                </div>




            </div>

        </>
    );

}

export default SoldCart;