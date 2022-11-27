import { Header } from "../components/ui/Header";
import { MainBlock } from "../components/ui/MainBlock";
import { useGetAllPublications } from "../hooks/publications/useGetAllPublications";
import { PublicationProps } from "../types/publications.types";
import { formatDistance } from "date-fns";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { PublicationArticle } from "../components/ui/PublicationArticle";

export const Dashboard = () => {
  const { data: publications } = useGetAllPublications();

  return (
    <MainBlock>
      <Header />
      <div className="w-full lg:w-1/3 flex flex-col ml-auto mr-auto space-y-4 p-2">
        {publications &&
          Array.isArray(publications) &&
          publications.map((publication: PublicationProps) => (
            <PublicationArticle
              key={publication.id}
              publication={publication}
            />
          ))}
      </div>
    </MainBlock>
  );
};
