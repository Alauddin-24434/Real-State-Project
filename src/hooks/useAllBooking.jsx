import { useQuery } from "@tanstack/react-query";


const useAllBooking = () => {
    const {data, isFetching,error,refetch}=useQuery({
        queryKey:['allBooking'],
        queryFn: async ()=>{
            const data= await fetch('https://real-state-server-side.vercel.app/allBooking')
            return await data.json()
        }
       })
       return {data, isFetching,error,refetch}
};

export default useAllBooking;

