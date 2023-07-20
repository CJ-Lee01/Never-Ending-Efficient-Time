import { editTimer } from "@/lib/CRUD_Timers";
import {
  calculateTotalSeconds,
  calculateHours,
  calculateMinutes,
  calculateSeconds,
} from "@/lib/timerFunctions";
import { TimerDataType } from "@/lib/types";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  ModalBody,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { FC, FormEvent, useState } from "react";
import { FiEdit } from "react-icons/fi";
import EditTimerForm from "./EditTimerForm";

interface EditTimerModalProps {
  timer: TimerDataType;
}

const EditTimerModal: FC<EditTimerModalProps> = ({ timer }) => {
  const [timerTitle, setTimerTitle] = useState(timer.title);
  const [timerIntervals, setTimerIntervals] = useState(timer.intervals);
  const [timerIntervalTitle, setTimerIntervalTitle] = useState(
    timer.intervalName
  );
  const [timerHr, setTimerHr] = useState(calculateHours(timer.totalSeconds));
  const [timerMin, setTimerMin] = useState(
    calculateMinutes(timer.totalSeconds)
  );
  const [timerSec, setTimerSec] = useState(
    calculateSeconds(timer.totalSeconds)
  );
  const [timerSec2, setTimerSec2] = useState(
    calculateSeconds(timer.totalSecondsTwo ?? 0)
  );
  const [timerMin2, setTimerMin2] = useState(
    calculateMinutes(timer.totalSecondsTwo ?? 0)
  );
  const [timerHr2, setTimerHr2] = useState(
    calculateHours(timer.totalSecondsTwo ?? 0)
  );
  const [timerIntervalTitle2, setTimerIntervalTitle2] = useState(
    timer.intervalNameTwo ?? ""
  );
  const [isIntervalTimer, setIsIntervalTimer] = useState(
    timer.intervals > 1 ? true : false
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditTimer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTimer: TimerDataType = {
      ...timer,
      title: timerTitle,
      intervals: timerIntervals,
      intervalName: timerIntervalTitle,
      totalSeconds: calculateTotalSeconds(timerHr, timerMin, timerSec),
      totalSecondsTwo: isIntervalTimer
        ? calculateTotalSeconds(timerHr2, timerMin2, timerSec2)
        : undefined,
      intervalNameTwo: isIntervalTimer ? timerIntervalTitle2 : "",
    };
    const { data, error } = await editTimer(newTimer);
    error ? alert(error.message) : "";
    onClose();
  };

  const handleIntervalChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    const num = valueAsNumber;
    setTimerIntervals((prev) => num);
    if (num > 1) {
      setIsIntervalTimer(true);
    } else {
      setIsIntervalTimer(false);
    }
  };

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
        <form onSubmit={handleEditTimer}>
          <ModalContent>
            <ModalHeader>Edit Timer</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box m={4}>
                <VStack spacing={5}>
                  <FormControl>
                    <FormLabel>Timer Title</FormLabel>
                    <Input
                      type="text"
                      size="md"
                      borderColor="gray.300"
                      isRequired={true}
                      onChange={(event) => setTimerTitle(event.target.value)}
                      defaultValue={timer.title}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Number of Intervals</FormLabel>
                    <InputGroup borderColor="gray.300">
                      <NumberInput
                        min={1}
                        id="intervals"
                        inputMode="numeric"
                        isRequired={true}
                        onChange={handleIntervalChange}
                        defaultValue={timer.intervals}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                  <EditTimerForm
                    setIntervalTitle={setTimerIntervalTitle}
                    setTimerHr={setTimerHr}
                    setTimerMin={setTimerMin}
                    setTimerSec={setTimerSec}
                    timer={timer}
                    totalSeconds={timer.totalSeconds}
                    isSecond={false}
                  />

                  {timerIntervals > 1 ? (
                    <Stack>
                      <FormLabel>Next Interval: </FormLabel>
                      <EditTimerForm
                        setIntervalTitle={setTimerIntervalTitle2}
                        setTimerHr={setTimerHr2}
                        setTimerMin={setTimerMin2}
                        setTimerSec={setTimerSec2}
                        timer={timer}
                        totalSeconds={timer.totalSecondsTwo ?? 0}
                        isSecond={true}
                      />
                    </Stack>
                  ) : (
                    ""
                  )}
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

export default EditTimerModal;
