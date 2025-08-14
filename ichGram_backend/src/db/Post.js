import { Schema, model } from "mongoose";

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  likes: { 
    type: Number,
     default: 0, 
     min: 0 
    },
  likedBy: [{ 
    type: Schema.Types.ObjectId, 
    ref: "user" 
  }],

}, {
  versionKey: false,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

postSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "postId"
});

postSchema.index({ likedBy: 1 });

const Post = model("post", postSchema);
export default Post;
