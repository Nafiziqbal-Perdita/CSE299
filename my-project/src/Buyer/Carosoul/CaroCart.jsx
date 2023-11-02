import { useNavigate } from "react-router-dom";

const CaroCart = ({ id,
    name,
    price,
    desc,
    creator_id,
    avail,
    image,
    buyerId, }) => {

    const navigate = useNavigate();

    return (

        <>


            <div className="rounded-md bg-slate-200 h-full w-full   flex items-center justify-evenly  "


                onClick={() => {

                    navigate("/Details", {
                        state: {
                            id,
                            name,
                            price,
                            desc,
                            creator_id,
                            avail,
                            buyerId,
                            image,
                        },
                    });



                }}



            >


                <div className="h-28 w-28  rounded-full p-1 border "  >




                    <img className="h-full w-full rounded-full" src={image} alt="product" />




                </div>

                <div className="text-lg font-serif font-semibold"  >
                    {name}
                </div>
                <div className="text-lg font-serif font-medium" >
                    {price}
                </div>








            </div>


        </>
    );

}

export default CaroCart;