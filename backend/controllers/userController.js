import asyncHandler from "express-async-handler";
import User from "../modules/userModel.js";
import Post from "../modules/userPosts.js";
import Comment from "../modules/userCommentsModel.js";
import generateToken from "../utils/generateToken.js";

//  @desc       Auth user/set token
// route        POST /api/users/auth
// @access      Public ↓↓

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body.values;
  // const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    console.log(generateToken);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//  @desc       Post data to database
// route        POST /api/users/post
// @access      Private ↓↓

const addUserPost = asyncHandler(async (req, res) => {
  const { text, image, likes, bgColor } = req.body.values;
  const userId = req.user._id;

  const newPostData = {
    post: {
      text,
      image,
      likes,
      bgColor,
    },

    user: userId,
  };

  const userPost = await Post.create(newPostData);

  if (userPost) {
    res.status(201).json({ userPost });
  } else {
    res.status(400);
    throw new Error("Code Error!");
  }
});

//  @desc       Get user post from database
// route        GET /api/users/post
// @access      Private ↓↓

const getUserPost = asyncHandler(async (req, res) => {
  const post = await Post.find()
    .sort({
      createdAt: -1,
    })
    .populate("user", "name")
    .populate("comments")
    .exec();

  if (post) {
    res.status(201).json({ post });
  } else {
    res.status(404);
    throw new Error("Post no found");
  }
});

//  @desc       Post user comments
// route        POST /api/users/comments
// @access      Private ↓↓

const addComments = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const postId = req.params;
  const post = await Post.findById(postId);
  const user = await User.findById(req.user._id);

  const newComment = {
    comment,
    userName: user.name,
  };

  const userComment = await Comment.create(newComment);

  if (userComment) {
    res.status(201).json({ userComment });

    post.comments.push(userComment._id);

    await post.save();
  } else {
    res.status(404);
    throw new Error("Code Error!");
  }
});

//  @desc       Register a new user
// route        POST /api/users
// @access      Public ↓↓

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body.values;
  // const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//  @desc       Logout user
// route        POST /api/users/logout
// @access      Public ↓↓

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

//  @desc       Get user profile
// route        GET /api/users/profile
// @access      Private ↓↓

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

//  @desc       Update user profile
// route        PUT /api/users/profile
// @access      Private ↓↓

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//  @desc       get all user registered
// route        GET /api/users/auth
// @access      Private ↓↓

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().exec();

  res.status(200).json({ users });
});

//  @desc       likes to posts
// route        PUT /api/users/post
// @access      Private ↓↓

const postLikes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const post = await Post.findById(req.body.postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const userAlreadyLikes = post.post.likes.findIndex(
    (like) => like.userId === req.user._id.toString()
  );

  if (userAlreadyLikes !== -1) {
    post.post.likes.splice(userAlreadyLikes, 1);
  } else {
    post.post.likes.push({
      like: req.body.like || post.post.likes,
      user: user.name,
      userId: user._id,
      postId: req.body.postId,
    });
  }

  const saveUpdatePost = await post.save();

  res.status(200).json(saveUpdatePost);
});

export {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  addUserPost,
  getUserPost,
  getUsers,
  addComments,
  postLikes,
};
