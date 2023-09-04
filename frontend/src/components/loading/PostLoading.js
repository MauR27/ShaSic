import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Progress,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const PostLoading = () => {
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
              <SkeletonCircle />
              <Skeleton w="80px">name</Skeleton>
            </CardHeader>
            <SkeletonText m="10px" />
            <CardBody>
              <Skeleton w="100%" h="200px">
                image
              </Skeleton>
            </CardBody>
            <CardFooter justifyContent="space-around" gap="4">
              <Skeleton w="30%">button</Skeleton>
              <Skeleton w="30%">button</Skeleton>
            </CardFooter>
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default PostLoading;
