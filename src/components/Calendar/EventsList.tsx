import {
  Stack,
  Flex,
  Divider,
  Grid,
  VStack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, Fragment } from "react";
import DeleteEventModal from "./DeleteEventModal";
import EditEventModal from "./EditEventModal";

interface EventsListProps {}

const EventsList: FC<EventsListProps> = ({}) => {
  const bgColorScheme = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Stack spacing={1}>
      <Flex justify="center" mb={1}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          Events
        </chakra.h3>
      </Flex>
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
                  {event.title}
                </chakra.h3>
                <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
                  Date: {event.date}
                </chakra.p>
              </Stack>
              <Stack
                spacing={{ base: 5, md: 4 }}
                direction="row"
                fontSize={{ base: "sm", sm: "md" }}
                justifySelf="flex-end"
                alignItems="center"
              >
                <EditEventModal />
                <DeleteEventModal />
              </Stack>
            </Grid>
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

const events: EventAttributes[] = [
  {
    title: "Task 1",
    date: "21 Jan 2022",
  },
  {
    title: "Create professional Web Application with Nextjs and ChakraUI",
    date: "20 Jun 2021",
  },
  {
    title: `Get Good Grades for University`,
    date: "31 Sept 2022",
  },
  {
    title: `Get Good Grades for University`,
    date: "31 Sept 2022",
  },
  {
    title: `Get Good Grades for University`,
    date: "31 Sept 2022",
  },
  {
    title: `Get Good Grades for University`,
    date: "31 Sept 2022",
  },
  {
    title: `Get Good Grades for University`,
    date: "31 Sept 2022",
  },
  {
    title: `Get Good Grades for University`,
    date: "31 Sept 2022",
  },
];

export default EventsList;
