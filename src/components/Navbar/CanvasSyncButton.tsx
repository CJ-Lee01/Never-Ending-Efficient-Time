import { addBulkAnnoucement } from "@/lib/CRUD_Announcements";
import { addBulkTasks } from "@/lib/CRUD_Tasks";
import { ChangeEvent, useState } from "react";
import { AnnouncementData, TasksInformation } from "@/lib/types";
import {
  Button,
  Stack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
// import { LiaSyncSolid } from "react-icons/lia";
import { IoMdSync } from "react-icons/io";

interface api_canvassyncResponse {
  announcements: AnnouncementData[];
  assignments: TasksInformation[];
  error: string | null
}

const CanvasSyncButton = () => {
  const [canvasToken, setCanvasToken] = useState<string>("");
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
  };

  const syncHandler = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canvasToken) {
      alert("No Canvas Token has been entered.")
      return;
    }
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
    onClose();
    window.location.reload(); //still using this to refresh the announcements, sth will be done later.
  };
  
  const bgColour = useColorModeValue("white", "grey.500");

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<IoMdSync />}
        justifyContent={"left"}
        bg={bgColour}
      >
        Canvas Sync
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={syncHandler}>
          <ModalContent>
            <ModalHeader>Sync with Canvas</ModalHeader>
            <ModalCloseButton />
            <Stack p={4}>
              <Textarea placeholder="Enter your Canvas Token here. (WIP, you may submit with empty field)" />
            </Stack>
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

export default CanvasSyncButton;
