import React from "react";
import { AiFillDelete } from "react-icons/ai";
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
      <ul className="flex flex-col text-sm font-bold">
        {authorId === userInfoId && (
          <li>
            <button
              onClick={(e) => handleDeletePublication(e, publicationId)}
              className="flex space-x-1 items-center text-xs hover:text-red-500"
            >
              <AiFillDelete />
              <span>Delete</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
