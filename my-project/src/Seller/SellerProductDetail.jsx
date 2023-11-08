import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";
const SellerProductDetail = () => {
  const location = useLocation();

  const { name, image, price, description, stock } = location.state;

  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen bg-slate-50">
        <div className="bg-gray-100 m-1 p-2 rounded-lg shadow-md flex items-center space-x-2 ">
          <img
            src={backIcon}
            alt=""
            className="h-10 hover:scale-90 hover:duration-300"
            onClick={() => {
              navigate("/Seller");
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
            <div className="bg-blue-100 py-1 px-3 w-full rounded-lg ">
              <span className=" text-3xl font-serif font-bold  ">{name}</span>
            </div>

            <div className="bg-blue-50 py-1 px-3 w-full rounded-lg ">
              <span className=" text-lg font-mono font-bold  ">{price}</span>
            </div>

            <div className="bg-slate-100 py-1 px-3 w-full whitespace-normal rounded-lg">
              <p className="text-lg font-mono font-bold whitespace-normal">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProductDetail;
