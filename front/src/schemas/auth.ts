import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const registerSchema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().min(2).required(),
  lastName: yup.string().min(2).required(),
  password: yup.string().test("isPasswordFormatCorrect", (value) => {
    if (value)
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
        value
      );
    return false;
  }),
});
