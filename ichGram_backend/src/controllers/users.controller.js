import * as userService from "../services/users.services.js"

import validateBody from "../utils/validateBody.js"

import { loginSchema, registerSchema } from "../validation/users.schema.js"


export const loginUserController = async (req, res) => {
  await validateBody(loginSchema, req.body);
  const result = await userService.login(req.body);
  res.json({
    success: true,
    ...result
  })
}



export const registerUserController = async (req, res) => {
  await validateBody(registerSchema, req.body);
  const user = await userService.registerUser(req.body);
  res.status(201).json({

    user: {
      id: user.id,
      username: user.username,
      email: user.email,

    }
  });
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    await userService.forgotPassword(email);
    res.json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;
    await userService.resetPassword(token, password);
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
