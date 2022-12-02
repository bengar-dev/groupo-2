import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeletePublication = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      await axios.delete(
        `${import.meta.env.VITE_API_GROUPO}/publications/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["allPublications"] });
    },
    onError: () => {
      console.log("error");
    },
  });
};
