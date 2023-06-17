import {
  calculateHours,
  calculateMinutes,
  calculateSeconds,
} from "@/lib/timerFunctions";
import {
  Stack,
  VStack,
  Grid,
  chakra,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, Fragment } from "react";
import { LapDataType } from "@/lib/types";

interface LapsProps {
  LapsList: LapDataType[];
}

const Laps: FC<LapsProps> = ({ LapsList }) => {
  const bgColorScheme = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack
      border="1px solid"
      borderColor="gray.400"
      rounded="md"
      overflow="auto"
      maxHeight="550px"
      spacing={0}
    >
      {LapsList.map((lap, index) => (
        <Fragment key={index}>
          <Grid
            templateRows={{ base: "auto auto", md: "auto" }}
            w="100%"
            templateColumns={{ base: "1fr", sm: "5fr 1fr" }}
            p={{ base: 2, sm: 4 }}
            gap={3}
            _hover={{ bg: bgColorScheme }}
          >
            <Stack>
              <chakra.h3 fontWeight="bold" fontSize="lg">
                Lap
              </chakra.h3>
              <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
                {calculateHours(lap.totalSeconds)} :{" "}
                {calculateMinutes(lap.totalSeconds)} :{" "}
                {calculateSeconds(lap.totalSeconds)}
              </chakra.p>
            </Stack>
          </Grid>
          {LapsList.length - 1 !== index && <Divider m={0} />}
        </Fragment>
      ))}
    </VStack>
  );
};

export default Laps;
