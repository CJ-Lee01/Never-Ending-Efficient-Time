import { addTask } from "@/lib/CRUD_Tasks";
import { supabaseUser } from "@/lib/initSupabase";
import { TasksInformation } from "@/lib/types";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const TaskFormComponemt: FC<Dispatch<SetStateAction<TasksInformation>>> = (setFormInfo: Dispatch<SetStateAction<TasksInformation>>) => {

  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormInfo((prevTask) => {
      return {
        ...prevTask,
        title: event.target.value
      }
    });
  }

  const updateDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setFormInfo((prevTask) => {
      return {
        ...prevTask,
        description: event.target.value
      }
    });
  }

  const updateDeadline = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormInfo((prevTask) => {
      return {
        ...prevTask,
        deadline: event.target.value
      }
    });
  }


  return (
    <>
      <ModalBody pb={6}>
        <Box m={4}>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Task Title</FormLabel>
              <Input
                type="text"
                size="md"
                placeholder="Type Here"
                borderColor="gray.300"
                onChange={updateTitle}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Deadline</FormLabel>
              <InputGroup borderColor="gray.300">
                <Input type="date" size="md" onChange={updateDeadline} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                borderColor="gray.300"
                placeholder="Write your task description here"
                onChange={updateDescription}
              />
            </FormControl>
          </VStack>
        </Box>
      </ModalBody>
    </>
  );
};

export default TaskFormComponemt;
