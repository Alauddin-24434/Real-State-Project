import { useQuery } from "@tanstack/react-query";

// hooks----
const useAllAgentAdded = () => {
    const {data, isFetching,error,refetch}=useQuery({
        queryKey:['houses'],
        queryFn: async ()=>{
            const data= await fetch('http://localhost:5000/houses')
            return await data.json()
        }
       })
       return {data, isFetching,error,refetch}
};

export default useAllAgentAdded;

