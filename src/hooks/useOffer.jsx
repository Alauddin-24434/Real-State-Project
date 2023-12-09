import { useQuery } from "@tanstack/react-query";


const useOffers = () => {
    const {data, isFetching,error,refetch}=useQuery({
        queryKey:['offers'],
        queryFn: async ()=>{
            const data= await fetch('http://localhost:5000/offers')
            return await data.json()
        }
       })
       return {data, isFetching,error,refetch}
};

export default useOffers;

