import { supabaseUser } from "@/lib/initSupabase"
import { Button } from "@chakra-ui/react";

export default function SignOutButton() {
  const supabase = supabaseUser();
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut()
    error && alert(error.message);
  }
  return <Button onClick={signOutHandler}>Sign out.</Button>;
}