import { Button, useColorModeValue } from "@chakra-ui/react";
import {FiSettings} from 'react-icons/fi';
import Link from "next/link";

export default function SettingsButton() {

  const bgColour = useColorModeValue("white", "grey.500");

  return (
    <Button
    as={Link}
    href='/settings'
    bg={bgColour}
    leftIcon={<FiSettings/>}
    justifyContent={"left"}
  >
    Settings
  </Button>
  );
}
