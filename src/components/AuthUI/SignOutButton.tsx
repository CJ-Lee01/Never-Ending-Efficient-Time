import { supabaseUser } from "@/lib/initSupabase";
import { Button, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

export default function SignOutButton() {
  const supabase = supabaseUser();
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    error && alert(error.message);
  };
  return (
    <Button
      onClick={signOutHandler}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={useColorModeValue("orange.400", "green.400")}
      _hover={{
        bg: useColorModeValue("orange.300", "green.300"),
      }}
    >
      Sign Out
    </Button>
  );
}
