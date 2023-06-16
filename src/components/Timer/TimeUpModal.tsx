import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";

let ringtone = new Audio("sounds/ringtone.mp3");
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

  useEffect(() => {
    if (isTimeUp) {
      ringtone.play();
      ringtone.loop = true;
    } else {
      ringtone.pause();
    }
  }, [isTimeUp]);

  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={isTimeUp}
      onClose={() => setIsTimeUp(false)}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Time's Up!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} fontSize={18}>
          <Text>
            {intervalTitle} Interval Done! <br />
            {isIntervalComplete
              ? " Interval Timer Complete!"
              : " Press the Next Interval button to continue!"}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimeUpModal;
