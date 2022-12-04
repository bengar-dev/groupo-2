import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useEditUserInfo = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      await axios.put(
        `${import.meta.env.VITE_API_GROUPO}/users/edit-profil`,
        data.formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["userInfo"] });
      navigate(`/dashboard`);
    },
  });
};
