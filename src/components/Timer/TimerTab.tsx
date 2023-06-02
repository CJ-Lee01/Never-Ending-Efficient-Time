import { FC } from "react";
import { chakra, VStack, Text, Divider } from "@chakra-ui/react";

interface TimerTabProps {}

const TimerTab: FC<TimerTabProps> = ({}) => {
  return (
    <VStack
      border="1px solid"
      borderColor="gray.400"
      rounded="md"
      overflow="hidden"
      spacing={0}
    >
      <Text>Timer 1</Text>
      <Divider m={0} />
      <Text>Timer 2</Text>
    </VStack>
  );
};

export default TimerTab;
