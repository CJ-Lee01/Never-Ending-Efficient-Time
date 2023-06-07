import {
  calculateHours,
  calculateMinutes,
  calculateSeconds,
} from "@/lib/timerFunctions";
import { TimerDataType } from "@/lib/types";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  NumberInput,
  NumberInputField,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";

interface EditTimerFormProps {
  setIntervalTitle: (str: string) => void;
  setTimerHr: (num: number) => void;
  setTimerMin: (num: number) => void;
  setTimerSec: (num: number) => void;
  timer: TimerDataType;
  totalSeconds: number;
  isSecond: boolean;
}

const EditTimerForm: FC<EditTimerFormProps> = ({
  setIntervalTitle,
  setTimerHr,
  setTimerMin,
  setTimerSec,
  timer,
  totalSeconds,
  isSecond,
}) => {
  return (
    <>
      <FormControl>
        <FormLabel>Interval Title</FormLabel>
        <InputGroup borderColor="gray.300">
          <Input
            type="text"
            size="md"
            onChange={(event) => setIntervalTitle(event.target.value)}
            isRequired={true}
            defaultValue={isSecond ? timer.intervalNameTwo : timer.intervalName}
          />
        </InputGroup>
      </FormControl>

      <Stack direction={"row"}>
        <FormControl>
          <FormLabel>Hours</FormLabel>
          <InputGroup borderColor="gray.300">
            <NumberInput
              min={0}
              onChange={(valueString) => setTimerHr(parseInt(valueString))}
              isRequired={true}
              defaultValue={calculateHours(totalSeconds)}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Minutes</FormLabel>
          <InputGroup borderColor="gray.300">
            <NumberInput
              min={0}
              onChange={(valueString) => setTimerMin(parseInt(valueString))}
              isRequired={true}
              defaultValue={calculateMinutes(totalSeconds)}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Seconds</FormLabel>
          <InputGroup borderColor="gray.300">
            <NumberInput
              min={0}
              onChange={(valueString) => setTimerSec(parseInt(valueString))}
              isRequired={true}
              defaultValue={calculateSeconds(totalSeconds)}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </FormControl>
      </Stack>
    </>
  );
};

export default EditTimerForm;
