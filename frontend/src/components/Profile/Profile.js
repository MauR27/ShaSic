import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import ParticleBackground from "../pageAnimations/ParticleBackground";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const chakraToast = useToast();
  const id = "chakra-toast";

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      if (!chakraToast.isActive(id)) {
        chakraToast({
          id,
          status: "error",
          description: "Password do not match",
          isClosable: true,
          duration: 2000,
          position: "top",
        });
      }
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        if (!chakraToast.isActive(id)) {
          chakraToast({
            id,
            status: "success",
            description: "Profile has been updated",
            isClosable: true,
            duration: 2000,
            position: "top",
          });
        }
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <ParticleBackground />

      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Box
          textAlign="center"
          bg="white"
          boxShadow="xl"
          mb="30px"
          borderRadius="3px"
        >
          <Text
            mb="20px"
            as="h1"
            fontSize={{ base: "25px", md: "28px", lg: "30px" }}
            fontWeight="bold"
          >
            Update Profile
          </Text>

          <Flex justifyContent="center" alignItems="center">
            <Box h={[300, 330, 350]} w={[260, 300, 320]} m="10px">
              <Flex
                gap={8}
                as="form"
                onSubmit={submitHandler}
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    size={["xs", "sm", "md"]}
                  />
                </FormControl>

                {isLoading ? (
                  <Spinner size="xl" mt="10px" />
                ) : (
                  <Button
                    fontWeight="normal"
                    bg="brand.600"
                    color="white"
                    type="submit"
                    borderRadius="3"
                    mt="10px"
                    _hover={{ bg: "brand.500" }}
                    w={130}
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                  >
                    Submit
                  </Button>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Profile;
