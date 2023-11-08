import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import checkoutClass from "./checkoutClass";
import { auth } from "../../FireBase/FireComp";
import CartManager from "../CartManager";
import { serverTimestamp } from "firebase/database";

const CheckOut = () => {
  const location = useLocation();
  const { data, totalPrice } = location.state;
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const checkOut = new checkoutClass();
  //states
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    address: "",
    zilla: "",
    postCode: "",
  });

  console.log("the items", data);
  console.log("user data", userData);

  const cart = new CartManager();

  const removeFromCart = async () => {
    data.map(async (e) => {
      await cart.deleteFromCart(e.key);
      console.log("deleted");
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (userData.fullName == "") return;
    if (userData.email == "") return;
    if (userData.address == "") return;
    if (userData.zilla == "") return;
    if (userData.postCode == "") return;

    setLoading(true);

    try {
      await uploadItem(); // Make sure to await this function if it contains async operations
      console.log("Item sold");
    } catch (error) {
      setLoading(false);
      console.log("Item Not Sold");
      console.log(error);
      return;
    }

    setLoading(false);

    sendMail();
    removeFromCart();

    console.log("navigate buyer");
    navigate("/Buyer");
  };

  const sendMail = async () => {
    try {
      await checkOut.sendEmail(userData, data.length, totalPrice);

      console.log("Email Send");
    } catch (error) {
      console.log("Email Not Send", error);
    }
  };

  const uploadItem = async () => {
    const newProductArray = data.map(async (e) => {
      const ob = {
        product_id: e.product_id,
        name: e.product_name,
        price: e.product_price,
        quantity: e.quantity,
        image: e.product_image,
        creator_id: e.creator_id,
        buyer_data: [userData],
        createdAt: serverTimestamp(),
      };

      console.log(ob); // Log the object

      await send(ob);
      return ob; // Return the object
    });
  };

  const send = async (ob) => {
    try {
      await checkOut.setCartPend(ob);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Far To Farm
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white"
                  href="#"
                ></a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* main body  */}

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>

          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {data.map((d) => {
              return (
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <div className="h-24 w-32">
                    <img
                      className="m-2 h-full w-full rounded-md border "
                      src={d.product_image}
                      alt=""
                    />
                  </div>

                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold"> {d.product_name} </span>
                    {/* <span className="float-right text-gray-400">42EU - 8.5US</span> */}
                    <p className="text-lg font-bold"> {d.product_price} </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <div>
            <hr />
          </div>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-blue-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Redex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label for="email" className="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              for="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Your Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
                value={userData.fullName}
                onChange={(e) => {
                  setUserData({ ...userData, fullName: e.target.value });
                }}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              for="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Adress
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Adress Details"
                  value={userData.address}
                  onChange={(e) => {
                    setUserData({ ...userData, address: e.target.value });
                  }}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
              </div>
              <input
                type="text"
                name="credit-expiry"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder=" Zilla "
                value={userData.zilla}
                onChange={(e) => {
                  setUserData({ ...userData, zilla: e.target.value });
                }}
              />
              <input
                type="text"
                name="credit-cvc"
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Postal Code"
                value={userData.postCode}
                onChange={(e) => {
                  setUserData({ ...userData, postCode: e.target.value });
                }}
              />
            </div>

            {/* <!-- Total --> */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  {totalPrice} Taka{" "}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900"> 80 Taka </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {" "}
                {totalPrice + 80}Taka{" "}
              </p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-blue-900 px-6 py-3 font-medium text-white hover:bg-blue-500 hover:scale-95 hover:duration-500 flex items-center justify-center "
            onClick={(e) => {
              return placeOrder(e);
            }}
          >
            {loading ? (
              <>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#ffffff"
                    stroke-dasharray="15"
                    stroke-dashoffset="15"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M12 3C16.9706 3 21 7.02944 21 12"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.3s"
                      values="15;0"
                    />
                    <animateTransform
                      attributeName="transform"
                      dur="1.5s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;360 12 12"
                    />
                  </path>
                </svg>
              </>
            ) : (
              " Place Order"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
