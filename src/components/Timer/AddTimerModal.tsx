import { addTimer } from "@/lib/CRUD_Timers";
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
  VStack,
  Stack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
} from "@chakra-ui/react";
import { FC, FormEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddTimerForm from "./AddTimerForm";
import { calculateTotalSeconds } from "@/lib/timerFunctions";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface AddTimerModalProps {}

const AddTimerModal: FC<AddTimerModalProps> = ({}) => {
  const [timerTitle, setTimerTitle] = useState("");
  const [timerIntervals, setTimerIntervals] = useState(1);
  const [timerIntervalTitle, setTimerIntervalTitle] = useState("");
  const [timerHr, setTimerHr] = useState(0);
  const [timerMin, setTimerMin] = useState(0);
  const [timerSec, setTimerSec] = useState(0);
  const [timerSec2, setTimerSec2] = useState(0);
  const [timerMin2, setTimerMin2] = useState(0);
  const [timerHr2, setTimerHr2] = useState(0);
  const [timerIntervalTitle2, setTimerIntervalTitle2] = useState("");
  const [isIntervalTimer, setIsIntervalTimer] = useState(false);

  const handleSubmitTimer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTimer: TimerDataType = {
      title: timerTitle,
      intervals: timerIntervals,
      intervalName: timerIntervalTitle,
      totalSeconds: calculateTotalSeconds(timerHr, timerMin, timerSec),
      totalSecondsTwo: isIntervalTimer
        ? calculateTotalSeconds(timerHr2, timerMin2, timerSec2)
        : undefined,
      intervalNameTwo: isIntervalTimer ? timerIntervalTitle2 : undefined,
    };
    const { data, error } = await addTimer(newTimer);
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<AiOutlinePlus />}
        width="60%"
        bg="purple.400"
        _hover={{
          bg: "purple.300",
        }}
      >
        Add New Timer
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmitTimer}>
          <ModalContent>
            <ModalHeader>Add New Timer</ModalHeader>
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
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Number of Intervals{" "}
                      <Tooltip
                        label="The Intervals will cycle between the two given Intervals"
                        fontSize="sm"
                      >
                        <InfoOutlineIcon />
                      </Tooltip>
                    </FormLabel>
                    <InputGroup borderColor="gray.300">
                      <NumberInput
                        defaultValue={1}
                        min={1}
                        id="intervals"
                        inputMode="numeric"
                        isRequired={true}
                        onChange={handleIntervalChange}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                  <AddTimerForm
                    setIntervalTitle={setTimerIntervalTitle}
                    setTimerHr={setTimerHr}
                    setTimerMin={setTimerMin}
                    setTimerSec={setTimerSec}
                  />

                  {timerIntervals > 1 ? (
                    <Stack>
                      <FormLabel>Next Interval: </FormLabel>
                      <AddTimerForm
                        setIntervalTitle={setTimerIntervalTitle2}
                        setTimerHr={setTimerHr2}
                        setTimerMin={setTimerMin2}
                        setTimerSec={setTimerSec2}
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

export default AddTimerModal;
