import { useQuery } from "@tanstack/react-query";


const useAllReviews = () => {
    const {data, isFetching,error,refetch}=useQuery({
        queryKey:['reviews'],
        queryFn: async ()=>{
            const data= await fetch('http://localhost:5000/reviews')
            return await data.json()
        }
       })
       return {data, isFetching,error,refetch}
};

export default useAllReviews;

