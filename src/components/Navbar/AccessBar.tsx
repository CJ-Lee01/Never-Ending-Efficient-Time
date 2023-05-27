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
import { FC } from "react";
import SignOutButton from "@/components/AuthUI/SignOutButton";

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
    <Stack direction={"row"} spacing={7} display={{ base: "none", md: "flex" }}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} pt={2}>
          <Link href={navItem.href} color={linkColor}>
            {navItem.label}
          </Link>
        </Box>
      ))}
      <Stack direction={"row"} spacing={4}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <SignOutButton />
      </Stack>
    </Stack>
  );
};

const MobileNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack direction={"row"} spacing={7} display={{ base: "flex", md: "none" }}>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuGroup>
            {NAV_ITEMS.map((navItem) => (
              <MenuItem as={Link} href={navItem.href} color={linkColor}>
                {navItem.label}
              </MenuItem>
            ))}
          </MenuGroup>
          <MenuDivider />
          <Center>
            <SignOutButton />
          </Center>
        </MenuList>
      </Menu>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Timer",
    href: "/timer",
  },
  {
    label: "Calendar",
    href: "/calendar",
  },
  {
    label: "To-Do List",
    href: "/to-do-list",
  },
];

export default AccessBar;
