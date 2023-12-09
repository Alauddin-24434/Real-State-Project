import { useQuery } from "@tanstack/react-query";

const useAllProperty = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const responseData = await fetch('http://localhost:5000/houses');
      const result = await responseData.json();

      // Add a condition based on the 'status' field
      const filteredResult = result.filter(property => property.status === 'Verified');

      return filteredResult;
    },
  });

  return { data, isFetching, error };
};

export default useAllProperty;
