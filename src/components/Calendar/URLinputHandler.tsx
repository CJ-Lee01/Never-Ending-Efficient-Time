import { EventListInfoContext } from "@/lib/PageUpdaters/CalendarPageUpdater";
import { addBulkEvent } from "@/lib/CRUD_Calendar";
import {
  currentAcademicYear,
  getacademicYearList,
} from "@/lib/NUSMods/AcademicCalendar";
import NUSModsURLToEventList from "@/lib/NUSMods/NUSModsURLparser";
import {
  Stack,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState, ChangeEvent, useContext, FC } from "react";

export const URLinputHandler: FC = () => {
  const [urlString, setUrlString] = useState<string>("");
  const [acadYear, setAcadYear] = useState<string>(currentAcademicYear());
  const { pageUpdater } = useContext(EventListInfoContext);

  const academicYearChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setAcadYear(event.target.value);
  };

  const URLChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUrlString(event.target.value);
  };

  const submitURLHandler = async () => {
    const eventsParseInfo = await NUSModsURLToEventList(urlString, acadYear);
    if (eventsParseInfo.error) {
      alert(eventsParseInfo.error);
      return;
    }
    const { data, error } = await addBulkEvent(eventsParseInfo.events);
    if (error) {
      alert(error);
      return;
    }
    pageUpdater();
  };

  return (
    <Stack px={{ base: 28, xl: 12 }} pb={10}>
      <Image src="images/NUSMods.png" alt="" />
      <FormControl justifyContent="center">
        <FormLabel>Enter your NUSmods timetable link:</FormLabel>
        <Input
          type="url"
          required
          onChange={URLChangeHandler}
          placeholder="NUSMods timetable link"
        />
        <Select
          placeholder="Select Academic Year"
          onChange={academicYearChangeHandler}
        >
          {getacademicYearList().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Input type="button" onClick={submitURLHandler} value="Submit" />
      </FormControl>
    </Stack>
  );
};
