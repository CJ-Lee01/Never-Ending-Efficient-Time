import { getProfile, updateSettings } from "@/lib/CRUD_Profile";
import { ProfileType } from "@/lib/types";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Avatar,
  Divider,
  useColorModeValue,
  Button,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { PostgrestError } from "@supabase/supabase-js";
import { ChangeEvent, FC, useEffect, useState } from "react";

export const isValidExtension = (fileName: string) => {
  const arr = fileName.split(".");
  const extension = arr[arr.length - 1];
  const validExtensions = ["jpg", "jpeg", "png"];
  for (let i = 0; i < validExtensions.length; i++) {
    if (extension == validExtensions[i]) {
      return true;
    }
  }
  return false;
};

interface SettingsFormProps {}

const SettingsForm: FC<SettingsFormProps> = ({}) => {
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [ProfileData, setProfileData] = useState<{
    data: ProfileType | null;
    error: PostgrestError | null;
  }>({
    data: null,
    error: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isInvalidFile, setIsInvalidFile] = useState<boolean>(false);
  const pageUpdater = () => window.location.reload();

  useEffect(() => {
    getProfile(setProfileData);
    setIsLoading(false);
  }, []);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
    }
  };

  const handleSave = () => {
    if (avatarFile && !isValidExtension(avatarFile.name)) {
      setIsInvalidFile(true);
      setIsSuccess(false);
    } else {
      const error = updateSettings(username, avatarFile, pageUpdater);
      setIsLoading(true);
      setIsInvalidFile(false);
      setIsSuccess(true);
    }
  };

  return (
    <Stack px={{ base: 10, xl: 48 }} direction={"column"} spacing={6}>
      <Divider borderColor={"grey.500"} />
      <FormControl>
        <Stack direction={"row"} align={"center"}>
          <FormLabel flex={1}>Name</FormLabel>
          <Input
            flex={2}
            type="text"
            bg={useColorModeValue("#EDF2F7", "#1A202C")}
            onChange={handleUsernameChange}
            defaultValue={ProfileData.data?.full_name}
            isRequired
          />
        </Stack>
      </FormControl>
      <Divider borderColor={"grey.500"} />
      <FormControl>
        <Stack direction={"row"} align={"center"}>
          <FormLabel flex={1}>Avatar</FormLabel>
          <Stack
            direction={{ base: "column", md: "row" }}
            flex={2}
            spacing={{ base: 6, md: 16 }}
            align={"center"}
          >
            <Avatar
              size={{ base: "lg", md: "2xl" }}
              src={ProfileData.data?.avatar_url}
            />
            <Stack direction={"column"}>
              <Input
                type="file"
                accept="image/png, image/jpeg"
                bg={useColorModeValue("#EDF2F7", "#1A202C")}
                onChange={handleAvatarUpload}
              />
              <Text as="sub">Only jpeg or png files are allowed</Text>
            </Stack>
          </Stack>
        </Stack>
      </FormControl>
      <Divider borderColor={"grey.500"} />
      <Stack direction={"row"} justify={"right"} py={10}>
        <Stack direction={"column"}>
          <Button
            bg={"blue.400"}
            _hover={{ bg: "blue.600" }}
            width="200px"
            onClick={handleSave}
            isLoading={isLoading}
            isDisabled={
              (username == "" || username == ProfileData.data?.full_name) &&
              avatarFile == null
            }
          >
            Save Changes
          </Button>
          {isSuccess && !isInvalidFile ? (
            <Alert status="success" data-testid="settingsSuccessAlert">
              <AlertIcon /> {"Updating changes..."}
            </Alert>
          ) : (
            isInvalidFile && (
              <Alert status="error" data-testid="settingsErrorAlert">
                <AlertIcon /> {"File is invalid!"}
              </Alert>
            )
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SettingsForm;
