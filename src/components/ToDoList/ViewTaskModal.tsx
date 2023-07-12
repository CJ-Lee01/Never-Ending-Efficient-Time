import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  VStack,
  chakra,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { TaskInfoContext } from "./Tasks";

interface ViewTaskModalProps {}

const ViewTaskModal: FC<ViewTaskModalProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {task, pageUpdater} = useContext(TaskInfoContext)


  return (
    <>
      <chakra.p
        as={Link}
        _hover={{ bg: useColorModeValue("gray.400", "gray.600") }}
        p={1}
        rounded="md"
        onClick={onOpen}
      >
        View
      </chakra.p>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box m={4}>
              <VStack spacing={5}>
                <FormControl>
                  <FormLabel>Task Title</FormLabel>
                  <Input
                    type="text"
                    size="md"
                    placeholder={task.title}
                    borderColor="#E0E1E7"
                    isReadOnly
                    value={task.title}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Deadline</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <Input type="datetime-local" size="md" isReadOnly value={task.deadline?.toISOString() ?? ""}/>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    borderColor="gray.300"
                    placeholder={task.description}
                    isReadOnly
                    value={task.description}
                  />
                </FormControl>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewTaskModal;
