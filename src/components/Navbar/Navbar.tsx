import {
  Flex,
  Image,
  useColorMode,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.900")}
      height="64px"
      padding="8px 12px"
    >
      <Logo />
      <Spacer />
      <AuthButtons />
    </Flex>
  );
};
export default Navbar;
