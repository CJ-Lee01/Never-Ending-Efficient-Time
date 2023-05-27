import { Grid, Stack, Image } from "@chakra-ui/react";
import { FC } from "react";

const CalendarGrid: FC = ({}) => {
  return (
    <Stack align="center">
      <Image
        src="/images/calendar-placeholder.png"
        borderRadius={20}
        w="600px"
      />
    </Stack>
  );
};

export default CalendarGrid;
