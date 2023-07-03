import { Fragment, useEffect, useState } from "react";
import {
  Container,
  chakra,
  Flex,
  VStack,
  Divider,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { getAnnouncements } from "@/lib/CRUD_Announcements";
import { AnnouncementData } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { error } from "console";
import AnnoucementDisplayUnit from "./AnnouncementDisplayUnit";


const Annoucements = () => {
  const [announcementListData, setAnnouncementList] = useState<{
    data: AnnouncementData[]; 
    error: PostgrestError | null
  }>({
    data: [],
    error: null
  })

  useEffect(() => {
    getAnnouncements(setAnnouncementList);
  }, [])

  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <Flex justify="center" mb={3}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          Annoucements (WIP)
        </chakra.h3>
      </Flex>
      <VStack
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        overflow="auto"
        maxHeight='500px'
        spacing={0}
      >
        {announcementListData.data.map((item, index) => (
          <Fragment key={item.id}>
            <AnnoucementDisplayUnit announcement={item} setAnnouncements={setAnnouncementList}/>
            {announcementListData.data.length - 1 !== index && <Divider m={0} />}
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};


export default Annoucements;
