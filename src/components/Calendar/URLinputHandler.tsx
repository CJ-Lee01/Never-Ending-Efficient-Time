import { addBulkEvent } from "@/lib/CRUD_Calendar";
import { academicYearInfo, currentAcademicYear } from "@/lib/NUSMods/AcademicCalendar";
import NUSModsURLToEventList from "@/lib/NUSMods/NUSModsURLparser";
import { Stack, FormControl, FormLabel, Image } from "@chakra-ui/react"
import { useState, ChangeEvent } from "react";

export const URLinputHandler = () => {
  const [urlString, setUrlString] = useState<string>('');
  const [acadYear, setAcadYear] = useState<academicYearInfo>(currentAcademicYear());

  const URLChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUrlString(event.target.value);
  };

  const submitURLHandler = async () => {
    const eventsParseInfo = await NUSModsURLToEventList(urlString, acadYear)
    if (eventsParseInfo.error) {
      alert(eventsParseInfo.error)
      return
    }
    console.log(eventsParseInfo.events)
    const {data, error} = await addBulkEvent(eventsParseInfo.events);
    if (error) {
      alert(error)
      return
    }
    alert('success!')
  }

  return <Stack px={{ base: 28, xl: 12 }} pb={10}>
    <Image src="../../../images/NUSmods.png" alt="" />
    <FormControl justifyContent="center">
      <FormLabel>Enter your NUSmods timetable link:</FormLabel>
      <input type="url" required onChange={URLChangeHandler} />
      <input type="button" onClick={submitURLHandler} value="submit" />
    </FormControl>
  </Stack>
};