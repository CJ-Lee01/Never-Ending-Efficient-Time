import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Button,
  IconButton,
  Stack,
  useColorModeValue,
  DrawerFooter,
  Avatar,
  Box,
  HStack,
  VStack,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import Logo from "./Logo";
import { HamburgerIcon, CalendarIcon } from "@chakra-ui/icons";
import Link from "next/link";
import SignOutButton from "../AuthUI/SignOutButton";
import { FiChevronDown } from "react-icons/fi";

interface NavItem {
  label: string;
  href: string;
  icon: ReactElement;
}

interface MobileDrawerProps {
  NAV_ITEMS: Array<NavItem>;
}

const MobileDrawer: FC<MobileDrawerProps> = ({ NAV_ITEMS }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            <Stack direction="column">
              {NAV_ITEMS.map((navItem) => (
                <Button
                  as={Link}
                  href={navItem.href}
                  key={navItem.label}
                  bg={useColorModeValue("white", "grey.500")}
                  leftIcon={navItem.icon}
                  justifyContent={"left"}
                >
                  {navItem.label}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter
            borderTopWidth="1px"
            justifyContent={"left"}
            display={"flex"}
          >
            <HStack>
              <HStack>
                <Avatar
                  size={"md"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">Username</Text>
                  <Text fontSize="xs" color="gray.600">
                    User
                  </Text>
                </VStack>
              </HStack>
              <Spacer></Spacer>
              <SignOutButton />
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
