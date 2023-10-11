import { useNavigate } from "react-router-dom";

const ProductCart = ({
  image,
  name,
  price,
  stock,
  product_id,
  userid,
  detail,
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
      },
    });
  };






  return (
    <>
      <div className="bg-white h-72 w-52 m-4 p-2 flex flex-col justify-evenly  rounded-lg shadow-md ">
        <div className="bg-gray-50 flex justify-center items-center  ">
          <img className="h-20 p-1 rounded-full" src={image} alt={name} />
        </div>
        <div className="bg-gray-50">
          <label>Name: {name} </label>
        </div>
        <div className="bg-gray-50">
          <label>Price: {price} {product_id}  </label>
        </div>
        <div className="bg-gray-50">
          <label>Stock: {stock ? "True" : "False"} </label>
        </div>

        <div className="bg-slate-200 flex justify-evenly">
          <button
            className="bg-blue-400 px-3 m-1 rounded-lg text-yellow-50 font-semibold"

            onClick={handleEditClick}


          >
            Edit
          </button>
          <button
            className="bg-red-400 px-3 m-1 rounded-lg text-yellow-50 font-semibold"
            onClick={() => {
              return deleteEvent(product_id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCart;
