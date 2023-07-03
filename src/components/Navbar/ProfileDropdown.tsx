import {
  Flex,
  Box,
  Menu,
  MenuButton,
  HStack,
  MenuList,
  Stack,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { FC } from "react";
import { FiChevronDown } from "react-icons/fi";
import SignOutButton from "@/components/AuthUI/SignOutButton";
import NavProfile from "./NavProfile";
import CanvasSyncButton from "./CanvasSyncButton";
import SettingsButton from './SettingsButton';

interface ProfileDropdownProps {}

const ProfileDropdown: FC<ProfileDropdownProps> = ({}) => {
  return (
    <Flex alignItems={"center"} zIndex={2}>
      <Menu>
        <MenuButton py={2} _focus={{ boxShadow: "none" }}>
          <HStack>
            <NavProfile />
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList as={Stack} p={2}>
        
          <MenuItem as={CanvasSyncButton}>
            </MenuItem>
          <MenuItem as={SettingsButton}>
            </MenuItem>
          <Divider></Divider>
          <MenuItem as={SignOutButton}>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default ProfileDropdown;
