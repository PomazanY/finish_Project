import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import { Op } from "sequelize";
import sendEmail from "../utils/sendEmail.js";
import User from "../db/User.js";
import HttpException from "../utils/HttpExeption.js";
import { nanoid } from "nanoid";


const { JWT_SECRET, FRONTEND_URL } = process.env;


export const login = async ({ identifier, password }) => {
  const user = await User.findOne({
    $or: [
      { email: identifier },
      { username: identifier }
    ]
  })

  if (!user) throw HttpException(401, `User ${identifier} not found`);

  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) throw HttpException(401, "Password invalid");

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
  user.token = token;

  
  await user.save();
  return {
    id: user.id,
    token,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  }
}



export const registerUser = async ({ username, email, fullName, password }) => {
  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) throw HttpException(409, "Username is already taken");

  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) throw HttpException(409, "Email is already used");

  // const existing = await User.findOne({
  //   where: {
  //     [Op.or]: [
  //       { email },
  //       { username },
  //     ]
  //   }
  // });

  // if (existing) throw HttpException(409, "User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  

  const user = await User.create({
    username,
    email,
    fullName,
    password: hashedPassword,
    followers: [], 
    following: []
  });

  return user;
}


export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const resetToken = nanoid();
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 минут
  await user.save();

  const resetPasswordEmail = {
    to: email,
    subject: "Reset your password",
    html: `<a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" target="_blank">Click here to reset your password</a>`
  };

  await sendEmail(resetPasswordEmail);
};



export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: new Date() } 
  });

  if (!user) throw new Error("Invalid or expired token");

  const bcrypt = await import('bcrypt');
  const hash = await bcrypt.hash(newPassword, 10);

  user.password = hash;
  user.resetPasswordToken = "";
  user.resetPasswordExpiresAt = null;
  await user.save();
};

