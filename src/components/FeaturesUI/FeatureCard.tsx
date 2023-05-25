import { Stack, Flex, useColorModeValue, Heading, Button, Box, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import NextLink from "next/link";



interface CardProps {
    heading: string;
    description: string;
    icon: ReactElement;
    href: string;
}
  
const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
      <Box
        maxW={{ base: "full", md: "275px" }}
        w={"full"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
      >
        <Stack align={"start"} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={"center"}
            justify={"center"}
            color={"white"}
            rounded={"full"}
            bg={useColorModeValue("gray.100", "gray.700")}
          >
            {icon}
          </Flex>
          <Box mt={2}>
            <Heading size="md">{heading}</Heading>
            <Text mt={1} fontSize={"sm"}>
              {description}
            </Text>
          </Box>
          <Button
            as={NextLink}
            href="signup"
            variant={"link"}
            colorScheme={"blue"}
            size={"sm"}
          >
            Learn more
          </Button>
        </Stack>
      </Box>
    );
  };