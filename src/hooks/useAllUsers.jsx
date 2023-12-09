import { useQuery } from "@tanstack/react-query";


const useAllUsers = () => {
    const {data, isFetching,error,refetch}=useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const data= await fetch('https://real-state-server-side.vercel.app/users')
            return await data.json()
        }
       })
       return {data, isFetching,error,refetch}
};

export default useAllUsers;