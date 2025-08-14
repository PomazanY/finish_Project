import * as Yup from "yup";

import { emailValidation, passwordValidation } from "../constants/users.constants.js";

export const loginSchema = Yup.object().shape({
  identifier: Yup.string().trim().required(),
  password: Yup.string().trim().required()
});
export const registerSchema = Yup.object().shape({
  username: Yup.string().trim().min(3).required(),
  email: Yup.string().trim().email().required(),
  password: Yup.string().trim().min(6).required().matches(
    passwordValidation.value,
    passwordValidation.message
  )
});
export const passwordSchema = Yup.string()
  .trim()
  .min(6)
  .matches(
    passwordValidation.value,
    passwordValidation.message
  )
  .required();

export const emailSchema = Yup.string()
  .trim()
  .matches(emailValidation.value, emailValidation.message)
  .required();

