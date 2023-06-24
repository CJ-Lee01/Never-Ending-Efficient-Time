import { Fragment, useEffect, useState } from "react";
import {
  Container,
  chakra,
  Flex,
  Stack,
  VStack,
  Grid,
  Divider,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { getAnnouncements } from "@/lib/CRUD_Announcements";
import { AnnouncementData } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { error } from "console";
import AnnoucementDisplayUnit from "./AnnouncementDisplayUnit";

interface ItemAttributes {
  title: string;
  created_at: string;
}

const items: ItemAttributes[] = [
  {
    title: "Annoucement 1",
    created_at: "21 Jan 2022",
  },
  {
    title: "Annoucement 2 Go and Study, Stop playing",
    created_at: "20 Jun 2021",
  },
  {
    title: `Find out what's new in our Web Application!`,
    created_at: "31 Sept 2022",
  },
];

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
      <Flex justify="left" mb={3}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          Annoucements (WIP)
        </chakra.h3>
      </Flex>
      <VStack
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        {announcementListData.data.map((item, index) => (
          <Fragment key={item.id}>
            <AnnoucementDisplayUnit announcement={item} setAnnouncements={setAnnouncementList}/>
            {items.length - 1 !== index && <Divider m={0} />}
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};

const ItemSettingLink = ({ label }: { label: string }) => {
  return (
    <chakra.p
      as={Link}
      _hover={{ bg: useColorModeValue("gray.400", "gray.600") }}
      p={1}
      rounded="md"
    >
      {label}
    </chakra.p>
  );
};

export default Annoucements;
