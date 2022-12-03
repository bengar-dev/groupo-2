import { UserProps } from "./users.types";

export type PublicationProps = {
  id: string;
  author: UserProps;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: string[];
  imgUrl?: string | null;
};
