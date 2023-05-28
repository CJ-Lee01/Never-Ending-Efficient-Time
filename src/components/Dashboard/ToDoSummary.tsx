import { Fragment } from "react";
import {
  Container,
  Box,
  chakra,
  Flex,
  Stack,
  VStack,
  HStack,
  Grid,
  Icon,
  Divider,
  Link,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaRegComment, FaRegHeart, FaRegEye } from "react-icons/fa";

interface ItemAttributes {
  title: string;
  created_at: string;
}

const items: ItemAttributes[] = [
  {
    title: "Task 1",
    created_at: "21 Jan 2022",
  },
  {
    title: "Create professional Web Application with Nextjs and ChakraUI",
    created_at: "20 Jun 2021",
  },
  {
    title: `Get Good Grades for University`,
    created_at: "31 Sept 2022",
  },
];

const ToDoSummary = () => {

  const bgColorScheme = useColorModeValue("gray.200", "gray.700");
  const otherStuffPlsExplainRichie = useColorModeValue("gray.600", "gray.300");
  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <Flex justify="left" mb={3}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          To-Do List
        </chakra.h3>
      </Flex>
      <VStack
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        {items.map((item, index) => (
          <Fragment key={index}>
            <Grid
              templateRows={{ base: "auto auto", md: "auto" }}
              w="100%"
              templateColumns={{ base: "unset", md: "5fr 3fr" }}
              p={{ base: 2, sm: 4 }}
              gap={3}
              alignItems="center"
              _hover={{ bg: bgColorScheme }}
            >
              <Stack gridColumnEnd={{ base: "span 2", md: "unset" }}>
                <chakra.h3 fontWeight="bold" fontSize="lg">
                  {item.title}
                </chakra.h3>
                <chakra.p
                  fontWeight="medium"
                  fontSize="sm"
                  color={otherStuffPlsExplainRichie}
                >
                  Created: {item.created_at}
                </chakra.p>
              </Stack>
              <Stack
                spacing={2}
                direction="row"
                fontSize={{ base: "sm", sm: "md" }}
                justifySelf="flex-end"
                alignItems="center"
              >
                {["Manage", "Edit"].map((label, index) => (
                  <ItemSettingLink key={index} label={label} />
                ))}
              </Stack>
            </Grid>
            {items.length - 1 !== index && <Divider m={0} />}
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};

const ItemSettingLink = ({ label }: { label: string }) => {
  return (
    <chakra.p
      as={Link}
      _hover={{ bg: useColorModeValue("gray.400", "gray.600") }}
      p={1}
      rounded="md"
    >
      {label}
    </chakra.p>
  );
};

export default ToDoSummary;
