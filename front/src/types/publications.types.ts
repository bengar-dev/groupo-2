import { UserProps } from "./users.types";

export type PublicationProps = {
  id: string;
  author: UserProps;
  authorId: string;
  content: string;
  createdAt: Date;
  imgUrl?: string | null;
};
