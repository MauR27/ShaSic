import React, { useEffect, useState } from "react";
import AddComments from "./AddComments";
import { fetchApiPost } from "../../api/postApi";
import { useParams } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import CommentsLoading from "../../loading/CommentsLoading";

const GetComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { _id } = useParams();

  useEffect(() => {
    try {
      (async () => {
        const data = await fetchApiPost();
        setComments(data);
        setIsLoading(false);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const commentsById = comments.find((data) => data._id === _id);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-t, purple.100 , gray.50 50%)"
      bgAttachment="fixed"
    >
      <AddComments />
      {!isLoading ? (
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          <Flex alignItems="center" flexDir="column" gap={2} m="5px">
            {commentsById.comments.map((data) => (
              <Card maxW="700px" w="100%" boxShadow="xl" key={data._id}>
                <CardHeader display="flex" gap="5">
                  <Heading fontSize={{ base: "14px", md: "16px", lg: "18px" }}>
                    {data.userName}
                  </Heading>
                  <Text fontSize={{ base: "10px", md: "12px", lg: "14px" }}>
                    {moment(data.createdAt).fromNow()}
                  </Text>
                </CardHeader>
                <Divider borderColor="gray.400" />
                <CardBody>{data.comment}</CardBody>
              </Card>
            ))}
          </Flex>
        </motion.div>
      ) : (
        <CommentsLoading />
      )}
    </Box>
  );
};

export default GetComments;
