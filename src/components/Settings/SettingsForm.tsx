import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Avatar,
  Spacer,
  Divider,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";

interface SettingsFormProps {}

const SettingsForm: FC<SettingsFormProps> = ({}) => {
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
            <Avatar size={{ base: "lg", md: "2xl" }} />
            <Input type="file" bg={useColorModeValue("#EDF2F7", "#1A202C")} />
          </Stack>
        </Stack>
      </FormControl>
      <Divider borderColor={"grey.500"} />
      <Stack direction={"row"} justify={"flex-end"} py={10}>
        <Button bg={"blue.400"} _hover={{ bg: "blue.600" }} width="200px">
          Save Changes
        </Button>
      </Stack>
    </Stack>
  );
};

export default SettingsForm;
