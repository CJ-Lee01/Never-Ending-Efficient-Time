import { Heading } from "@chakra-ui/react";
import { FC } from "react";

interface SettingsHeaderProps {}

const SettingsHeader: FC<SettingsHeaderProps> = () => {
  return (
    <Heading textAlign={"left"} py={14} px={{ base: 10, xl: 48 }}>
      Settings
    </Heading>
  );
};

export default SettingsHeader;
