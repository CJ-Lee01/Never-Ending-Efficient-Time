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
  }, [supabase.auth]);

  return (
    <Flex
      bg={useColorModeValue("navbarColor.light", "navbarColor.dark")}
      height={16}
      py={10}
      px={{ base: "2%", lg: "5%", xl: "10%" }}
      boxShadow="xl"
    >
      <Logo />
      <Spacer />
      {isLoggedIn ? <AccessBar /> : <AuthButtons />}
    </Flex>
  );
};
export default Navbar;
