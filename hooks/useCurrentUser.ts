import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// We are using swr to fetch the data, using swr and the this hook we don't have to fetch data again. Because of this we don't
// have to use redux or other state management functionality.

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
