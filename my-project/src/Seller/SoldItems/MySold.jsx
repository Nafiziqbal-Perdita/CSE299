import { useNavigate } from "react-router-dom";
import SoldCart from "./SoldCart";
import { useAuth } from "../../FireBase/Authentication/AuthContext";
import { useEffect, useState } from "react";
import soldClass from "./soldClass";
import Adress from "./Adress";

const MySold = () => {
    const navigate = useNavigate();

    const { userid, getCurrentUser } = useAuth();
    const soldclass = new soldClass();

    const [soldData, setSoldData] = useState();
    const [refresh, setRefresh] = useState(false);


    const soldItems = async () => {

        const data = await soldclass.getSoldItemsByCreatorId(userid);
        // console.log(data);
        setSoldData(data);




    }



    const screen = () => {

        setRefresh(!refresh);

    }




    useEffect(() => {

        getCurrentUser();
        soldItems();

    }, [])
    useEffect(() => {



    }, [refresh])





    console.log(userid);
    console.log(soldData);


    return (
        <>
            <div className="  items-center h-screen flex flex-col relative ">



               



                <div className="flex flex-wrap space-y-2  justify-center m-2 p-2 ">

                    {

                        soldData && soldData.map((data) => {



                            return (<SoldCart key={Math.random()} image={data.image} name={data.name} price={data.price} quantity={data.quantity} info={data.buyer_data} id={data.id} sent={data.sent} screen={screen} />);


                        })


                    }

                </div>
            </div>
        </>
    );
};

export default MySold;
