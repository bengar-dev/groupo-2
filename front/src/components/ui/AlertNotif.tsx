import { Alert } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";

interface AlertNotifProps {
  value: string;
  type: "error" | "success" | "warning" | "info";
}

export const AlertNotif = (props: AlertNotifProps) => {
  const { value } = props;
  return (
    <div className="absolute top-4 right-4">
      <Alert color={handleStyleAlert(props)}>{value}</Alert>
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
