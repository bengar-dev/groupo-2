import { BlockForm } from "../components/ui/BlockForm";
import { MainBlock } from "../components/ui/MainBlock";

import GroupoLogo from "../assets/GroupomaniaLogoBright.png";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../schemas/auth";
import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import { CheckingPassword } from "../components/misc/CheckingPassword";
import { useRegister } from "../hooks/auth/useRegister";
import { ImSpinner2 } from "react-icons/im";
import { useGetInfoByToken } from "../hooks/users/useGetInfoByToken";
import { AlertNotif } from "../components/ui/AlertNotif";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Register = () => {
  const { toggleAlert } = useContext(AppContext);

  const userInfo = useGetInfoByToken();
  const mutation = useRegister();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", firstName: "", lastName: "", password: "" },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    mutation.mutate({
      data,
    });
  };

  return (
    <MainBlock center>
      {toggleAlert.toggle && <AlertNotif />}
      <BlockForm>
        <div className="flex justify-center">
          <img src={GroupoLogo} className="w-40" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="Email"
                type="email"
                {...field}
                error={Boolean(errors?.email)}
              />
            )}
          />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                label="Firstname"
                type="text"
                {...field}
                error={Boolean(errors?.firstName)}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                label="Lastname"
                type="text"
                {...field}
                error={Boolean(errors?.lastName)}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                label="Password"
                type="password"
                {...field}
                error={Boolean(errors?.password)}
              />
            )}
          />
          <CheckingPassword
            value={watch("password")}
            errors={errors?.password}
          />
          <Button
            type="submit"
            color="red"
            disabled={
              Boolean(mutation?.isLoading) ||
              Boolean(Object.keys(errors).length > 0)
            }
          >
            {mutation?.isLoading ? (
              <ImSpinner2 className="text-xl ml-auto mr-auto animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </BlockForm>
      <div className="p-1 text-sm flex space-x-1">
        <span>Already have an account ?</span>
        <Link to="/" className="hover:text-red-600">
          Sign in now !
        </Link>
      </div>
    </MainBlock>
  );
};
