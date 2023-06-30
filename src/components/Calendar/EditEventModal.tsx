import { EventListInfoContext } from "@/lib/PageUpdaters/CalendarPageUpdater";
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
import { ChangeEvent, ChangeEventHandler, FC, FormEvent, useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { editEvent } from "@/lib/CRUD_Calendar";

const EditEventModal = ({ eventInfo }: { eventInfo: eventInformation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { events, pageUpdater } = useContext(EventListInfoContext);
  const [calendarEvent, setEvent] = useState<eventInformation>(eventInfo);

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEvent(x => {
      return {
        ...x,
        event_name: event.target.value
      }
    })
  }

  const descriptionChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setEvent(x => {
      return {
        ...x,
        event_description: event.target.value
      }
    })
  }

  const startChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEvent(x => {
      return {
        ...x,
        start_time: new Date(event.target.value)
      }
    })
  }

  const endChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEvent(x => {
      return {
        ...x,
        end_time: new Date(event.target.value)
      }
    })
  }

  const submitEditHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await editEvent(calendarEvent)
    pageUpdater();
    onClose();
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
        <form onSubmit={submitEditHandler}>
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
                      value={eventInfo.event_name}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Start Date/Time</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <Input
                        type="datetime-local"
                        size="md"
                        onChange={startChangeHandler}
                        value={eventInfo.start_time.toLocaleString()}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>End Date/Time</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <Input
                        type="datetime-local"
                        size="md"
                        onChange={endChangeHandler}
                        value={eventInfo.end_time.toLocaleString()}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      borderColor="gray.300"
                      placeholder="Write your task description here"
                      onChange={descriptionChangeHandler}
                      value={eventInfo.event_description}
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

export default EditEventModal;
