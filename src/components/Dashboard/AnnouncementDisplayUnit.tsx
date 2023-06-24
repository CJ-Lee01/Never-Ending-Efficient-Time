import { AnnouncementData } from "@/lib/types"
import { Grid, Stack, chakra, useColorModeValue } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"
import DeleteAnnouncementModal from "./DeleteAnnouncementsModal";
import { PostgrestError } from "@supabase/supabase-js";

const AnnoucementDisplayUnit: FC<{
  announcement: AnnouncementData,
  setAnnouncements: Dispatch<SetStateAction<{
    data: AnnouncementData[];
    error: PostgrestError | null
  }>>
}> = ({ announcement, setAnnouncements }) => {
  const bgColorScheme = useColorModeValue("gray.200", "gray.700");
  const otherStuffPlsExplainRichie = useColorModeValue("gray.600", "gray.300");
  return <Grid
    templateRows={{ base: "auto auto", md: "auto" }}
    w="100%"
    templateColumns={{ base: "unset", md: "5fr 3fr" }}
    p={{ base: 2, sm: 4 }}
    gap={3}
    alignItems="center"
    _hover={{ bg: bgColorScheme }}
  >
    <Stack gridColumnEnd={{ base: "span 2", md: "unset" }}>
      <chakra.h3 fontWeight="bold" fontSize="lg">
        {announcement.title}
      </chakra.h3>
      <chakra.p
        fontWeight="medium"
        fontSize="sm"
        color={otherStuffPlsExplainRichie}
      >
        Announced Date: {announcement.announced_at.toLocaleString()}
      </chakra.p>
      <chakra.p
        fontWeight="medium"
        fontSize="sm"
        color={otherStuffPlsExplainRichie}
      >
        Description: {announcement.description}
      </chakra.p>
    </Stack>
    <DeleteAnnouncementModal announcement={announcement} setAnnouncements={setAnnouncements} />
  </Grid>
}

export default AnnoucementDisplayUnit;