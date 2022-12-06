import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const useRegister = () => {
  const { handleToggleAlert } = useContext(AppContext);

  return useMutation({
    mutationFn: async (data: any) => {
      await axios.post(`${import.meta.env.VITE_API_GROUPO}/users/signup`, data);
    },
    onSuccess: () => {
      handleToggleAlert(
        {
          toggle: true,
          type: "success",
          value: "You has been registered",
        },
        "/"
      );
    },
    onError: (error: any) => {
      handleToggleAlert({
        toggle: true,
        type: "error",
        value: error?.response?.data?.error,
      });
    },
  });
};
