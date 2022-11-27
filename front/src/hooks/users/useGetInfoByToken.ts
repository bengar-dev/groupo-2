import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const useGetInfoByToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_GROUPO}/users/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
      }
    },
    onSuccess: () => {
      if (pathname === "/") navigate("/dashboard");
    },
    onError: () => {
      if (pathname !== "/" && pathname !== "/register") {
        if (token) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        if (token) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          navigate("/");
        }
      }
    },
  });
};
