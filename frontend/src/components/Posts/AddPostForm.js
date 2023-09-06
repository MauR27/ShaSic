import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { usePostDataMutation } from "../../slices/usersApiSlice";
import { addPost } from "../../slices/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AiOutlineUpload } from "react-icons/ai";
import bgTextColors from "../pageAnimations/bgColors-config";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const AddPostForm = () => {
  const [postMutation] = usePostDataMutation();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chakraToast = useToast();
  const id = "toast-id";

  const formik = useFormik({
    initialValues: {
      text: "",
      image: "",
      likes: [],
      bgColor: "linear(to-t, white, white)",
    },

    onSubmit: async (values) => {
      try {
        if (values.text) {
          const res = await postMutation({ values }).unwrap();
          dispatch(addPost({ ...res }));
          navigate(0);
        } else {
          toast.error("You have to post something!!");
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const uploadImage = async (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file) {
      setLoading(true);
    }
    if (file) {
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", "yhqerngl");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dky8ozvbq/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        formik.setFieldValue("image", imageUrl);
        setLoading(false);
      } else {
        console.error(
          "Failed to load image:",
          response.status,
          response.statusText
        );
      }
    }
  };

  return (
    <Flex justifyContent="center">
      <Box pt="5rem" onSubmit={formik.handleSubmit} w="80%">
        <Flex
          as="form"
          gap={5}
          alignItems="center"
          justifyContent="center"
          p="20px"
          flexWrap="wrap"
        >
          <FormControl w="500px">
            <Input
              size={["xs", "sm", "md"]}
              focusBorderColor="brand.600"
              variant="flushed"
              type="text"
              name="text"
              onChange={formik.handleChange}
              value={formik.values.text}
              autoComplete="off"
              placeholder="Share any memories with your friends..."
            />
            <Flex gap={2} mt="10px">
              {bgTextColors.map((data) => (
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.2 }}
                  key={data}
                >
                  <Button
                    _hover={{}}
                    _active={{}}
                    _focus={{
                      border: "1px solid ",
                      borderColor: "brand.100",
                    }}
                    size="xs"
                    bgGradient={data}
                    onClick={() => formik.setFieldValue("bgColor", data)}
                  ></Button>
                </motion.div>
              ))}
            </Flex>
          </FormControl>
          <Flex gap={4}>
            <FormControl w="130px">
              <Input
                type="file"
                name="file"
                multiple={false}
                accept=".png, .jpg, .jpeg"
                onChange={uploadImage}
                border="none"
                id="file"
                hidden
              />
              {!!formik.values.text ? (
                <FormLabel
                  fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                  gap={2}
                  display="flex"
                  htmlFor="file"
                  borderColor="brand.300"
                  bg="brand.600"
                  h="32px"
                  m="0"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  borderRadius="5px"
                  cursor="pointer"
                  color="white"
                  _hover={{
                    color: "blackAlpha.700",
                    border: "solid 1px ",
                    borderColor: "blackAlpha.300",
                    bg: "white",
                  }}
                >
                  <AiOutlineUpload />
                  Upload File
                </FormLabel>
              ) : (
                <>
                  <Box
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                    gap={2}
                    display="flex"
                    border="1px  solid"
                    borderColor="blackAlpha.300"
                    h="32px"
                    m="0"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => {
                      if (!chakraToast.isActive(id)) {
                        chakraToast({
                          id,
                          status: "error",
                          description:
                            "You have to write something to upload an image...",
                          isClosable: true,
                          duration: 2000,
                          position: "top",
                        });
                      }
                    }}
                    textAlign="center"
                    borderRadius="5px"
                    cursor="pointer"
                    color="blackAlpha.700"
                    _hover={{
                      color: "brand.600",
                      borderColor: "brand.200",
                    }}
                  >
                    <AiOutlineUpload />
                    Upload File
                  </Box>
                </>
              )}
            </FormControl>
            {loading ? (
              <Spinner color="brand.600" />
            ) : (
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
            )}
          </Flex>
        </Flex>
        <Divider borderColor="blackAlpha.400" mb="5rem" />
      </Box>
    </Flex>
  );
};

export default AddPostForm;
