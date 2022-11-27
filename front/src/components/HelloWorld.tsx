import { useGetInfoByToken } from "../hooks/users/useGetInfoByToken";

export const HelloWorld = () => {
  const userInfo = useGetInfoByToken();

  return <div className="text-red-500">Salut tout le monde</div>;
};
