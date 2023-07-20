import { getProfile } from "@/lib/CRUD_Profile";
import { ProfileType } from "@/lib/types";
import { HStack, Avatar, VStack, Text } from "@chakra-ui/react";
import { PostgrestError } from "@supabase/supabase-js";
import { FC, useEffect, useState } from "react";

interface NavProfileProps {}

const NavProfile: FC<NavProfileProps> = ({}) => {
  const [ProfileData, setProfileData] = useState<{
    data: ProfileType | null;
    error: PostgrestError | null;
  }>({
    data: null,
    error: null,
  });

  useEffect(() => {
    getProfile(setProfileData);
  }, []);

  return (
    <HStack>
      <Avatar size={"md"} src={ProfileData.data?.avatar_url} />
      <VStack alignItems="flex-start" spacing="1px" ml="2">
        <Text fontSize="sm">{ProfileData.data?.full_name}</Text>
        <Text fontSize="xs" color="gray.600">
          User
        </Text>
      </VStack>
    </HStack>
  );
};

export default NavProfile;
