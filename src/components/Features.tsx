import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import NextLink from "next/link";
import featuresList from "@/lib/features";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon }: CardProps) => {
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

export default function Features() {
  const { colorMode, } = useColorMode();
  return (
    <Box p={14}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Key Features
        </Heading>
        <Text
          color={colorMode === "light" ? "gray.600" : "white.200"}
          fontSize={{ base: "sm", sm: "lg" }}
        >
          These are our key features that our application currently offers!
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {featuresList.map(feature => 
          <Card key={feature.heading}
            heading={feature.heading}
            icon={<Image src={feature.icon} w={10} h={10} alt={feature.heading}/>}
            description={feature.description}
            href={"#"}
          />)}
        </Flex>
      </Container>
    </Box>
  );
}
