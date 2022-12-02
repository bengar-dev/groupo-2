import React, { useContext } from "react";
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
  const { mutateAsync } = useDeletePublication();
  const { setToggleModal } = useContext(AppContext);

  const handleDeletePublication = async (id: string): Promise<void> => {
    await mutateAsync({ id });
    setToggleModal(false);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="relative p-4 flex-auto">
              <p className="my-4 text-slate-500 leading-relaxed">{content}</p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              {cancel && (
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(event) => setToggleModal(false)}
                >
                  Cancel
                </button>
              )}
              <button
                className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(event) => handleDeletePublication(id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
