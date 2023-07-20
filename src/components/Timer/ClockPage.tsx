import { Stack } from "@chakra-ui/react";
import { FC, useContext, useState } from "react";
import TimeUpModal from "./TimeUpModal";
import { TimerDataContext } from "./TimerDataContextProvider";
import TimerSettings from "./TimerSettings";
import ClockTicker from "./ClockTicker";

interface ClockPageProps {}

const ClockPage: FC<ClockPageProps> = () => {
  const { isIntervalComplete, intervalTitle } = useContext(TimerDataContext);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  return (
    <>
      <TimeUpModal
        isTimeUp={isTimeUp}
        setIsTimeUp={setIsTimeUp}
        intervalTitle={intervalTitle}
        isIntervalComplete={isIntervalComplete}
      ></TimeUpModal>
      <Stack
        justify={"center"}
        spacing={{ base: 20, xl: 36 }}
        py={{ base: 20, md: 28 }}
        px={{ base: 5, xl: 8 }}
        direction={{ base: "column", xl: "row" }}
      >
        <ClockTicker setIsTimeUp={setIsTimeUp}></ClockTicker>
        <TimerSettings />
      </Stack>
    </>
  );
};

export default ClockPage;
