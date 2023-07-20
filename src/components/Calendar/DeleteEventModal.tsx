import { EventListInfoContext } from "@/lib/PageUpdaters/CalendarPageUpdater";
import { removeEvent } from "@/lib/CRUD_Calendar";
import { eventInformation } from "@/lib/types";
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

const DeleteEventModal: FC<{ eventInfo: eventInformation }> = (
  { eventInfo }: { eventInfo: eventInformation }
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { events, pageUpdater } = useContext(EventListInfoContext);

  const deleteEventHandler = async () => {
    await removeEvent(eventInfo);
    onClose();
    pageUpdater();
  }

  return (
    <>
      <FiTrash2
        data-testid="DeleteEventIcon"
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
          <div data-testid="DeleteEventConfirmation">
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
                onClick={deleteEventHandler}
              >
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteEventModal;
