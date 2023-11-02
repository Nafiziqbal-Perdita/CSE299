const Adress = ({ buyer, isOpen }) => {




    return (

        <>



            <div className="  absolute bg-transparent  h-screen w-screen  flex items-top justify-center   "  >




                <div className="bg-gray-100 rounded-md shadow-md h-fit w-1/2 text-lg font-serif font-semibold"  >


                    <div className="m-5 p-3 h-20  flex items-center"

                        onClick={() => isOpen()}

                    >
                        <svg

                            className="h-full w-full hover:border hover:rounded-full hover:scale-95 hover:duration-700 hover:bg-slate-200"

                            width="128" height="128" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ef4444" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27Z" />
                        </svg>
                    </div>


                    <div className="m-5 p-3 flex items-center">

                        <label >Name:  {buyer[0].fullName.toUpperCase()} </label>


                    </div>
                    <div className="m-5 p-3 flex items-center">

                        <label >Email:   {buyer[0].email.toLowerCase()}  </label>

                    </div>
                    <div className="m-5 p-3 flex space-x-5 items-center">

                        <label >Address:  {buyer[0].address.toLowerCase()}</label>
                        <label >Zilla:  {buyer[0].zilla.toLowerCase()}</label>

                    </div>


                    <div className="m-5 p-3 flex space-x-5 items-center">

                        <label >PostCode:  {buyer[0].postCode.toLowerCase()}</label>

                    </div>



                </div>




            </div>


        </>
    );

}

export default Adress;