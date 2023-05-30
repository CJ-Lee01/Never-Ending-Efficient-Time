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
import { ChangeEvent, FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface AddTaskModalProps { }

const AddTaskModal: FC<AddTaskModalProps> = ({ }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [taskInfo, updateTaskInfo] = useState<TasksInformation>({
    canvas_id: -1,
    title: "No title",
    description: "No Description",
    deadline: "",
    is_complete: false,
  })

  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateTaskInfo((prevTask) => {
      return {
        ...prevTask,
        title: event.target.value
      }
    });
  }

  const updateDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    updateTaskInfo((prevTask) => {
      return {
        ...prevTask,
        description: event.target.value
      }
    });
  }

  const updateDeadline = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateTaskInfo((prevTask) => {
      return {
        ...prevTask,
        deadline: event.target.value
      }
    });
  }

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<AiOutlinePlus />}
        width="40%"
        bg="purple.400"
        _hover={{
          bg: "purple.300",
        }}
      >
        Add New Task
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
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

          <ModalFooter>
            <Button
              variant="solid"
              bg="#0D74FF"
              color="white"
              _hover={{ bg: "blue.600" }}
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskModal;
