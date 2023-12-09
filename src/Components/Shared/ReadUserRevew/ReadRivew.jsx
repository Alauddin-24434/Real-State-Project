/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import RevewCard from "./RevewCard";
import useAllReviews from "../../../hooks/useAllReviews";


const ReadRivew = ({ property }) => {
    const { data } = useAllReviews()
    console.log(data)
    // const { user } = useAuth()
    const [revew, setRevew] = useState([])
    useEffect(() => {

        const filtered = data?.filter(fil => fil?.title === property?.title)
        console.log(filtered)
        setRevew(filtered)

    }, [data])
    return (
        <div className="py-8">
            <h2 className="text-3xl ">Ratings & Reviews</h2>
            <div className="flex flex-col border ">
                {
                    revew?.map(data => <RevewCard key={data?._id} card={data} />)
                }

            </div>
        </div>
    );
};

export default ReadRivew;