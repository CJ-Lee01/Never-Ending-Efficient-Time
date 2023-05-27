import {
  Flex,
  Image,
  useColorMode,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import AccessBar from "./AccessBar";
import { supabaseUser } from "@/lib/initSupabase";
import { AuthError, Session } from "@supabase/supabase-js";

const Navbar: React.FC = () => {
  const supabase = supabaseUser();
  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        setLogin(true);
      }
      if (event == "SIGNED_OUT") {
        setLogin(false);
      }
    });
  }, [isLoggedIn]);

  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.900")}
      height="64px"
      padding="8px 12px"
    >
      <Logo />
      <Spacer />
      {/* {isLoggedIn ? <AccessBar /> : <AuthButtons />} */}
      <AccessBar />
      {/* <AuthButtons /> */}
    </Flex>
  );
};
export default Navbar;
