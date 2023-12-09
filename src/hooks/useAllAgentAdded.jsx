import { useQuery } from "@tanstack/react-query";

// hooks----
const useAllAgentAdded = () => {
    const {data, isFetching,error,refetch}=useQuery({
        queryKey:['houses'],
        queryFn: async ()=>{
            const data= await fetch('https://real-state-server-side.vercel.app/houses')
            return await data.json()
        }
       })
       return {data, isFetching,error,refetch}
};

export default useAllAgentAdded;

