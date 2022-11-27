import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_API_GROUPO}/users/signup`,
        data
      );
      console.log(response);
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};
