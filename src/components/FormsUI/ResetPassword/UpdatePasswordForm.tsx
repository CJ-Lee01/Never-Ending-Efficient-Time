import {
  useColorModeValue,
  Stack,
  Button,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";
import { FC, FormEvent, useState } from "react";
import { genericInputHandler } from "../InputFormFields";
import { supabaseUser } from "@/lib/initSupabase";
import { AuthError } from "@supabase/supabase-js";
import PasswordFormField from "../PasswordFormField";

interface UpdatePasswordFormProps { }

const UpdatePasswordForm: FC<UpdatePasswordFormProps> = () => {
  const supabase = supabaseUser();
  const [password, setPassword] = useState("");
  const [authError, setError] = useState<AuthError | null>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const passwordFormHandler = genericInputHandler(setPassword);

  const updatePasswordHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: password,
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
      <form onSubmit={updatePasswordHandler}>
        <Stack spacing={8}>
          <PasswordFormField changeHandler={passwordFormHandler} />
          <Stack spacing={6}>
            {isSubmitted ? (
              <Alert status="success">
                <AlertIcon />{" "}
                {
                  "Password updated! You can continue using the Web Application."
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
              Update
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdatePasswordForm;
