import { Header } from "../components/ui/Header";
import { MainBlock } from "../components/ui/MainBlock";
import { useGetAllPublications } from "../hooks/publications/useGetAllPublications";
import { PublicationProps } from "../types/publications.types";

import { PublicationArticle } from "../components/ui/PublicationArticle";
import { PublishContent } from "../components/ui/PublishContent";
import { ImSpinner } from "react-icons/im";
import { ModalAlert } from "../components/ui/ModalAlert";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Dashboard = () => {
  const { toggleModal, modalProps } = useContext(AppContext);
  const { data: publications, isLoading } = useGetAllPublications();

  return (
    <MainBlock>
      <Header />
      <div className="w-full lg:w-1/3 flex flex-col ml-auto mr-auto space-y-4 p-2">
        <PublishContent />
        {isLoading ? (
          <div className="flex justify-center">
            <ImSpinner className="animate-spin text-xl text-pink-500" />
          </div>
        ) : (
          publications &&
          Array.isArray(publications) &&
          publications.map((publication: PublicationProps) => (
            <PublicationArticle
              key={publication.id}
              publication={publication}
            />
          ))
        )}
        {toggleModal && (
          <ModalAlert
            id={modalProps.id}
            title={modalProps.title}
            content={modalProps.content}
            cancel={modalProps.cancel}
          />
        )}
      </div>
    </MainBlock>
  );
};
