import { supabaseUser } from "@/lib/initSupabase";
import { Button, useColorModeValue } from "@chakra-ui/react";
import {FiLogOut} from "react-icons/fi";

export default function SignOutButton() {
  const supabase = supabaseUser();
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    error && alert(error.message);
  };

  const bgColour = useColorModeValue("white", "grey.500");

  return (
    <Button
    onClick={signOutHandler}
    bg={bgColour}
    leftIcon={<FiLogOut/>}
    justifyContent={"left"}
  >
    Sign Out
  </Button>
  );
}
