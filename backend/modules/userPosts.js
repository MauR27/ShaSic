import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema(
  {
    post: {
      text: String,
      image: String,
      likes: [
        {
          like: Boolean,
          user: String,
          userId: String,
          postId: String,
        },
      ],
      bgColor: String,
    },

    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
