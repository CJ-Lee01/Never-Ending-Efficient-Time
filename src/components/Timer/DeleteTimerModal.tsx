import { removeTimer } from "@/lib/CRUD_Timers";
import { TimerDataType } from "@/lib/types";
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
import { FC } from "react";
import { FiTrash2 } from "react-icons/fi";

interface DeleteTimerModalProps {
  timer: TimerDataType;
  pageUpdater: () => void;
}

const DeleteTimerModal: FC<DeleteTimerModalProps> = ({
  timer,
  pageUpdater,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    const error = await removeTimer(timer);
    onClose();
    pageUpdater();
  };

  return (
    <>
      <FiTrash2
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
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Timer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to delete this timer?
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              bg="#D11A2A"
              color="white"
              _hover={{ bg: "red.600" }}
              mr={3}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteTimerModal;
