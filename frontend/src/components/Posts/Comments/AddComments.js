import React from "react";
import { useAddCommentMutation } from "../../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { addComment } from "../../../slices/commentsSlice";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";

const AddComments = () => {
  const [commentsMutation] = useAddCommentMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const chakraToast = useToast();
  const id = "chakra-toast";

  const formik = useFormik({
    initialValues: {
      comment: "",
      postId: _id,
    },

    onSubmit: async (values) => {
      try {
        if (values.comment) {
          const res = await commentsMutation({ values }).unwrap();
          dispatch(addComment({ ...res }));
          navigate(0);
        } else {
          if (!chakraToast.isActive(id)) {
            chakraToast({
              id,
              status: "error",
              description: "You have to write something",
              isClosable: true,
              duration: 2000,
              position: "top",
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <Flex justifyContent="center">
      <Box pt="5rem" w="80%">
        <Flex
          as="form"
          gap={5}
          alignItems="center"
          justifyContent="center"
          p="20px"
          flexWrap="wrap"
          onSubmit={formik.handleSubmit}
        >
          <FormControl w="500px">
            <Input
              size={["xs", "sm", "md"]}
              focusBorderColor="brand.600"
              variant="flushed"
              type="text"
              name="comment"
              onChange={formik.handleChange}
              value={formik.values.comment}
              autoComplete="off"
              placeholder="Share any memories with your friends..."
            />
          </FormControl>
          <Button
            fontSize={{ base: "12px", md: "14px", lg: "16px" }}
            bg="brand.600"
            type="submit"
            border="1px  solid"
            borderColor="blackAlpha.300"
            h="32px"
            borderRadius="5px"
            cursor="pointer"
            color="white"
            fontWeight="normal"
            _hover={{
              color: "blackAlpha.700",
              bg: "white",
            }}
          >
            Post
          </Button>
        </Flex>
        <Divider borderColor="blackAlpha.400" mb="5rem" />
      </Box>
    </Flex>
  );
};

export default AddComments;
