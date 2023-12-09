// useUserBooking.js

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUserBought = () => {
  const { user } = useAuth();

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['userBought', user?.email], // Add user?.email to the queryKey
    queryFn: async () => {
      if (!user?.email) {
        console.error('User email is undefined');
        return null;
      }

      const response = await fetch(`http://localhost:5000/userBought?email=${user.email}`);
      return await response.json();
    },
  });

  return { data, isFetching, error, refetch };
};

export default useUserBought;
