import { supabaseUser } from "@/lib/initSupabase";
import { useColorModeValue, Stack, Checkbox, Button, Alert, AlertIcon, Box, Link } from "@chakra-ui/react";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import InputFormFields, { genericInputHandler } from "../InputFormFields";
import PasswordFormField from "../PasswordFormField";

export default function SignInForm() {

  const supabase = supabaseUser();
  const router = useRouter();
  const [enteredEmail, setEmail] = useState<string>("");
  const [enterPassword, setPassword] = useState<string>("");
  const [authError, setError] = useState<AuthError | null>();
  const [data, setData] = useState<{}>();


  const signInHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: enteredEmail,
      password: enterPassword,
    });
    setData(data);
    setError(error);
    data.session && router.push('/dashboard');
  }
  const passwordFormHandler = genericInputHandler(setPassword);

  const emailFormHandler = genericInputHandler(setEmail);

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <Stack spacing={4}>
        <form onSubmit={signInHandler}>
          <InputFormFields type="email" changeHandler={emailFormHandler} isRequired>
            Email address
          </InputFormFields>
          <PasswordFormField changeHandler={passwordFormHandler} />
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.400"}>Forgot password?</Link>
            </Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Sign in
            </Button>
            {authError && <Alert status='error'>
              <AlertIcon /> {authError.message}
            </Alert>}
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
