"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import InputFormFields, { genericInputHandler } from "@/components/FormsUI/InputFormFields";
import PasswordFormField from "@/components/FormsUI/PasswordFormField";
import { ROOT_URL, supabaseUser } from "@/lib/initSupabase";
import { AuthError } from "@supabase/supabase-js";
import { UserData } from "@/lib/types";

export default function SignUpPage() {
  const supabase = supabaseUser();

  const [enteredEmail, setEmail] = useState<string>("");
  const [enterPassword, setPassword] = useState<string>("");
  const [enteredName, setName] = useState<string>("")
  const [authError, setError] = useState<AuthError | null>();
  const [data, setData] = useState<UserData>();


  const signupHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp(
      {
        email: enteredEmail,
        password: enterPassword,
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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
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
                {authError && <Alert status='error'>
                  <AlertIcon /> {authError.message}
                </Alert>}
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
      </Stack>
    </Flex>
  );
}
