import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllPublications = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["allPublications"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (token) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_GROUPO}/publications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      }
    },
  });
};
