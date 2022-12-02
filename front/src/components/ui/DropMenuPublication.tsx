import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDeletePublication } from "../../hooks/publications/useDeletePublication";

interface DropMenuPublicationProps {
  publicationId: string;
  authorId: string;
  userInfoId: string;
  func: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DropMenuPublication = (props: DropMenuPublicationProps) => {
  const { publicationId, authorId, userInfoId, func } = props;
  const deletePublication = useDeletePublication();

  const handleDeletePublication = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    deletePublication.mutate({ id });
    func(event);
  };

  return (
    <div className="absolute bg-white rounded-lg border-2 p-2 right-0 top-8">
      {authorId === userInfoId && (
        <ul className="flex flex-col space-y-2 text-sm font-bold">
          <li>
            <button
              onClick={(e) => console.log("edit")}
              className="flex space-x-1 items-center text-xs hover:text-orange-500"
            >
              <AiFillEdit />
              <span>Edit</span>
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleDeletePublication(e, publicationId)}
              className="flex space-x-1 items-center text-xs hover:text-red-500"
            >
              <AiFillDelete />
              <span>Delete</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
