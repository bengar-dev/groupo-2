import { PublicationProps } from "../../types/publications.types";
import { formatDistance } from "date-fns";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useDeletePublication } from "../../hooks/publications/useDeletePublication";

interface PublicationArticleProps {
  publication: PublicationProps;
}

export const PublicationArticle = (props: PublicationArticleProps) => {
  const { publication } = props;
  const { userInfoContext } = useContext(AppContext);
  const deletePublication = useDeletePublication();

  const handeDeletePublication = (id: string) => {
    deletePublication.mutate({ id });
  };

  return (
    <article className="p-2 text-sm rounded-lg bg-gray-50">
      <div className="relative flex items-center justify-between p-1">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-green-500 h-8 w-8"></div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">
              {publication.author.firstName} {publication.author.lastName}
            </span>
            <span className="text-xs">
              {formatDistance(new Date(publication.createdAt), new Date())}
            </span>
          </div>
        </div>
        <div className="absolute bg-white rounded-lg border-2 p-2 right-0 top-8">
          <ul className="flex flex-col text-sm font-bold">
            <li>
              {publication.authorId === userInfoContext?.id && (
                <button
                  onClick={() => handeDeletePublication(publication.id)}
                  className="hover:text-red-500"
                >
                  Delete
                </button>
              )}
            </li>
          </ul>
        </div>
        <button
          className="text-lg hover:text-red-500"
          onClick={() => console.log("actions")}
        >
          <HiMenuAlt4 />
        </button>
      </div>
      {publication.imgUrl && (
        <img
          src={publication.imgUrl}
          className="ml-auto mr-auto max-h-40 w-2/3 object-cover"
        />
      )}
      <div className="mt-2 p-2 bg-white border rounded-lg">
        {publication.content}
      </div>
      <div className="flex items-center space-x-2 mt-2 text-xl p-2">
        <button>
          <AiOutlineLike className="text-indigo-800 hover:text-indigo-900" />
        </button>
        <span className="text-base">10</span>
      </div>
    </article>
  );
};
