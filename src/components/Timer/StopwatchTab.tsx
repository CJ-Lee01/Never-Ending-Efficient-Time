import { FC } from "react";
import { Button, Stack } from "@chakra-ui/react";

interface StopwatchTabProps {}

const StopwatchTab: FC<StopwatchTabProps> = ({}) => {
  return (
    <Stack>
      <Button>Select Stopwatch</Button>
      <Button bg="orange.300" color="white">
        Lap
      </Button>
    </Stack>
  );
};

export default StopwatchTab;
