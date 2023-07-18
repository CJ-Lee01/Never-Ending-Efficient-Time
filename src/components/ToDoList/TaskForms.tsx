import { toDateTimeLocalHTMLString } from "@/lib/GenericHelper";
import { TasksInformation } from "@/lib/types";
import {
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

const TaskFormComponemt = (
  { setFormInfo,
    taskToChange }
    : {
      setFormInfo: Dispatch<SetStateAction<TasksInformation>>,
      taskToChange: TasksInformation
    }
) => {

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
      console.log(prevTask)
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
        deadline: new Date(event.target.value)
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
                placeholder={taskToChange?.title || "Type Here"}
                borderColor="gray.300"
                onChange={updateTitle}
                value={taskToChange?.title}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Deadline</FormLabel>
              <InputGroup borderColor="gray.300">
                <Input type="datetime-local" 
                data-testid="DeadlineInput"
                size="md" 
                onChange={updateDeadline}
                value={taskToChange.deadline && toDateTimeLocalHTMLString(taskToChange.deadline)} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                borderColor="gray.300"
                placeholder={taskToChange?.description || "Write your task description here"}
                onChange={updateDescription}
                value={taskToChange.description}
              />
            </FormControl>
          </VStack>
        </Box>
      </ModalBody>
    </>
  );
};

export default TaskFormComponemt;
