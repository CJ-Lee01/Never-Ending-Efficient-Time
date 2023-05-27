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
import SignUpHeader from "@/components/FormsUI/SignUp/SignUpHeader";
import SignUpForm from "@/components/FormsUI/SignUp/SignUpForm";

export default function SignUpPage() {
  
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <SignUpHeader />
        <SignUpForm />
      </Stack>
    </Flex>
  );
}
