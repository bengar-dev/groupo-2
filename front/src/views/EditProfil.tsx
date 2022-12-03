import { useContext } from "react";
import { Header } from "../components/ui/Header";
import { MainBlock } from "../components/ui/MainBlock";
import { AppContext } from "../context/AppContext";

export const EditProfil = () => {
  const { userInfoContext } = useContext(AppContext);

  return (
    <MainBlock>
      <Header />
      <div className="w-full lg:w-1/3 flex flex-col ml-auto mr-auto space-y-4 p-2">
        <div className="flex flex-col space-y-2 bg-gray-50 p-2 rounded">
          edit profil
        </div>
      </div>
    </MainBlock>
  );
};
