import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Progress,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

const CommentsLoading = () => {
  const mapThroughFive = [1, 2, 3, 4, 5];

  return (
    <>
      <Box>
        <Progress
          w="100%"
          h="1px"
          colorScheme="purple"
          isIndeterminate="true"
          position="fixed"
          top="0"
          left="0"
          zIndex="999"
        />
      </Box>
      <Flex alignItems="center" flexDir="column" gap={4}>
        {mapThroughFive.map((data) => (
          <Card maxW="700px" w="100%" boxShadow="lg" key={data}>
            <CardHeader display="flex" gap="3">
              <Skeleton w="80px">name</Skeleton>
            </CardHeader>
            <SkeletonText m="10px" />
            <CardBody></CardBody>
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default CommentsLoading;
