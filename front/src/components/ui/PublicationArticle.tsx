import { PublicationProps } from "../../types/publications.types";
import { formatDistance } from "date-fns";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { DropMenuPublication } from "./DropMenuPublication";

interface PublicationArticleProps {
  publication: PublicationProps;
}

export const PublicationArticle = (props: PublicationArticleProps) => {
  const { publication } = props;
  const [toggleDropMenu, setToggleDropMenu] = useState<boolean>(false);
  const { userInfoContext } = useContext(AppContext);

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
        {publication.authorId === userInfoContext?.id && (
          <button
            className="text-lg hover:text-red-500"
            onClick={() => setToggleDropMenu(!toggleDropMenu)}
          >
            <HiMenuAlt4 />
          </button>
        )}
        {toggleDropMenu && userInfoContext && (
          <DropMenuPublication
            publicationId={publication.id}
            authorId={publication.authorId}
            userInfoId={userInfoContext.id}
            func={() => setToggleDropMenu(!toggleDropMenu)}
          />
        )}
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
