import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@material-tailwind/react";
import { useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Header } from "../components/ui/Header";
import { MainBlock } from "../components/ui/MainBlock";
import { AppContext } from "../context/AppContext";
import { useEditUserInfo } from "../hooks/users/useEditUserInfo";
import { userEditProfilSchema } from "../schemas/users";

export const EditProfil = () => {
  const { mutateAsync } = useEditUserInfo();
  const { userInfoContext } = useContext(AppContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { firstName: "", lastName: "", email: "", avatar: "" },
    resolver: yupResolver(userEditProfilSchema),
  });

  useEffect(() => {
    if (userInfoContext) {
      const user = {
        firstName: userInfoContext.firstName,
        lastName: userInfoContext.lastName,
        email: userInfoContext.email,
        avatar: "",
      };
      reset(user);
    }
  }, [userInfoContext]);

  const onSubmit = async (data: any, e: any) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("img", data.avatar ? e.target.avatar.files[0] : null);

    await mutateAsync({ formData });
  };

  return (
    <MainBlock>
      <Header />
      <div className="w-full lg:w-1/3 flex flex-col ml-auto mr-auto space-y-4 p-2">
        <div className="flex flex-col space-y-2 bg-gray-50 p-2 rounded">
          <h2 className="font-semibold">✍️ Edit my profil</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input label="Firstname" type="text" {...field} />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input label="Lastname" type="text" {...field} />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input label="Email" type="email" {...field} />
              )}
            />
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <Input id="avatar" label="Avatar" type="file" {...field} />
              )}
            />
            <div className="flex space-x-2 justify-end mt-4">
              <Button onClick={() => history.back()} type="button" color="red">
                Cancel
              </Button>
              <Button type="submit" color="green">
                Save my profil
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainBlock>
  );
};
