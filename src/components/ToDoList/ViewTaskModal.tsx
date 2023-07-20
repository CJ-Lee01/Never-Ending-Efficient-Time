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
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { TaskInfoContext } from "./Tasks";
import { toDateTimeLocalHTMLString } from "@/lib/GenericHelper";

interface ViewTaskModalProps { }

const ViewTaskModal: FC<ViewTaskModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { task } = useContext(TaskInfoContext)


  return (
    <>
      <chakra.p
        data-testid="ViewTaskIcon"
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
        <form data-testid="ViewTaskModal">
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
                      name="Title"
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
                      <Input
                        name="Deadline"
                        type="datetime-local"
                        size="md"
                        isReadOnly
                        value={toDateTimeLocalHTMLString(task.deadline)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="Description"
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
        </form>
      </Modal>
    </>
  );
};

export default ViewTaskModal;
