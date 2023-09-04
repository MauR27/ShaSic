import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react";
import * as yup from "yup";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/post");
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: yup.object({
      name: yup.string().max(10, "Must be 10 caracters or less"),
    }),
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          const res = await register({ values }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate("/post");
        } catch (err) {
          console.error(err);
        }
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
          gap={8}
          as="form"
          onSubmit={formik.handleSubmit}
          color="black"
          flexDir="column"
          alignItems="center"
        >
          <Flex gap={2}>
            <FormControl flex={1}>
              <FormLabel
                fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                m="0"
              >
                Name
              </FormLabel>
              <Input
                autoComplete="off"
                size={["xs", "sm", "md"]}
                focusBorderColor="brand.600"
                variant="flushed"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name ? (
                <Text
                  position="fixed"
                  color="red"
                  fontSize={{ base: "8px", md: "10px", lg: "12px" }}
                >
                  {formik.errors.name}
                </Text>
              ) : null}
            </FormControl>
            <FormControl flex={2}>
              <FormLabel
                fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                m="0"
              >
                Email
              </FormLabel>
              <Input
                variant="flushed"
                autoComplete="off"
                focusBorderColor="brand.600"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                size={["xs", "sm", "md"]}
              />
            </FormControl>
          </Flex>
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
          <FormControl>
            <FormLabel
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              m="0"
            >
              Confirm password
            </FormLabel>
            <Input
              variant="flushed"
              focusBorderColor="brand.600"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              size={["xs", "sm", "md"]}
            />
          </FormControl>

          {isLoading ? (
            <Spinner size="xl" mt="20px" />
          ) : (
            <Button
              fontWeight="normal"
              bg="brand.600"
              color="white"
              type="submit"
              borderRadius="3"
              mt="20px"
              _hover={{ bg: "brand.500" }}
              w={150}
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
            >
              Submit
            </Button>
          )}
        </Flex>
      </Box>
    </motion.div>
  );
};

export default RegisterForm;
