import { useEffect, useState } from "react";
import {
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// import { LiaSyncSolid } from "react-icons/lia";

import { IoMdSync } from "react-icons/io";
import { getLastCanvasAccess } from "@/lib/CRUD_LastCanvasSyncTime";
import CanvasForm from "../CanvasSync/WrapperForm";

const CanvasSyncButton = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(0));
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getLastCanvasAccess(setStartDate)
  }, [])

  /* const changeTokenHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCanvasToken(event.target.value);
  }; */

  const bgColour = useColorModeValue("white", "grey.500");

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<IoMdSync />}
        justifyContent={"left"}
        bg={bgColour}
      >
        Canvas Sync
      </Button>
      <CanvasForm openState={isOpen} closer={onClose} startDate={startDate} />
    </>
  );
};

export default CanvasSyncButton;
