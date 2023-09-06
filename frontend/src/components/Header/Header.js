import React from "react";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import {
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation(0);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      as="nav"
      p="10px"
      h="45px"
      alignItems="center"
      position="fixed"
      w="100%"
      bg="brand.600"
      zIndex={1}
      boxShadow="xl"
    >
      {userInfo ? (
        <NavLink to="/post">
          <Heading color="white" display="flex" alignItems="center" gap={2}>
            <Text fontSize={{ base: "1.5rem", sm: "2rem", md: "2.5rem" }}>
              ShaSic
            </Text>
          </Heading>
        </NavLink>
      ) : (
        <NavLink to="/">
          <Heading color="white" display="flex" alignItems="center" gap={2}>
            <Text fontSize={{ base: "1.5rem", sm: "2rem", md: "2.5rem" }}>
              ShaSic
            </Text>
          </Heading>
        </NavLink>
      )}

      <Spacer />
      <HStack spacing="20px">
        {userInfo ? (
          <Flex alignItems="center" gap={{ base: "1", sm: "2", md: "3" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                color="white"
                icon={<HamburgerIcon />}
                _hover={{
                  bg: "none",
                  borderBottom: "1px solid white",
                }}
                _active={{
                  bg: "none",
                  borderBottom: "1px solid white",
                }}
                borderRadius="none"
                size={["xs", "sm", "md", "lg"]}
                variant="ghost"
              />
              <MenuList>
                <NavLink to="/profile">
                  <MenuItem icon={<CgProfile />}>
                    <Text fontSize={["xs", "sm", "md"]}>{userInfo.name}</Text>
                  </MenuItem>
                </NavLink>
                <MenuItem icon={<MdLogout />} onClick={logoutHandler}>
                  <Text fontSize={["xs", "sm"]}>Log Out</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : null}
      </HStack>
    </Flex>
  );
};

export default Header;
