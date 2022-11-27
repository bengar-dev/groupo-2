import { FieldError } from "react-hook-form";
import { MdCheckCircle, MdError } from "react-icons/md";

interface CheckingPasswordProps {
  value: string;
  errors?: FieldError;
}

export const CheckingPassword = (props: CheckingPasswordProps) => {
  const { value, errors } = props;
  return (
    <div
      className={`flex items-center space-x-1 text-xs border rounded-full ${
        errors && "border-red-500"
      }`}
    >
      <div className="text-base">
        {errors || !checkPasswordIsCorrect(value) ? (
          <MdError className="text-red-500" />
        ) : (
          <MdCheckCircle className="text-green-500" />
        )}
      </div>
      <span>8 characters, 1 uppercase, 1 lowercase, 1 number</span>
    </div>
  );
};

function checkPasswordIsCorrect(value: string): boolean {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value);
}
