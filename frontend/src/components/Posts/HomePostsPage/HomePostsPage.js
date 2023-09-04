import { Box } from "@chakra-ui/react";
import AddPostForm from "../AddPostForm";
import GetPosts from "../GetPosts";

const HomePostsPage = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <AddPostForm />
      <GetPosts />
    </Box>
  );
};

export default HomePostsPage;
