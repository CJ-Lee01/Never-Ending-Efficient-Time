import { Link } from "@chakra-ui/next-js";
import NextLink from "next/link";
import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";

const Logo: FC = () => {
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
          alt="NEET"
        />
      </Link>
    </Flex>
  );
};

export default Logo;
