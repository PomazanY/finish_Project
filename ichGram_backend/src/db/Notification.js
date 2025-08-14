import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    to: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },
    from: { 
        type: Schema.Types.ObjectId,
        ref: "user", 
        required: true
     },

    type: {
         type: String, 
         enum: ["like", "comment", "follow"],
          required: true 
        },
    postId: { 
        type: Schema.Types.ObjectId, 
        ref: "post" 
    },
    message: {
         type: String
        },
    isRead: { 
        type: Boolean, 
        default: false 
    },
  },
  { timestamps: true }
);

export default model("notification", notificationSchema);