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

interface AddTimerFormProps {
  setIntervalTitle: (str: string) => void;
  setTimerHr: (num: number) => void;
  setTimerMin: (num: number) => void;
  setTimerSec: (num: number) => void;
}

const AddTimerForm: FC<AddTimerFormProps> = ({
  setIntervalTitle,
  setTimerHr,
  setTimerMin,
  setTimerSec,
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
          />
        </InputGroup>
      </FormControl>

      <Stack direction={"row"}>
        <FormControl>
          <FormLabel>Hours</FormLabel>
          <InputGroup borderColor="gray.300">
            <NumberInput
              defaultValue={0}
              min={0}
              onChange={(valueString) => setTimerHr(parseInt(valueString))}
              isRequired={true}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Minutes</FormLabel>
          <InputGroup borderColor="gray.300">
            <NumberInput
              defaultValue={0}
              min={0}
              onChange={(valueString) => setTimerMin(parseInt(valueString))}
              isRequired={true}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Seconds</FormLabel>
          <InputGroup borderColor="gray.300">
            <NumberInput
              defaultValue={0}
              min={0}
              onChange={(valueString) => setTimerSec(parseInt(valueString))}
              isRequired={true}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </FormControl>
      </Stack>
    </>
  );
};

export default AddTimerForm;
