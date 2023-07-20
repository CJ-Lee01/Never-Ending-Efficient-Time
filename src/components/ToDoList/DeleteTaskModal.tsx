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
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { TaskInfoContext } from "./Tasks";
import { removeTask } from "@/lib/CRUD_Tasks";

interface DeleteTaskModalProps { }

const DeleteTaskModal: FC<DeleteTaskModalProps> = () => {
  const { task, pageUpdater } = useContext(TaskInfoContext)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteHandler = async () => {
    await removeTask(task);
    pageUpdater();
    onClose();
  }

  return (
    <>
      <FiTrash2
        data-testid="DeleteTaskIcon"
        cursor="pointer"
        className="text-red-500"
        size={20}
        onClick={onOpen}
      />

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <div data-testid="DeleteConfirmationModal">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              Are you sure you want to delete this task?
            </ModalBody>

            <ModalFooter>
              <Button
                variant="solid"
                bg="#D11A2A"
                color="white"
                _hover={{ bg: "red.600" }}
                mr={3}
                onClick={deleteHandler}
              >
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
};

export default DeleteTaskModal;
