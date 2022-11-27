import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useGetInfoByToken } from "../../hooks/users/useGetInfoByToken";

import { FaSignOutAlt } from "react-icons/fa";
import GroupoLogo from "../../assets/GroupomaniaLogoBright.png";

export const Header = () => {
  const userInfo = useGetInfoByToken();
  const { userInfoContext, setUserInfoContext } = useContext(AppContext);

  useEffect(() => {
    if (!userInfo.isFetching && userInfo.data && !userInfoContext) {
      setUserInfoContext(userInfo.data.data);
    }
  }, [userInfo, userInfoContext]);

  return (
    <header className="bg-gray-900 shadow-xl h-20 flex items-center justify-around">
      <div>
        <img src={GroupoLogo} className="h-14" alt="Groupomania Logo" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="bg-purple-400 h-8 w-8 rounded-full"></div>
        <span className="font-bold text-white">
          {userInfoContext?.firstName} {userInfoContext?.lastName}
        </span>
        <button onClick={() => console.log("logout")}>
          <FaSignOutAlt className="text-gray-100 hover:text-gray-300" />
        </button>
      </div>
    </header>
  );
};
