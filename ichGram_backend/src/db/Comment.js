import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: { 
        type: Number, 
        default: 0, 
        min: 0 },
    likedBy: [{ 
        type: Schema.Types.ObjectId, 
        ref: "user" 
    }],
}, { versionKey: false, timestamps: true });

commentSchema.index({ likedBy: 1 });

const Comment = model("comment", commentSchema);
export default Comment;