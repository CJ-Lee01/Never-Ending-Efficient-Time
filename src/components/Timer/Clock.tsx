import {
  Grid,
  Stack,
  Text,
  Flex,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import TimeToggleButtons from "./TimeToggleButtons";
import { TimerDataContext } from "./TimerDataContextProvider";
import {
  calculateHours,
  calculateMinutes,
  calculateSeconds,
} from "@/lib/timerFunctions";

interface ClockProps {
  counterSeconds: number;
  counterIntervals: number;
  intervalTitle: string;
}

const Clock: FC<ClockProps> = ({
  counterSeconds,
  counterIntervals,
  intervalTitle,
}) => {
  const hr = calculateHours(counterSeconds);
  const min = calculateMinutes(counterSeconds);
  const sec = calculateSeconds(counterSeconds);

  const { timerData } = useContext(TimerDataContext);

  return (
    <Stack direction={"column"}>
      <chakra.h1
        fontSize={{ base: "4xl", md: "5xl" }}
        fontWeight="bold"
        textAlign="left"
        data-testid="timerTitle"
      >
        {timerData.title}
      </chakra.h1>
      <Stack direction={"row"} py={6}>
        <Flex
          borderColor={"green.600"}
          borderWidth={3}
          borderRadius={10}
          padding={2}
        >
          {counterIntervals}/{timerData.intervals}
        </Flex>
        <chakra.h3
          fontSize="3xl"
          textAlign="center"
          pl={6}
          data-testid="intervalTitle"
        >
          {intervalTitle}
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
          <Text align={"center"} variant={"timeText"} data-testid="hourText">
            {hr < 10 ? "0" + hr : hr}
          </Text>
          <Text align={"center"} variant={"timeText"}>
            :
          </Text>
          <Text align={"center"} variant={"timeText"} data-testid="minuteText">
            {min < 10 ? "0" + min : min}
          </Text>
          <Text align={"center"} variant={"timeText"}>
            :
          </Text>
          <Text align={"center"} variant={"timeText"} data-testid="secondText">
            {sec < 10 ? "0" + sec : sec}
          </Text>
        </Grid>
      </Flex>
      <TimeToggleButtons></TimeToggleButtons>
    </Stack>
  );
};

export default Clock;
