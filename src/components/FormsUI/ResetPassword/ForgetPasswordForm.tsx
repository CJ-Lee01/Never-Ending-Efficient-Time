import {
  useColorModeValue,
  Stack,
  Button,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";
import { FC, FormEvent, useState } from "react";
import InputFormFields, { genericInputHandler } from "../InputFormFields";
import { supabaseUser } from "@/lib/initSupabase";
import { AuthError } from "@supabase/supabase-js";

interface ForgetPasswordFormProps {}

const ForgetPasswordForm: FC<ForgetPasswordFormProps> = ({}) => {
  const supabase = supabaseUser();

  const [email, setEmail] = useState("");
  const [authError, setError] = useState<AuthError | null>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailFormHandler = genericInputHandler(setEmail);

  const submitRecoveryHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setIsLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    setError(error);
    if (error == null) {
      setIsSubmitted(true);
    }
    setIsLoading(false);
  };

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <form onSubmit={submitRecoveryHandler}>
        <Stack spacing={8}>
          <InputFormFields
            type="email"
            changeHandler={emailFormHandler}
            isRequired
          >
            Email address
          </InputFormFields>
          <Stack spacing={6}>
            {isSubmitted ? (
              <Alert status="success">
                <AlertIcon />{" "}
                {
                  "Check your email and your spam folder for the link to reset your password."
                }
              </Alert>
            ) : (
              authError && (
                <Alert status="error">
                  <AlertIcon /> {authError.message}
                </Alert>
              )
            )}
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              isLoading={isLoading}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default ForgetPasswordForm;
