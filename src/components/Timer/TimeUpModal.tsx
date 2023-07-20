import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";

interface TimeUpModalProps {
  isTimeUp: boolean;
  setIsTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
  intervalTitle: string;
  isIntervalComplete: boolean;
}

const TimeUpModal: FC<TimeUpModalProps> = ({
  isTimeUp,
  setIsTimeUp,
  intervalTitle,
  isIntervalComplete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //The Audio constructor is not supported by Node and therefore needs to be inside the function instead.
  let ringtone = new Audio("sounds/ringtone.mp3");

  useEffect(() => {
    if (isTimeUp) {
      ringtone.play();
    }
  }, [isTimeUp]);

  const handleClose = () => {
    ringtone.pause();
    setIsTimeUp(false);
  };

  //for Time's Up! being the modal header, usng the ' normally gives
  //Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
  //And therefore to fix it, refer to
  //https://github.com/mateusfg7/portifolio/commit/a89379a5b3fcaea2dd035fd60a0dbbe9490050d7

  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={isTimeUp}
      onClose={handleClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Time&apos;s Up!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} fontSize={18}>
          <Stack direction={"column"} gap={2}>
            <Text>
              <Text as="b">{intervalTitle}</Text> Interval Done! <br />
            </Text>
            <Divider></Divider>
            <Text>
              {isIntervalComplete
                ? " Interval Timer Complete!"
                : " Press the Next Interval button to continue!"}
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimeUpModal;
