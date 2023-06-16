import { EventListInfoContext } from "@/app/(User supposed to see if logged in)/calendar/page";
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
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, ChangeEventHandler, FC, useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";

const EditEventModal = ({ eventInfo }: { eventInfo: eventInformation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { events, pageUpdater } = useContext(EventListInfoContext);
  const [calendarEvent, editEvent] = useState<eventInformation>(eventInfo);

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    editEvent(x => {
      return {
        ...x,
        eventName: event.target.value
      }
    })
  }

  const descriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    editEvent(x => {
      return {
        ...x,
        event_description: event.target.value
      }
    })
  }

  const startChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    editEvent(x => {
      return {
        ...x,
        start_time: event.target.value
      }
    })
  }

  const endChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    editEvent(x => {
      return {
        ...x,
        end_time: event.target.value
      }
    })
  }

  return (
    <>
      <FiEdit
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
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box m={4}>
              <VStack spacing={5}>
                <FormControl>
                  <FormLabel>Event Title</FormLabel>
                  <Input
                    type="text"
                    size="md"
                    placeholder="Type Here"
                    borderColor="#E0E1E7"
                    onChange={titleChangeHandler}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Start Date/Time</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <Input type="datetime" size="md" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    borderColor="gray.300"
                    placeholder="Write your task description here"
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

export default EditEventModal;
