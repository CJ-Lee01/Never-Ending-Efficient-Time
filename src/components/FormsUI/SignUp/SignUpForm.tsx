import {
  Box,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import NextLink from "next/link";
import InputFormFields, { genericInputHandler } from "@/components/FormsUI/InputFormFields";
import PasswordFormField from "@/components/FormsUI/PasswordFormField";
import { ROOT_URL, supabaseUser } from "@/lib/initSupabase";
import { AuthError } from "@supabase/supabase-js";
import { UserData } from "@/lib/types";

export default function SignUpForm() {
  const supabase = supabaseUser();

  const [enteredEmail, setEmail] = useState<string>("");
  const [enteredPassword, setPassword] = useState<string>("");
  const [enteredName, setName] = useState<string>("")
  const [authError, setError] = useState<AuthError | null>();
  const [data, setData] = useState<UserData>();


  const signupHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp(
      {
        email: enteredEmail,
        password: enteredPassword,
        options: {
          data: {
            full_name: enteredName,
          },
          emailRedirectTo: ROOT_URL + "/dashboard"
        }

      }
    )
    setData(data);
    setError(error);
  }


  const passwordFormHandler = genericInputHandler(setPassword);
  const emailFormHandler = genericInputHandler(setEmail);
  const nameFormHandler = genericInputHandler(setName);


  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <Stack spacing={4}>
        <form onSubmit={signupHandler}>
          <InputFormFields type="name" changeHandler={nameFormHandler} isRequired>
            Name
          </InputFormFields>
          <InputFormFields type="email" changeHandler={emailFormHandler} isRequired>
            Email address
          </InputFormFields>
          <PasswordFormField changeHandler={passwordFormHandler} />
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Sign up
            </Button>
            {authError
              ? <Alert status='error'>
                <AlertIcon /> {authError.message}
              </Alert>
              : data
                ? <Alert status='success'>
                  <AlertIcon />
                  Check your email for the sign up link.
                </Alert>
                : ""}
          </Stack>
        </form>
        <Stack pt={6}>
          <Text align={"center"}>
            Already a user?{" "}
            <Link as={NextLink} color={"blue.400"} href="signin">
              Login
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
