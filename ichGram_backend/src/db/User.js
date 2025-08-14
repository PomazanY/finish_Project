import { Schema, model } from "mongoose";

import { emailValidation } from "../constants/users.constants.js";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    match: emailValidation.value,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  token: {
    type: String
  },
  avatar: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  website: {
    type: String,
    default: ""
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "user",
    default: [],
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "user",
    default: [],
  }],

  postsCount: {
    type: Number,
    default: 0
  },
  resetPasswordToken: { 
    type: String, 
    default: "" 
  },
  resetPasswordExpiresAt: { 
    type: Date, 
    default: null 
  },
}, {
  versionKey: false,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


userSchema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "userId"
});

userSchema.virtual("comments", {
  ref: "comment",           // имя модели Comment
  localField: "_id",        // что сравниваем
  foreignField: "userId"    // поле в Comment, которое указывает на пользователя
});
const User = model("user", userSchema);
export default User;