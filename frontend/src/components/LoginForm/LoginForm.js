import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/post");
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await login({ values }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/post");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  return (
    <motion.div
      initial={{ x: "-100px", opacity: 1 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.1 }}
    >
      <Box h={[300, 330, 350]} w={[260, 300, 320]} p="20px" m="10px">
        <Flex
          flexDir="column"
          alignItems="center"
          as="form"
          onSubmit={formik.handleSubmit}
          color="black"
          minW="auto"
          gap={8}
        >
          <FormControl>
            <FormLabel
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              m="0"
            >
              Email Address
            </FormLabel>
            <Input
              size={["xs", "sm", "md"]}
              autoComplete="off"
              focusBorderColor="brand.600"
              variant="flushed"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              m="0"
            >
              Password
            </FormLabel>
            <Input
              variant="flushed"
              focusBorderColor="brand.600"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              size={["xs", "sm", "md"]}
            />
          </FormControl>

          {isLoading ? (
            <Spinner size="xl" mt="60px" />
          ) : (
            <Button
              type="submit"
              borderRadius="3"
              bg="brand.600"
              color="white"
              mt="60px"
              _hover={{
                bg: "brand.500",
              }}
              w={150}
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              fontWeight="normal"
            >
              Submit
            </Button>
          )}
        </Flex>
      </Box>
    </motion.div>
  );
};

export default LoginForm;
