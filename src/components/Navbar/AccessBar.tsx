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
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import NextLink from "next/link";
import React from "react";

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
          <Link href={navItem.href ?? "#"} color={linkColor}>
            {navItem.label}
          </Link>
        </Box>
      ))}
      <Stack direction={"row"} spacing={4}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button
          as={NextLink}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          href="#"
          bg={useColorModeValue("orange.400", "green.400")}
          _hover={{
            bg: useColorModeValue("orange.300", "green.300"),
          }}
        >
          Sign Out
        </Button>
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
          {NAV_ITEMS.map((navItem) => (
            <MenuItem>
              <Link href={navItem.href ?? "#"} color={linkColor}>
                {navItem.label}
              </Link>
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem>
            <Button
              as={NextLink}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              href="#"
              bg={useColorModeValue("orange.400", "green.400")}
              _hover={{
                bg: useColorModeValue("orange.300", "green.300"),
              }}
            >
              Sign Out
            </Button>
          </MenuItem>
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
    href: "#",
  },
  {
    label: "Calendar",
    href: "#",
  },
  {
    label: "To-Do List",
    href: "#",
  },
];

export default AccessBar;
