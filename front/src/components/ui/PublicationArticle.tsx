import { PublicationProps } from "../../types/publications.types";
import { formatDistance } from "date-fns";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { DropMenuPublication } from "./DropMenuPublication";
import { useHandleLikes } from "../../hooks/publications/useHandleLikes";
import { Link } from "react-router-dom";

interface PublicationArticleProps {
  publication: PublicationProps;
}

export const PublicationArticle = (props: PublicationArticleProps) => {
  const { publication } = props;
  const [toggleDropMenu, setToggleDropMenu] = useState<boolean>(false);
  const { userInfoContext } = useContext(AppContext);
  const { mutateAsync } = useHandleLikes();

  const handleLikes = async (id: string) => {
    await mutateAsync({
      id,
    });
  };

  return (
    <article className="p-2 text-sm rounded-lg bg-gray-50">
      <div className="relative flex items-center justify-between p-1">
        <div className="flex items-center space-x-2">
          <img
            src={publication.author?.avatar}
            alt="avatar"
            className="h-8 w-8 object-cover rounded-full"
          />
          <div className="flex flex-col">
            <Link
              to={`/dashboard/profil/${publication.author.id}`}
              className="text-xs font-medium"
            >
              {publication.author.firstName} {publication.author.lastName}
            </Link>
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
        <button
          className={findUserIdOnLikesArray(
            publication.likes,
            userInfoContext.id
          )}
          onClick={() => handleLikes(publication.id)}
        >
          <AiOutlineLike />
          <span className="text-base">{publication.likes.length}</span>
        </button>
      </div>
    </article>
  );
};

function findUserIdOnLikesArray(likesArray: string[], userId: string): string {
  const findUser = likesArray.find((like) => like === userId);
  if (!findUser)
    return "flex space-x-2 items-center justify-between text-blue-500 hover:text-blue-300 py-1 px-2 rounded border border-blue-500";
  return "flex space-x-2 items-center justify-between text-blue-500 hover:text-blue-300 bg-blue-50 py-1 px-2 rounded border border-blue-500";
}
