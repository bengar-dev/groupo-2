import { Alert } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export interface AlertNotifProps {
  toggle: boolean;
  value: string;
  type: "error" | "success" | "warning" | "info";
}

export const AlertNotif = () => {
  const { toggleAlert } = useContext<any>(AppContext);
  return (
    <div className="absolute top-4 right-4">
      <Alert color={handleStyleAlert(toggleAlert)}>{toggleAlert.value}</Alert>
    </div>
  );
};

function handleStyleAlert({ type }: AlertNotifProps): colors {
  switch (type) {
    case "error":
      return "red";
    case "info":
      return "blue";
    case "success":
      return "green";
    case "warning":
      return "amber";
    default:
      return "blue";
  }
}
