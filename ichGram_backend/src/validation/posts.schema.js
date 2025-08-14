import * as Yup from "yup";

export const updatePostSchema = Yup.object({
  description: Yup.string().trim().max(1000).optional(),
});

