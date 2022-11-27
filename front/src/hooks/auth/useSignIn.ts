import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const useSignIn = () => {
  const navigate = useNavigate();

  const { handleToggleAlert } = useContext(AppContext);

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_API_GROUPO}/users/signin`,
        data
      );
      if (response.token) localStorage.setItem("token", response.token);
    },
    onSuccess: () => {
      handleToggleAlert(
        {
          toggle: true,
          type: "success",
          value: "You has been logged, you are gonna be redirected",
        },
        "/dashboard"
      );
    },
  });
};
