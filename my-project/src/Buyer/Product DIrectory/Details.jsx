import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartManager from "../CartManager";

import backIcon from "../../assets/back.png";

import MainComment from "../../Comment/MainComment";
import chatClass from "../../Chat Application/chatClass";
import { serverTimestamp } from "firebase/firestore";

const Details = () => {
  const navigate = useNavigate();
  const chat = new chatClass();

  const [tooltip, setTooltip] = useState(false);
  const [send, setSend] = useState(false);

  const location = useLocation();
  const { id, name, price, desc, creator_id, avail, buyerId, image } =
    location.state;

  const cartManager = new CartManager();

  const handleClick = async () => {
    console.log("Entered");
    if (!avail) {
      return;
    }

    const newCart = {
      creator_id: creator_id,
      product_id: id,
      product_name: name,
      product_image: image,
      product_price: price,
      product_desc: desc,
      buyer_id: buyerId,
      inStock: avail,
      quantity: 1,
    };

    await cartManager.addToCart(newCart, buyerId);
    // console.log("Cart added in the data base");

    navigate("/Buyer");
  };
  console.log(image);

  const createRoom = async (e) => {
    e.preventDefault();
    console.log("enter");

    const fromName = await chat.findUserByUid(creator_id);
    const toName = await chat.findUserByUid(buyerId);

    console.log(fromName);
    console.log(toName);

    try {
      const data = {
        from: creator_id,
        fromCount: true,
        fromName,
        to: buyerId,
        toName,
        toCount: false,
        lastTime: serverTimestamp(),
      };

      setSend(true);
      await chat.createRoomForChat(id, data);

      console.log("sucessful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen bg-slate-50">
        <div className="bg-gray-100 m-1 p-2 rounded-lg shadow-md flex items-center space-x-2 ">
          <img
            src={backIcon}
            alt=""
            className="h-10 hover:scale-90 hover:duration-300"
            onClick={() => {
              navigate("/Buyer");
            }}
          />
          <label className=" font-sherif text-lg ">back to Home</label>
        </div>

        <div className="bg-white m-10 h-2/3 shadow-md shadow-teal-100 flex items-center justify-between ">
          {/* left bar */}

          <div className=" h-full w-1/2 m-5 p-10 flex items-center justify-center  ">
            <div className=" rounded-lg bg-gray-100 shadow-sm h-3/4 w-3/4    ">
              <img
                className="h-full w-full rounded-md p-2 border-b border-blue-200"
                src={image}
                alt={name}
              />
            </div>
          </div>

          {/* right bar */}
          <div className=" h-full w-1/2  flex flex-col items-start justify-center space-y-5     ">
            <div className="bg-slate-50 m-1 p-1 text-sm text-slate-500 rounded-sm">
              <p>
                Want to know more ?
                <label
                  className="text-lg text-green-600 font-serif font-semibold hover:text-red-500"
                  onClick={(e) => {
                    return createRoom(e);
                  }}
                >
                  {send ? "Sent" : "Send"}
                </label>{" "}
                Message to the owner.
              </p>
            </div>

            <div className="bg-blue-100 py-1 px-3 w-full rounded-lg ">
              <span className=" text-3xl font-serif font-bold  ">{name}</span>
            </div>

            <div className="bg-blue-50 py-1 px-3 w-full rounded-lg ">
              <span className=" text-lg font-mono font-bold  ">{price}</span>
            </div>

            <div className="bg-slate-100 py-1 px-3 w-full whitespace-normal rounded-lg">
              <p className="text-lg font-mono font-bold whitespace-normal">
                {desc}
              </p>
            </div>

            <div
              className="py-1 px-1 h-14 hover:bg-slate-100 rounded-full relative "
              onMouseEnter={() => {
                setTooltip(true);
              }}
              onMouseLeave={() => {
                setTooltip(false);
              }}
              onClick={handleClick}
            >
              <div>
                <label
                  className={`${
                    tooltip ? "absolute" : "hidden"
                  } text-xs bottom-0 left-4 mt-1  font-serif font-medium text-slate-500`}
                >
                  {" "}
                  Add in Cart{" "}
                </label>
              </div>

              <svg
                className=" hover:scale-75 hover:duration-500  "
                width="80"
                height="38"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" stroke="#8b5cf6" stroke-width="1.5">
                  <path d="m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4" />
                  <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 13v4m8-4v4m-4-4v4"
                  />
                  <path
                    stroke-linecap="round"
                    d="M3.864 16.455c.546 2.183.819 3.274 1.632 3.91C6.31 21 7.435 21 9.685 21h4.63c2.25 0 3.375 0 4.19-.635c.813-.636 1.086-1.727 1.631-3.91c.858-3.432 1.287-5.147.387-6.301C19.622 9 17.852 9 14.316 9H9.684c-3.538 0-5.306 0-6.207 1.154c-.529.677-.6 1.548-.394 2.846"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        <div className="m-8 pb-3 pt-1 pl-1 pr-1 bg-slate-100">
          <MainComment product_id={id} />
        </div>
      </div>
    </>
  );
};

export default Details;
