import * as yup from "yup";
import { useGetInfoByToken } from "../hooks/users/useGetInfoByToken";

export const userEditProfilSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  avatar: yup.mixed().required(),
});
