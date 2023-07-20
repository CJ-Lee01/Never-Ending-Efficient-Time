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
import { FC, FormEvent, SetStateAction, useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TaskInfoContext } from "./Tasks";
import TaskFormComponemt from "./TaskForms";
import { editTask } from "@/lib/CRUD_Tasks";

interface EditTaskModalProps { }

const EditTaskModal: FC<EditTaskModalProps> = ({ }) => {
  const { task, pageUpdater } = useContext(TaskInfoContext)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskInfo, setTaskInfo] = useState(task)
  const [saveSuccess, setSaveSuccess] = useState(false); //for future use.

  const submitTasksHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await editTask(taskInfo)
    error ? alert(error.message) : setSaveSuccess(true);
    pageUpdater();
    onClose();
  }

  return (
    <>
      <FiEdit
        data-testid="EditTaskIcon"
        cursor="pointer"
        className="text-blue-500"
        size={20}
        onClick={onOpen}
      />

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitTasksHandler} data-testid="EditTaskForm">
            <TaskFormComponemt setFormInfo={setTaskInfo} taskToChange={taskInfo} />
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTaskModal;
