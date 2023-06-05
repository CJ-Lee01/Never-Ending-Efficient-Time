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

interface AddTimerModalProps {}

const AddTimerModal: FC<AddTimerModalProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<AiOutlinePlus />}
        width="60%"
        bg="purple.400"
        _hover={{
          bg: "purple.300",
        }}
      >
        Add New Timer
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <form>
          <ModalContent>
            <ModalHeader>Add New Timer</ModalHeader>
            <ModalCloseButton />
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

export default AddTimerModal;
