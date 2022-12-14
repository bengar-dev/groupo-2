import { createContext, useState } from "react";
import { AlertNotifProps } from "../components/ui/AlertNotif";
import { useNavigate } from "react-router-dom";
import { UserProps } from "../types/users.types";
import { ModalAlertProps } from "../components/ui/ModalAlert";

export const AppContext = createContext<any>({});

const AppContextProvider = (props: any) => {
  const navigate = useNavigate();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<ModalAlertProps>();
  const [userInfoContext, setUserInfoContext] = useState<UserProps>();
  const [toggleAlert, setToggleAlert] = useState<AlertNotifProps>({
    toggle: false,
    type: "info",
    value: "",
  });

  const handleToggleAlert = (data: AlertNotifProps, target: string) => {
    setToggleAlert({
      toggle: data.toggle,
      type: data.type,
      value: data.value,
    });
    setTimeout(() => {
      setToggleAlert({ ...toggleAlert, toggle: false });
      if (target) navigate(target);
    }, 2000);
  };

  return (
    <AppContext.Provider
      value={{
        toggleAlert,
        handleToggleAlert,
        userInfoContext,
        setUserInfoContext,
        toggleModal,
        setToggleModal,
        modalProps,
        setModalProps,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
