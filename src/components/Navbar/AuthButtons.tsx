import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Flex,
  Stack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import NextLink from "next/link";

const AuthButtons: FC = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button
          href="signin"
          as={NextLink}
          fontSize={"sm"}
          fontWeight={400}
          variant={"link"}
        >
          Sign In
        </Button>

        <Button
          as={NextLink}
          //display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          href="signup"
          bg={useColorModeValue("orange.400", "green.400")}
          _hover={{
            bg: useColorModeValue("orange.300", "green.300"),
          }}
        >
          Sign Up
        </Button>
      </Stack>
    </Flex>
  );
};

export default AuthButtons;
