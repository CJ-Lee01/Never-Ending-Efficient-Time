"use client"

import { addEvent, defaultEvent } from "@/lib/CRUD_Calendar";
import { EventListInfoContext } from "@/lib/PageUpdaters/CalendarPageUpdater";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, VStack, useDisclosure } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useContext, useState } from "react";

const AddEventButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { events, pageUpdater } = useContext(EventListInfoContext);
  const [newEvent, setEvent] = useState(defaultEvent);

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

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {data, error} = await addEvent(newEvent)
    if (error) {
      alert(error.message)
    }
    pageUpdater();
    onClose();
  }

  return <><Button onClick={onOpen}>Add event</Button>
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <form onSubmit={submitHandler}>
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
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
                    <Input
                      type="datetime-local"
                      size="md"
                      onChange={startChangeHandler}
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
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    borderColor="gray.300"
                    placeholder="Write your task description here"
                    onChange={descriptionChangeHandler}
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
    </Modal></>
}

export default AddEventButton;