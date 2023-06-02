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

const DeleteEventModal: FC = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to delete this event?
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              bg="#D11A2A"
              color="white"
              _hover={{ bg: "red.600" }}
              mr={3}
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

export default DeleteEventModal;