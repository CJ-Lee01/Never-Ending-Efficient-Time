import { Grid, Stack, Image } from "@chakra-ui/react";
import { FC } from "react";

const TimerSettings: FC = ({}) => {
  return (
    <Stack align="center" flex={1} spacing={{ base: 5, md: 10 }}>
      <Image src="/images/WIP.png" borderRadius={20} w="600px" />
    </Stack>
  );
};

export default TimerSettings;
