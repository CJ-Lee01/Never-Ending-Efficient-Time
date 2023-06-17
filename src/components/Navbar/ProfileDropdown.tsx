import {
  Flex,
  Box,
  Menu,
  MenuButton,
  HStack,
  Avatar,
  VStack,
  MenuList,
  Text,
  Center,
} from "@chakra-ui/react";
import { FC } from "react";
import { FiChevronDown } from "react-icons/fi";
import SignOutButton from "@/components/AuthUI/SignOutButton";

interface ProfileDropdownProps {}

const ProfileDropdown: FC<ProfileDropdownProps> = ({}) => {
  return (
    <Flex alignItems={"center"} zIndex={2}>
      <Menu>
        <MenuButton py={2} _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar
              size={"md"}
              src={
                "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">Username</Text>
              <Text fontSize="xs" color="gray.600">
                User
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList>
          <Center>
            <SignOutButton />
          </Center>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default ProfileDropdown;
