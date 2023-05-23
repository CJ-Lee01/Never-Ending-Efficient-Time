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
import AccessBar from "./AccessBar";

const Navbar: React.FC = () => {
  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.900")}
      height="64px"
      padding="8px 12px"
    >
      <Logo />
      <Spacer />
      {/* <AccessBar /> */}
      <AuthButtons />
    </Flex>
  );
};
export default Navbar;
