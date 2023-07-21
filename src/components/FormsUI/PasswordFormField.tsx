import { InputFormFieldProps } from "@/lib/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

export default function PasswordFormField({changeHandler}: InputFormFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl id="password" isRequired>
    <FormLabel>Password</FormLabel>
    <InputGroup>
      <Input type={showPassword ? "text" : "password"} onChange={changeHandler}/>
      <InputRightElement h={"full"}>
        <Button
          variant={"ghost"}
          onClick={() =>
            setShowPassword((showPassword) => !showPassword)
          }
        >
          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
        </Button>
      </InputRightElement>
    </InputGroup>
  </FormControl>
  )
}