/* eslint-disable react/prop-types */
import { FaBed, FaBath, FaLocationDot, FaVectorSquare } from "react-icons/fa6";
import AgentInfo from "../AgentInfo/AgentInfo";
const PropertyInfo = ({ info }) => {
  return (
   
      <div className='flex flex-row justify-between gap-2'>
        <div className="flex items-center gap-2">
          <FaLocationDot />{info?.location}
        </div>
       
        <div className='
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              '
        >

          <div className="flex items-center gap-2"><FaBed />{info?.bedrooms} rooms</div>
          <div className="flex items-center gap-2"><FaBath />{info?.bathrooms} bathrooms</div>
          <div className="flex items-center gap-2">< FaVectorSquare />{info?.sqfit} sqfit</div>
        </div>
        <AgentInfo agentInfo={info} />
      </div>
    
     


 
     

  );
};

export default PropertyInfo;