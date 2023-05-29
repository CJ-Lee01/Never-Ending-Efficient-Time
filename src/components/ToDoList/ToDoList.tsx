import {
  Container,
  Divider,
  Grid,
  Stack,
  VStack,
  Button,
  chakra,
  Link,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
import { FC, Fragment } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddTaskModal from "./AddTaskModal";
import Tasks from "./Tasks";

interface ToDoListProps {}

const ToDoList: FC<ToDoListProps> = ({}) => {
  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <Stack mb={16} align="center" spacing={16}>
        <chakra.h1 fontSize="5xl" fontWeight="bold" textAlign="center" pt={16}>
          To-Do List
        </chakra.h1>
        <AddTaskModal />
      </Stack>
      <Tasks />
    </Container>
  );
};

export default ToDoList;
