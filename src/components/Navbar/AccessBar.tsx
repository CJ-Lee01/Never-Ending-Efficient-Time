import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Stack,
  useColorModeValue,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  useColorMode,
  MenuGroup,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC, ReactElement } from "react";
import MobileDrawer from "./MobileDrawer";
import { IoIosTimer, IoMdCheckboxOutline } from "react-icons/io";
import { AiOutlineCalendar } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import ProfileDropdown from "./ProfileDropdown";

const AccessBar: FC = ({}) => {
  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        <DesktopNav />
        <MobileNav />
      </Stack>
    </Flex>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack
      direction={"row"}
      spacing={7}
      display={{ base: "none", md: "flex" }}
      alignItems={"center"}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} pt={2}>
          <Link href={navItem.href} color={linkColor}>
            {navItem.label}
          </Link>
        </Box>
      ))}
      <Stack direction={"row"} spacing={4} alignItems={"center"}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <ProfileDropdown></ProfileDropdown>
      </Stack>
    </Stack>
  );
};

const MobileNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack direction={"row"} spacing={4} display={{ base: "flex", md: "none" }}>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>

      <MobileDrawer NAV_ITEMS={NAV_ITEMS}></MobileDrawer>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href: string;
  icon: ReactElement;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <RiDashboardFill />,
  },
  {
    label: "Timer",
    href: "/timer",
    icon: <IoIosTimer />,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: <AiOutlineCalendar />,
  },
  {
    label: "To-Do List",
    href: "/to-do-list",
    icon: <IoMdCheckboxOutline />,
  },
];

export default AccessBar;
