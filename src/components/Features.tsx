import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
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

export default function Features() {
  const { colorMode, toggleColorMode } = useColorMode();
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
          <Card
            heading={"Timer"}
            icon={<Image src="/images/stopwatch.png" w={10} h={10} />}
            description={
              "The Timer enables effective time management through the use of various features such as the Pomodoro Timer."
            }
            href={"#"}
          />
          <Card
            heading={"Calendar and Schedule"}
            icon={<Image src="/images/calendar.png" w={10} h={10} />}
            description={
              "This provides a convenient and easy way for users to view and manage their timetables and tasks."
            }
            href={"#"}
          />
          <Card
            heading={"Todo List"}
            icon={<Image src="/images/to-do-list.png" w={10} h={10} />}
            description={
              "This allows users to easily keep track of their tasks and deadlines."
            }
            href={"#"}
          />
          <Card
            heading={"NUS Mods Syncing"}
            icon={<Image src="/images/NUSMods.png" w={10} h={10} />}
            description={
              "Integration of the NUSMods schedule allows for convenient planning using the NUS lesson timetable."
            }
            href={"#"}
          />
          <Card
            heading={"Canvas Syncing"}
            icon={<Image src="/images/canvas1-logo.png" w={10} h={10} />}
            description={
              "Integration of Canvas API allows for integration of tasks, assignments and deadlines into the to-do lists and calendars."
            }
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  );
}
