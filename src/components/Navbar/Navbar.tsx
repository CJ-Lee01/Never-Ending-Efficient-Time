import { Flex, useColorModeValue, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import AccessBar from "./AccessBar";
import { supabaseUser } from "@/lib/initSupabase";
import AuthButtons from "./AuthButtons";

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
      bg={useColorModeValue("white", "gray.800")}
      height="64px"
      py="1rem"
      px={{ base: "2%", lg: "5%", xl: "10%" }}
    >
      <Logo />
      <Spacer />
      {isLoggedIn ? <AccessBar /> : <AuthButtons />}
    </Flex>
  );
};
export default Navbar;
