import { useQuery } from "@tanstack/react-query";


const useAllUsers = () => {
    const {data, isFetching,error,refetch}=useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const data= await fetch('http://localhost:5000/users')
            return await data.json()
        }
       })
       return {data, isFetching,error,refetch}
};

export default useAllUsers;