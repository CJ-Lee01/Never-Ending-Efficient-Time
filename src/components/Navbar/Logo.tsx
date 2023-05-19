import { Link } from "@chakra-ui/next-js";
import NextLink from "next/link";
import {
  Button,
  Flex,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";

const Logo: FC = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      align="center"
      width={{ base: "auto", md: "auto" }}
      mr={{ base: 0, md: 2 }}
      cursor="pointer"
    >
      <Link as={NextLink} href="/">
        <Image
          src="/images/logo-cropped.png"
          height={14}
          borderRadius="10px 15px"
        />
      </Link>
    </Flex>
  );
};

export default Logo;

{
  /* <Link as={"a"} href="/">
        {colorMode === "light" ? (
          <Image src="/images/logoblack.png" width="64px" />
        ) : (
          <Image src="/images/teamlogowhite.png" width="64px" />
        )}
      </Link> */
}
