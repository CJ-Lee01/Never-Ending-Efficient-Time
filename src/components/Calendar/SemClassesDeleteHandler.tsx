import { EventListInfoContext } from "@/lib/PageUpdaters/CalendarPageUpdater";
import { removeNUSModsCalendar } from "@/lib/CRUD_Calendar";

import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState, ChangeEvent, useContext, FC } from "react";

export const SemClassesDeleteHandler: FC = () => {
  const [semseter, setSemester] = useState<string>("");
  const { events, pageUpdater } = useContext(EventListInfoContext);
  const acadYearList = events.map(x => x.sem_data ?? "")
    .filter(x => x)
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort();
  if (acadYearList.length == 0) {
    return <Text>You have no NUSMods classes to delete.</Text>
  }

  const semesterChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSemester(event.target.value);
  }

  const deleteSemHandler = async () => {
    if (!semseter) {
      alert("Please select a semester to delete.");
      return;
    }
    const error = await removeNUSModsCalendar(semseter);
    if (error) {
      alert(error.message);
      return;
    }
    pageUpdater();
  };

  return (
    <Stack px={{ base: 28, xl: 12 }} pb={10}>
      <FormControl justifyContent="center">
        <FormLabel>Select the semester to delete classes:</FormLabel>
        <Select
          placeholder="Select Academic Year"
          onChange={semesterChangeHandler}
        >
          {acadYearList.map((semData) => (
            <option key={semData} value={semData}>
              {semData}
            </option>
          ))}
        </Select>
        <Input type="button" onClick={deleteSemHandler} value="Submit" />
      </FormControl>
    </Stack>
  );
};
