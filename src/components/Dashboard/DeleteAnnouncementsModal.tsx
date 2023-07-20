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
import { Dispatch, FC, SetStateAction } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AnnouncementData } from "@/lib/types";
import { removeAnnouncement } from "@/lib/CRUD_Announcements";
import { PostgrestError } from "@supabase/supabase-js";

const DeleteAnnouncementModal: FC<{
  announcement: AnnouncementData;
  setAnnouncements: Dispatch<
    SetStateAction<{
      data: AnnouncementData[];
      error: PostgrestError | null;
    }>
  >;
}> = ({ announcement, setAnnouncements }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteHandler = async () => {
    await removeAnnouncement(announcement);
    setAnnouncements((announcementList) => {
      return {
        error: announcementList.error,
        data: announcementList.data.filter((item) => item != announcement),
      };
    });
    onClose();
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
          <ModalHeader>Delete Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to delete this Announcement?
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              bg="#D11A2A"
              color="white"
              _hover={{ bg: "red.600" }}
              mr={3}
              onClick={deleteHandler}
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

export default DeleteAnnouncementModal;
