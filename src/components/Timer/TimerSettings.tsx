import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import StopwatchTab from "./StopwatchTab";
import TimerTab from "./TimerTab";

interface TimerSettingsProps {}

const TimerSettings: FC<TimerSettingsProps> = ({}) => {
  return (
    <Tabs
      isFitted
      variant="enclosed"
      p={6}
      borderWidth={2}
      borderRadius={10}
      borderColor={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
      width={{ xl: "35%" }}
    >
      <TabList mb="1em">
        <Tab>Stopwatch</Tab>
        <Tab>Timer</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <StopwatchTab></StopwatchTab>
        </TabPanel>
        <TabPanel>
          <TimerTab></TimerTab>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TimerSettings;
