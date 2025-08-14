import * as Yup from "yup";

export const usernameParamSchema = Yup.object({
  username: Yup.string().min(3).required()
});