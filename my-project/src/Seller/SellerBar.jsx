import { useNavigate } from "react-router-dom";
import { auth } from "../FireBase/FireComp";
import account from "../assets/account.svg";
import logout from "../assets/logout.svg";

const SellerBar = ({ currentPage, changePage, LogOut }) => {

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

        <div className="py-1 px-2 text-base font-serif font-semibold flex justify-evenly items-center space-x-4">
          <ul
            className={
              currentPage === "home" ? "text-blue-500" : "text-gray-500"
            }
            onClick={() => {
              return changePage("home");
            }}
          >
            Home
          </ul>

          <ul
            className={
              currentPage === "myProduct" ? "text-blue-500" : "text-gray-500"
            }
            onClick={() => {
              return changePage("myProduct");
            }}
          >
            My Product
          </ul>
          <ul
            className={
              currentPage === "createPost" ? "text-blue-500" : "text-gray-500"
            }
            onClick={() => {
              return changePage("createPost");
            }}
          >
            Create Post
          </ul>


          <ul
            className={
              currentPage === "chatRoom" ? "text-blue-500" : "text-gray-500"
            }
            onClick={() => {
              return changePage("chatRoom");
            }}
          >
            Chat
          </ul>


        </div>

        <div className="flex space-x-4 p-2 justify-center items-center">
          <div className="h-10 hover:scale-90 hover:duration-500"

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
            onClick={LogOut}
          >
            <img className="h-full" src={logout} alt="Logout" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerBar;
