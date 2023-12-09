/* eslint-disable react/prop-types */
// -----agent all info------
import { MdEmail } from "react-icons/md";
import { PiIdentificationBadgeThin } from "react-icons/pi";
const AgentInfo = ({ agentInfo }) => {
    console.log("iamge", agentInfo)
    return (
       
              
            <div className="flex items-center  gap-4">
             
                {/* agent image */}
                <img className='h-12 w-12 rounded-lg' alt='Avatar' src={agentInfo?.agent?.image} />
                {/* agent name */}
                <div className="text-sm px-2">
                    <p className="flex items-center gap-2"><PiIdentificationBadgeThin />{agentInfo?.agent?.name}</p>
                 
                    <p className="flex items-center gap-2"><MdEmail />{agentInfo?.agent.email}</p>
                </div>
            </div>
      
    );
};

export default AgentInfo;