import { AnnouncementData } from "@/lib/types";
import {
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
      templateRows={"1fr"}
      w="100%"
      templateColumns={"9fr 1fr"}
      p={{ base: 2, sm: 4 }}
      gap={3}
      alignItems="center"
      _hover={{ bg: bgColorScheme }}
    >
      <Stack gridColumnEnd={"unset"}>
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
      <Stack align={"center"}>
        <DeleteAnnouncementModal
          announcement={announcement}
          setAnnouncements={setAnnouncements}
        />
      </Stack>
    </Grid>
  );
};

export default AnnoucementDisplayUnit;
