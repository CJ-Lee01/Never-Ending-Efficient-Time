import { AnnouncementData } from "@/lib/types";
import {
  Box,
  Card,
  CardBody,
  Grid,
  Stack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import DeleteAnnouncementModal from "./DeleteAnnouncementsModal";
import { PostgrestError } from "@supabase/supabase-js";
import { render } from "react-dom";

const AnnoucementDisplayUnit: FC<{
  announcement: AnnouncementData;
  setAnnouncements: Dispatch<
    SetStateAction<{
      data: AnnouncementData[];
      error: PostgrestError | null;
    }>
  >;
}> = ({ announcement, setAnnouncements }) => {
  const bgColorScheme = useColorModeValue("gray.200", "gray.700");

  const textColor = useColorModeValue("gray.600", "gray.300");
  return (
    <Grid
      templateRows={{ base: "auto auto", md: "auto" }}
      w="100%"
      templateColumns={{ base: "unset", md: "9fr 1fr" }}
      p={{ base: 2, sm: 4 }}
      gap={3}
      alignItems="center"
      _hover={{ bg: bgColorScheme }}
    >
      <Stack gridColumnEnd={{ base: "span 2", md: "unset" }}>
        <chakra.h3 fontWeight="bold" fontSize="lg">
          {announcement.title}
        </chakra.h3>
        <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
          Announced Date: {announcement.announced_at.toLocaleString()}
        </chakra.p>
        <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
          Description:
        </chakra.p>
        <Card>
          <CardBody>
            <div
              dangerouslySetInnerHTML={{ __html: announcement.description }}
            />
          </CardBody>
        </Card>
      </Stack>
      <DeleteAnnouncementModal
        announcement={announcement}
        setAnnouncements={setAnnouncements}
      />
    </Grid>
  );
};

export default AnnoucementDisplayUnit;
