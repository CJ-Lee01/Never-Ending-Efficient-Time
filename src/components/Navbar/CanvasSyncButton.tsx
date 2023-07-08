import { addBulkAnnoucement, getAnnouncements } from "@/lib/CRUD_Announcements";
import { addBulkTasks } from "@/lib/CRUD_Tasks";
import { Button, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { AnnouncementData, TasksInformation } from "@/lib/types";
interface api_canvassyncResponse {
  announcements: AnnouncementData[];
  assignments: TasksInformation[];
  error: string | null
}
const CanvasSyncButton = () => {

  const [canvasToken, setCanvasToken] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetcher = async (url: URL | RequestInfo) => {
    const header = new Headers();
    header.append("Authorization", `Bearer ${canvasToken}`);
    return fetch(url, {
      method: "GET",
      headers: header
    }).then(res => (res.json()))
  }

  const changeTokenHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCanvasToken(event.target.value);
  }

  const syncHandler = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canvasToken) {
      alert("No Canvas Token has been entered.")
      return;
    }
    console.log(`${location.hostname}/api/canvassync`)
    const canvasData = await fetcher(`/api/canvassync`) as api_canvassyncResponse;
    if (canvasData.error) {
      alert(canvasData.error)
      return;
    }
    const announcementResponse = await addBulkAnnoucement(canvasData.announcements);
    if (announcementResponse.error) {
      alert(announcementResponse.error.message);
    }
    const taskResponse = await addBulkTasks(canvasData.assignments);
    if (taskResponse.error) {
      alert(taskResponse.error.message);
    }
    onClose()
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
          <Input placeholder="Enter your Canvas Token here. (WIP, you may submit with empty field)" onChange={changeTokenHandler} />
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