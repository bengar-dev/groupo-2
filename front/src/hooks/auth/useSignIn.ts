import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_API_GROUPO}/users/signin`,
        data
      );
      if (response.token) localStorage.setItem("token", response.token);
    },
    onSuccess: () => {
      navigate("/hello");
    },
  });
};
