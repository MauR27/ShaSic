import { useEffect, useState } from "react";
import { fetchApiPost } from "../api/postApi";
import { Link } from "react-router-dom";
import PostLikes from "./PostLikes/PostLikes";
import moment from "moment";
import { BiChat } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import PostLoading from "../loading/PostLoading.js";

const GetPosts = () => {
  const [getPost, setGetPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      (async () => {
        const data = await fetchApiPost();
        setGetPost(data);
        setIsLoading(false);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        <Flex alignItems="center" flexDir="column" m="0 auto">
          {getPost.map((data) => (
            <Card
              maxW="700px"
              w="100%"
              mb="5px"
              key={data._id}
              boxShadow="xl"
              borderBottom="2px solid"
              borderColor="gray.300"
            >
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      size={["sm", "md"]}
                      name={data.user[0].name}
                      color="brand.600"
                      bg="white"
                    />

                    <Box>
                      <Heading
                        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                      >
                        {data.user[0].name}
                      </Heading>
                      <Text fontSize={{ base: "10px", md: "12px", lg: "14px" }}>
                        {moment(data.createdAt).fromNow()}
                      </Text>
                    </Box>
                  </Flex>
                  <IconButton
                    size={["sm", "md"]}
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<BsThreeDotsVertical />}
                  />
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{data.post.text}</Text>
              </CardBody>
              {data.post.image ? (
                <Image
                  objectFit="cover"
                  src={data.post.image}
                  alt="Chakra UI"
                />
              ) : (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  bgGradient={data.post.bgColor}
                  h="200px"
                  w="100%"
                  objectFit="cover"
                >
                  <Text fontSize="30px" fontWeight="bold">
                    {data.post.text}
                  </Text>
                </Flex>
              )}

              <Divider mt="10px" />

              <CardFooter justifyContent="space-around" gap="4">
                <PostLikes postId={data._id} likes={data.post.likes} />
                <Button
                  fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                  flex="1"
                  variant="ghost"
                  leftIcon={<BiChat />}
                  fontWeight="normal"
                >
                  <Link to={`/post/${data._id}/comments`}>Comments</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      ) : (
        <PostLoading />
      )}
    </>
  );
};

export default GetPosts;
