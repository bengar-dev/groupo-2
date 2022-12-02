import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const usePostPublication = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      await axios.post(
        `${import.meta.env.VITE_API_GROUPO}/publications`,
        data.formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["allPublications"] });
      return true;
    },
    onError: (err: any) => {
      console.log(err);
      return false;
    },
  });
};
