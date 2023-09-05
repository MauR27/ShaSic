import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useSelector } from "react-redux";

const URL_API = process.env.REACT_APP_SERVER_URL;

const PostLikes = ({ postId, likes }) => {
  const [liked, setLiked] = useState(false);
  const [getLikes, setGetLikes] = useState(likes.length);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const userHasLiked = likes.some((like) => like.userId === userInfo._id);
    setLiked(userHasLiked);
  }, [likes, userInfo._id]);

  const handleLike = async () => {
    try {
      await fetch(`${URL_API}/post`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          like: !liked,
          postId: postId,
        }),
      });

      setLiked(!liked);
      setGetLikes(getLikes + (liked ? -1 : 1));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {!liked ? (
        <Button
          flex="1"
          borderRadius="2px"
          fontSize={{ base: "12px", md: "14px", lg: "16px" }}
          variant="ghost"
          leftIcon={<AiOutlineHeart />}
          onClick={handleLike}
          fontWeight="normal"
        >
          Like
        </Button>
      ) : (
        <Button
          flex="1"
          borderRadius="2px"
          variant="ghost"
          color="brand.600"
          leftIcon={<AiFillHeart />}
          onClick={handleLike}
          fontWeight="normal"
        >
          Like
        </Button>
      )}

      {/* <Text>{getLikes}</Text> */}
    </>
  );
};

export default PostLikes;
