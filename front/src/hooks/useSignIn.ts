import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: response } = await axios.post(
        `http://localhost:8080/api/users/signin`,
        data
      );
      if (response.token) localStorage.setItem("token", response.token);
    },
    onSuccess: () => {
      navigate("/hello");
    },
  });
};
