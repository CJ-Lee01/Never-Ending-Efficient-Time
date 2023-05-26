import { Grid, Stack, Image } from "@chakra-ui/react";
import { FC } from "react";

const Clock: FC = ({}) => {
  return (
    <Stack align="center">
      <Image src="/images/stopwatch.png" borderRadius={20} w="600px" />
    </Stack>
  );
};

export default Clock;
