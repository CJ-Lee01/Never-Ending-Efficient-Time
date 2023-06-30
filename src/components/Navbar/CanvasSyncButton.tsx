import { addBulkAnnoucement, getAnnouncements } from "@/lib/CRUD_Announcements";
import { addBulkTasks } from "@/lib/CRUD_Tasks";
import { getCanvasAnnouncements, getCanvasAssignments } from "@/lib/Canvas/CanvasAPI";
import { Button, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { er } from "@fullcalendar/core/internal-common";
import { ChangeEvent, useState } from "react";

const CanvasSyncButton = () => {

  const [canvasToken, setCanvasToken] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeTokenHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCanvasToken(event.target.value);
  }

  const syncHandler = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const announcementResponse = await addBulkAnnoucement(getCanvasAnnouncements(canvasToken));
    if (announcementResponse.error) {
      alert(announcementResponse.error.message);
    }
    const taskResponse = await addBulkTasks(getCanvasAssignments(canvasToken));
    if (taskResponse.error) {
      alert(taskResponse.error.message);
    }
    window.location.reload();
    
  }

  return <>
    <Button onClick={onOpen}>Sync with Canvas</Button>
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered>
                <ModalOverlay />
        <form onSubmit={syncHandler}>
        <ModalContent>
          <ModalHeader>Sync with Canvas</ModalHeader>
          <ModalCloseButton />
          <Input placeholder="Enter your Canvas Token here. (WIP, you may submit with empty field)"/>
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
  </>;
}

export default CanvasSyncButton;