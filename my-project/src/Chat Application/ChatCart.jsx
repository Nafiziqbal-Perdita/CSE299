import { useNavigate } from "react-router-dom";

const ChatCart = ({ time, name, roomId, message }) => {
  // Firestore Timestamp value
  const timestamp = time;

  // Convert Firestore Timestamp to a JavaScript Date object
  const date = new Date(timestamp.seconds * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Format the date and time
  const formattedDate = date.toLocaleString(); // Adjust the format as needed

  console.log(formattedDate); // Output: A human-readable date and time string

  console.log(roomId);

  const navigate = useNavigate();

  const goToMessenger = () => {
    navigate("/chat", {
      state: {
        roomId,
        name,
      },
    });
  };

  return (
    <>
      <div
        onClick={() => {
          return goToMessenger();
        }}
        className="bg-slate-100 shadow-md  py-2 px-4 m-2 rounded-lg flex items-center justify-between "
      >
        <div className="h-16  rounded-full  ">
          <svg
            className="h-full w-14  rounded-full border border-white"
            width="128"
            height="128"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none">
              <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
              <path
                fill="#10b981"
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.95 9.95 0 0 1-5.168-1.438l-3.032.892A1.01 1.01 0 0 1 2.546 20.2l.892-3.032A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2Zm-3.5 8.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Zm7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z"
              />
            </g>
          </svg>
        </div>

        <div>
          <div>
            <span
              className={`text-lg font-mono  ${
                message ? "font-extrabold" : "font-extralight"
              }  `}
            >
              {name}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div>
            <span
              className={`text-sm font-mono  ${
                message ? "font-extrabold" : "font-extralight"
              }  `}
            >
              {formattedDate}
            </span>
          </div>

          <div className="h-6">
            <svg
              className="h-full"
              width="128"
              height="128"
              viewBox="-2 -2 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill={`#${message ? "ef4444" : "22c55e"} `}
                d="M3 .565h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6.958l-6.444 4.808A1 1 0 0 1 2 18.57v-4.006a2 2 0 0 1-2-2v-9a3 3 0 0 1 3-3z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCart;
