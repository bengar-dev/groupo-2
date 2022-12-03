import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";
import { ImSpinner } from "react-icons/im";
import { AppContext } from "../../context/AppContext";
import { useDeletePublication } from "../../hooks/publications/useDeletePublication";

export interface ModalAlertProps {
  id: string;
  title: string;
  content: string;
  cancel?: boolean;
}

export const ModalAlert = (props: ModalAlertProps) => {
  const { id, title, content, cancel = false } = props;
  const { mutateAsync, isLoading } = useDeletePublication();
  const { setToggleModal } = useContext(AppContext);

  const handleDeletePublication = async (id: string): Promise<void> => {
    await mutateAsync({ id });
    setToggleModal(false);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-100 rounded-t">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <div className="relative p-4 flex-auto">
              <p className="my-4 text-gray-800">{content}</p>
            </div>
            <div className="flex space-x-2 items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              {cancel && (
                <Button color="red" onClick={(event) => setToggleModal(false)}>
                  Cancel
                </Button>
              )}
              <Button
                color="green"
                onClick={(event) => handleDeletePublication(id)}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <ImSpinner className="animate-spin text-xl text-green-200" />
                  </div>
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
