"use client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { ChangeEvent, FormEvent, useState } from "react";
import InputFormFields, { genericInputHandler } from "@/components/FormsUI/InputFormFields";
import { AuthError, User } from "@supabase/supabase-js";
import { supabaseUser } from "../../lib/initSupabase";
import PasswordFormField from "@/components/FormsUI/PasswordFormField";



export default function SignInPage() {

  const supabase = supabaseUser();

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
  }
  const passwordFormHandler = genericInputHandler(setPassword);

  const emailFormHandler = genericInputHandler(setEmail);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
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
      </Stack>
    </Flex>
  );
}
