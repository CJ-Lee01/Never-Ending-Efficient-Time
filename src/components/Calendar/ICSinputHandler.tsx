import { Stack, FormControl, FormLabel, Image } from "@chakra-ui/react"
import { useState, ChangeEvent, useContext } from "react";
import ICAL from "@/lib/ical";
import { EventListInfoContext } from "@/app/(User supposed to see if logged in)/calendar/page";

export const ICSinputHandler = () => {
  const [fileNUSMods, setFile] = useState<File | null>();
  const {events, pageUpdater} = useContext(EventListInfoContext);


  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFile(event.target.files?.item(0) ?? null);
  };

  const submitFileHandler = async () => {
    const fileString: string = await fileNUSMods?.text() ?? '';
    const iCalendarData: string = "BEGIN:VCALENDAR" + fileString + "END:VCALENDAR";
    const jCalData = await ICAL.parse(iCalendarData);
    console.log(jCalData);

  }

  return <Stack px={{ base: 28, xl: 12 }} pb={10}>
    <Image src="../../../images/NUSmods.png" alt="" />
    <FormControl justifyContent="center">
      <FormLabel>Enter your NUSmods timetable link:</FormLabel>
      <input type="file" accept=".ics" onChange={fileChangeHandler} />
      <input type="button" onClick={submitFileHandler} value="submit" />
    </FormControl>
  </Stack>
};