import { supabaseUser } from "@/lib/initSupabase";
import {
  useColorModeValue,
  Stack,
  Button,
  Alert,
  AlertIcon,
  Box,
  Link,
} from "@chakra-ui/react";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
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

  data ? 1 : 0; //To trick ESlint cuz theres no way arnd this.

  const signInHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: enteredEmail,
      password: enterPassword,
    });
    setData(data);
    setError(error);
    data.session && router.push("/dashboard");
  };
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
          <InputFormFields
            type="email"
            changeHandler={emailFormHandler}
            isRequired
          >
            Email address
          </InputFormFields>
          <PasswordFormField changeHandler={passwordFormHandler} />
          <Stack spacing={8}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"flex-end"}
              pt={2}
            >
              {/* <Checkbox>Remember me</Checkbox> */}
              <Link as={NextLink} color={"blue.400"} href="/forget-password">
                Forgot password?
              </Link>
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
            {authError && (
              <Alert status="error">
                <AlertIcon /> {authError.message}
              </Alert>
            )}
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
