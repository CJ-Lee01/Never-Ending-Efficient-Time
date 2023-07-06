import { getProfile, updateAvatar, updateName } from "@/lib/CRUD_Profile";
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
} from "@chakra-ui/react";
import { PostgrestError } from "@supabase/supabase-js";
import { ChangeEvent, FC, useEffect, useState } from "react";

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
  const pageUpdater = () => window.location.reload();

  useEffect(() => {
    getProfile(setProfileData);
    // console.log("HERE!");
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
    if (username != "" && username != ProfileData.data?.full_name) {
      const NameError = updateName(username);
    }
    if (avatarFile) {
      const val = updateAvatar(avatarFile, pageUpdater);
    }
    // console.log("saved!");
    setIsLoading(true);
  };

  return (
    <Stack px={{ base: 10, lg: 48 }} direction={"column"} spacing={6}>
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
            <Input
              type="file"
              accept="image/png, image/jpeg"
              bg={useColorModeValue("#EDF2F7", "#1A202C")}
              onChange={handleAvatarUpload}
            />
          </Stack>
        </Stack>
      </FormControl>
      <Divider borderColor={"grey.500"} />
      <Stack direction={"row"} justify={"flex-end"} py={10}>
        <Button
          bg={"blue.400"}
          _hover={{ bg: "blue.600" }}
          width="200px"
          onClick={handleSave}
          isLoading={isLoading}
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
  );
};

export default SettingsForm;
