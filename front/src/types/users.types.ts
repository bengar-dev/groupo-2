export type UserProps = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: Date;
};

export type UserEditFormValue = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};
