import account from "../assets/account.svg";
import logout from "../assets/logout.svg";
import cartPic from "../assets/cart.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../FireBase/FireComp";

const BuyerBar = ({ logOut, cart }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-slate-100 h-14 m-1 p-1 rounded-xl flex items-center justify-between shadow-md ">
        <div className=" flex items-center justify-center p-5 rounded-lg space-x-5 ">
          <div>Logo</div>
          <div className="px-2 py-1 rounded-md  text-lg font-serif font-extrabold text text-gray-700">
            Far To Farm
          </div>
        </div>

        <div className="py-1 px-2 text-base font-serif font-semibold flex justify-evenly items-center space-x-2">
          <ul className=" h-12 w-12 bg-white rounded-full">
            <svg
              className="h-full w-full p-1 "
              width="100"
              height="100"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#0ea5e9"
                d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
              />
            </svg>
          </ul>

          <ul className=" h-14" onClick={cart}>
            <img className="h-full p-2" src={cartPic} alt="" />
          </ul>

          <div
            className="h-10 w-10"
            onClick={() => {
              navigate("/chatRoom");
            }}
          >
            <svg
              className="h-full w-full p-1"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#0ea5e9"
                d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1zm6 5H7c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm4-6H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"
              />
            </svg>
          </div>
        </div>

        <div className="flex space-x-4 p-2 justify-center items-center">
          <div
            className="h-10 hover:scale-90 hover:duration-500"
            onClick={() => {
              navigate("/account", {
                state: {
                  userid: auth.currentUser.uid,
                  mail: auth.currentUser.email,
                },
              });
            }}
          >
            <img className="h-full" src={account} alt="Account" />
          </div>

          <div
            className="h-8 hover:scale-90 hover:duration-500"
            onClick={logOut}
          >
            <img className="h-full" src={logout} alt="Logout" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerBar;
