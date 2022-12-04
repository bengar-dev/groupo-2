import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUser = (userid?: string) => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["user"],
    refetchOnWindowFocus: false,
    queryFn: async (data: any) => {
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_GROUPO}/users/${userid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
      }
    },
    onSuccess: () => {},
    onError: () => {
      console.log("err");
    },
  });
};
