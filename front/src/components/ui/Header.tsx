import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useGetInfoByToken } from "../../hooks/users/useGetInfoByToken";

import { FaSignOutAlt } from "react-icons/fa";
import GroupoLogo from "../../assets/GroupomaniaLogoBright.png";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const userInfo = useGetInfoByToken();
  const { userInfoContext, setUserInfoContext } = useContext(AppContext);

  useEffect(() => {
    if (!userInfo.isFetching && userInfo.data && !userInfoContext) {
      setUserInfoContext(userInfo.data.data);
    }
  }, [userInfo, userInfoContext]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-gray-900 shadow-xl h-20 flex items-center justify-around">
      <Link to="/dashboard">
        <img src={GroupoLogo} className="h-14" alt="Groupomania Logo" />
      </Link>
      <div className="flex items-center space-x-2">
        <div className="bg-purple-400 h-8 w-8 rounded-full"></div>
        <Link
          to={`/dashboard/profil/${userInfoContext?.id}`}
          className="font-bold text-white"
        >
          {userInfoContext?.firstName} {userInfoContext?.lastName}
        </Link>
        <button onClick={handleLogout}>
          <FaSignOutAlt className="text-gray-100 hover:text-gray-300" />
        </button>
      </div>
    </header>
  );
};
