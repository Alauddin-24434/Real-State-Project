/* eslint-disable react/prop-types */


const RevewCard = ({ card }) => {
   
   
    return (
        <div className=" w-full p-4">
           
                <div className="flex items-center gap-2">

                 
                    <div className="text-lg font-bold text-indigo-800">{card?.reviewUser?.name}</div>
                </div>
                <p>{card?.reviewText}</p>
            
            
        </div>
    );
};

export default RevewCard;