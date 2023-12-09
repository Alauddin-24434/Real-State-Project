import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

// hooks
const useOwnAgentADData = () => {
    const {user}=useAuth()
    const {data,isLoading, isFetching,error,refetch}=useQuery({
        queryKey:['agentHouses'],
        queryFn: async ()=>{
            const data= await fetch(`http://localhost:5000/agentHouses/${user?.email}`)
            return await data.json()
        }
       })
       return {data,isLoading, isFetching,error,refetch}
};

export default useOwnAgentADData;

