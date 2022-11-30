import * as yup from "yup";

export const publishPublicationSchema = yup.object().shape({
  content: yup.string().required(),
  img: yup.mixed().required(),
});
