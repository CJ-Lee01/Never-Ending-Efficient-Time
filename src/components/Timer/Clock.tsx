import {
  Grid,
  Stack,
  Text,
  Flex,
  chakra,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";

const Clock: FC = ({}) => {
  return (
    <Stack direction={"column"}>
      <chakra.h1
        fontSize={{ base: "4xl", md: "5xl" }}
        fontWeight="bold"
        textAlign="left"
      >
        Pomodoro Timer
      </chakra.h1>
      <Stack direction={"row"} py={6}>
        <Flex
          borderColor={"green.600"}
          borderWidth={3}
          borderRadius={10}
          padding={2}
        >
          1/4
        </Flex>
        <chakra.h3 fontSize="3xl" textAlign="center" pl={6}>
          Short break
        </chakra.h3>
      </Stack>
      <Flex
        borderColor={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
        borderWidth={3}
        borderRadius={10}
        justify="center"
      >
        <Grid
          templateRows="1fr"
          templateColumns="5fr 1fr 5fr 1fr 5fr"
          gap={1}
          padding={6}
        >
          <Text align={"center"} variant={"timeText"}>
            00
          </Text>
          <Text align={"center"} variant={"timeText"}>
            :
          </Text>
          <Text align={"center"} variant={"timeText"}>
            10
          </Text>
          <Text align={"center"} variant={"timeText"}>
            :
          </Text>
          <Text align={"center"} variant={"timeText"}>
            30
          </Text>
        </Grid>
      </Flex>
      <Stack align={"center"} spacing={5} pt={8}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justifyContent={"right"}
        >
          <Button bg={"green.400"} color={"white"} width={"300px"}>
            Start
          </Button>
          <Button width={"300px"}>Stop</Button>
        </Stack>
        <Button
          bg={"red.500"}
          color={"white"}
          width={"300px"}
          justifyContent={"center"}
        >
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};

export default Clock;
