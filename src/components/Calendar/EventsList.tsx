import {
  Stack,
  Flex,
  Divider,
  Grid,
  VStack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, Fragment, useContext } from "react";
import DeleteEventModal from "./DeleteEventModal";
import EditEventModal from "./EditEventModal";

import { EventListInfoContext } from "@/lib/PageUpdaters/CalendarPageUpdater";
import AddEventButton from "./AddEventButton";
interface EventsListProps { }

const EventsList: FC<EventsListProps> = ({ }) => {
  const { events, pageUpdater } = useContext(EventListInfoContext);
  const bgColorScheme = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Stack spacing={1}>
      <Flex justify="center" mb={1}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          Events
        </chakra.h3>
      </Flex>
      <AddEventButton />
      <VStack
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        overflow="auto"
        maxHeight="550px"
        spacing={0}
      >
        {events.map((event, index) => (
          <Fragment key={index}>
            <div data-testid="eventCardComponent">
              <Grid
                templateRows={{ base: "auto auto", md: "auto" }}
                w="100%"
                templateColumns={{ base: "5fr 2fr", md: "5fr 2fr" }}
                p={{ base: 2, sm: 4 }}
                gap={3}
                alignItems="center"
                _hover={{ bg: bgColorScheme }}
              >
                <Stack>
                  <chakra.h3 fontWeight="bold" fontSize="lg">
                    {event.event_name}
                  </chakra.h3>
                  <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
                    Start Date/Time: {event.start_time.toLocaleString()}
                  </chakra.p>
                  <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
                    End Date/Time: {event.end_time.toLocaleString()}
                  </chakra.p>
                </Stack>
                <Stack
                  spacing={{ base: 5, md: 4 }}
                  direction="row"
                  fontSize={{ base: "sm", sm: "md" }}
                  justifySelf="flex-end"
                  alignItems="center"
                >
                  <EditEventModal eventInfo={event} />
                  <DeleteEventModal eventInfo={event} />
                </Stack>
              </Grid>
            </div>
            {events.length - 1 !== index && <Divider m={0} />}
          </Fragment>
        ))}
      </VStack>
    </Stack>
  );
};

interface EventAttributes {
  title: string;
  date: string;
}


export default EventsList;
