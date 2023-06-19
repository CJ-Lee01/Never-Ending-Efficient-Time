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
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import Logo from "./Logo";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import SignOutButton from "../AuthUI/SignOutButton";
import NavProfile from "./NavProfile";

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
  const bgColour = useColorModeValue("white", "grey.500");

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
                  bg={bgColour}
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
              <NavProfile />
              <Spacer />
              <SignOutButton />
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
