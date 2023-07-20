import { addTask } from "@/lib/CRUD_Tasks";
import { TasksInformation } from "@/lib/types";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TaskInfoContext } from "./Tasks";
import TaskFormComponemt from "./TaskForms";
import defaultTask from "./DefaultTask";

interface AddTaskModalProps { }

const AddTaskModal: FC<AddTaskModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { task, pageUpdater } = useContext(TaskInfoContext)


  const [taskInfo, updateTaskInfo] = useState<TasksInformation>({
    canvas_id: -1,
    title: "No title",
    description: "No Description",
    deadline: new Date(),
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
        deadline: new Date(event.target.value)
      }
    });
  }

  const submitTasksHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await addTask(taskInfo)
    error ? alert(error.message) : setSaveSuccess(true);
    pageUpdater();
    onClose();
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
        <form onSubmit={submitTasksHandler} data-testid="AddTaskForm">
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Add New Task</ModalHeader>
            <ModalCloseButton />
            <TaskFormComponemt setFormInfo={updateTaskInfo} taskToChange={defaultTask} />
            <ModalFooter>
              <Button
                variant="solid"
                bg="#0D74FF"
                color="white"
                _hover={{ bg: "blue.600" }}
                mr={3}
                type="submit"
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddTaskModal;
