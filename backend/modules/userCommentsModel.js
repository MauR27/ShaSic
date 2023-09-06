import mongoose from "mongoose";

const commentsSchema = mongoose.Schema(
  {
    comment: String,
    userName: String,
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentsSchema);
export default Comment;
