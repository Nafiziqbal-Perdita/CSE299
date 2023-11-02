import { Carousel } from 'flowbite-react'
import CaroCart from './CaroCart';

const Carousoul = ({ data,buyerId }) => {




    return (

        <>



            <Carousel className='h-3/4 w-1/2 shadow-md '  pauseOnHover  indicators={true}  slideInterval={2000}>


                {

                    data.map((doc) => {


                        return( <CaroCart 
                        
                            key={Math.random()}
                            creator_id={doc.creator_id}
                            desc={doc.description}
                            id={doc.product}
                            price={doc.price}
                            name={doc.product_name}
                            avail={doc.stock}
                            image={doc.image}
                            buyerId={buyerId}
                           
                        
                        />);
                    })

                }


            </Carousel>



        </>
    );

}

export default Carousoul;