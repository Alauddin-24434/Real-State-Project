
import CardAdvertise from "./CardAdvertise";
import Container from "../Shared/Container";
import useAllProperty from "../../hooks/useAllProperty";


const Advertisement = () => {

    const { data,error } = useAllProperty()
    
    console.log("'Warning' property can not fetch",error?.message)

    return (
        <Container>
            <h2 className="py-4 text-3xl ">Advertisement</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {
                    data?.map(card =>

                        <CardAdvertise
                            key={card._id}
                            card={card}
                        />)
                }

            </div>
        </Container>
    );
};

export default Advertisement;