import { useNavigate } from "react-router-dom";
import EditIcon from '../assets/edit.png';
import DeleteIcon from '../assets/delete.png';

const ProductCart = ({
  image,
  name,
  price,
  stock,
  product_id,
  userid,
  detail,
  category,
  deleteEvent,
}) => {

  const navigate = useNavigate();



  const handleEditClick = () => {
    // Define the route to the edit component and pass data as route parameters
    navigate(`/EditPost`, {
      state: {
        image,
        name,
        price,
        stock,
        product_id,
        userid,
        detail,
        category
      },
    });
  };






  return (
    <>
      <div
        className={`m-4 p-2 rounded-xl shadow-md hover:scale-95 hover:duration-500 bg-white h-72 w-52 flex flex-col justify-evenly border-t-2 ${stock ? "border-green-500" : "border-red-400"
          } hover:cursor-progress `}


      >
        <div className=" h-2/3 overflow-hidden">
          <img className="h-full" src={image} alt={name} />
        </div>

        <div className="mt-2 bg-slate-50 rounded-sm ">
          <label> {name} </label>
        </div>

        <div className="mt-2 bg-slate-50 rounded-sm ">
          <label> {price} </label>
        </div>

        <div className=" m-2 p-1 flex justify-between ">

          <button className="h-10  hover:scale-125 hover:duration-500  " onClick={handleEditClick} >


            <img className="h-full" src={EditIcon} alt="Edit" />


          </button>
          <button className="h-10 hover:scale-125 hover:duration-500"
          
          onClick={() => {
            return deleteEvent(product_id);
          }}
          
          
          >

            <img className="h-full" src={DeleteIcon} alt="Edit" />




          </button>


        </div>


      </div>
    </>
  );
};

export default ProductCart;
