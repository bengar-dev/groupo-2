import { Button } from "@material-tailwind/react";
import { useContext, useEffect } from "react";
import { ImSpinner } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { MainBlock } from "../components/ui/MainBlock";
import { AppContext } from "../context/AppContext";
import { useGetUser } from "../hooks/users/useGetUser";

export const Profil = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userInfoContext } = useContext(AppContext);
  const { data, refetch, isLoading, isRefetching } = useGetUser(params.id);

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <MainBlock>
      <Header />
      <div className="w-full lg:w-1/3 flex flex-col ml-auto mr-auto space-y-4 p-2">
        <div className="flex flex-col space-y-2 bg-gray-50 p-2 rounded">
          {isLoading || isRefetching ? (
            <div className="flex justify-center">
              <ImSpinner className="animate-spin text-xl text-pink-500" />
            </div>
          ) : (
            <>
              <div className="flex space-x-2">
                <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                <div>
                  <h2 className="font-semibold">
                    {data?.data.firstName} {data?.data.lastName}
                  </h2>
                  <p className="text-xs">{data?.data.email}</p>
                </div>
              </div>
              {data?.data?.id === userInfoContext?.id && (
                <Button
                  color="amber"
                  onClick={() => navigate("/dashboard/edit-profil")}
                >
                  Edit my profil
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </MainBlock>
  );
};
