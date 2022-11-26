import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MainBlock } from "../components/ui/MainBlock";
import { BlockForm } from "../components/ui/BlockForm";
import { Button, Input } from "@material-tailwind/react";

import GroupoLogo from "../assets/GroupomaniaLogoBright.png";
import { signInSchema } from "../schemas/auth";
import { useSignIn } from "../hooks/useSignIn";

import { ImSpinner2 } from "react-icons/im";

export const SignIn = () => {
  const mutation = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: any) => {
    mutation.mutate({
      data,
    });
  };

  return (
    <MainBlock center>
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
              "Sign-in"
            )}
          </Button>
        </form>
      </BlockForm>
    </MainBlock>
  );
};
