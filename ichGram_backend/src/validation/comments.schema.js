import * as Yup from "yup";

export const createCommentSchema = Yup.object({
  
  description: Yup.string()
    .trim()
    .required()
    .max(500),
});


export const updateCommentSchema = Yup.object({
  commentId: Yup.string().required(),
  userId: Yup.string().required(),
  description: Yup.string()
    .trim()
    .required()
    .max(500),
});

