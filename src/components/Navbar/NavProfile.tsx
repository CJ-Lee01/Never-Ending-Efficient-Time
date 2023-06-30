import { HStack, Avatar, VStack, Text } from "@chakra-ui/react";
import { FC } from "react";

interface NavProfileProps {}

const NavProfile: FC<NavProfileProps> = ({}) => {
  return (
    <HStack>
      <Avatar size={"md"} />
      <VStack alignItems="flex-start" spacing="1px" ml="2">
        <Text fontSize="sm">Username</Text>
        <Text fontSize="xs" color="gray.600">
          User
        </Text>
      </VStack>
    </HStack>
  );
};

export default NavProfile;
