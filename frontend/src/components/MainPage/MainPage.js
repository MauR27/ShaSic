import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import ParticleBackground from "../pageAnimations/ParticleBackground";
import { motion } from "framer-motion";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useState } from "react";

const MainPage = () => {
  const [logIn, setLogIn] = useState(true);

  return (
    <>
      <ParticleBackground />
      <Flex
        minH="100vh"
        alignItems="center"
        justifyContent="space-around"
        color="black"
        flexWrap="wrap"
        pt="50px"
      >
        <Flex
          flexDir="column"
          justifyContent="space-around"
          borderRadius="3px"
          minH="400px"
          w="800px"
          p="20px"
          m="20px 5px 10px 5px"
          bg="white"
          boxShadow="md"
        >
          <Heading
            fontSize={{ base: "2rem", sm: "3rem", md: "4rem", lg: "5rem" }}
            color="brand.800"
          >
            ShaSic
          </Heading>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Text
              m="20px 20px 20px 50px"
              fontSize={{ base: "14px", md: "16px", lg: "18px", xl: "20px" }}
            >
              Welcome to ShaSic, the platform for sharing memories and special
              moments! Shasic is the place where you can connect with friends
              and loved ones to share unforgettable moments.
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Text
              textAlign="end"
              m="10px"
              fontSize={{ base: "10px", md: "12px", lg: "14px", xl: "16px" }}
            >
              Share, Connect, and Celebrate Your Unforgettable Moments
            </Text>
          </motion.div>
        </Flex>
        <Box
          textAlign="center"
          bg="white"
          boxShadow="xl"
          mb="30px"
          borderRadius="3px"
        >
          <Text
            as="h1"
            fontSize={{ base: "25px", md: "28px", lg: "30px" }}
            fontWeight="bold"
          >
            {logIn ? "Sign In" : "Sign Up"}
          </Text>

          {logIn ? <LoginForm /> : <RegisterForm />}

          {!logIn ? (
            <Box mt="40px" fontSize={{ base: "14px", md: "16px", lg: "18px" }}>
              Already have an account?
              <motion.div
                initial={{ opacity: 1, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 0.8,
                }}
              >
                Login now!
              </motion.div>
            </Box>
          ) : (
            <Box mt="40px" fontSize={{ base: "14px", md: "16px", lg: "18px" }}>
              Are you a new customer?
              <motion.p
                initial={{ opacity: 1, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 0.8,
                }}
              >
                Register now!
              </motion.p>
            </Box>
          )}

          <Button
            fontWeight="normal"
            onClick={() => setLogIn(!logIn)}
            bg="black"
            color="white"
            _hover={{ bg: "blackAlpha.800" }}
            borderRadius="3px"
            m="20px 0 10px 0"
            w={100}
            fontSize={{ base: "12px", md: "14px", lg: "16px" }}
          >
            {logIn ? "Sign Up" : "Sign In"}
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default MainPage;
