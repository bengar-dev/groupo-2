import { Header } from "../components/ui/Header";
import { MainBlock } from "../components/ui/MainBlock";
import { useGetAllPublications } from "../hooks/publications/useGetAllPublications";
import { PublicationProps } from "../types/publications.types";
import { formatDistance } from "date-fns";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { PublicationArticle } from "../components/ui/PublicationArticle";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { PublishContent } from "../components/ui/PublishContent";

export const Dashboard = () => {
  const [togglePublish, setTogglePublish] = useState<boolean>(false);
  const { data: publications } = useGetAllPublications();

  return (
    <MainBlock>
      <Header />
      <div className="w-full lg:w-1/3 flex flex-col ml-auto mr-auto space-y-4 p-2">
        <PublishContent />
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
