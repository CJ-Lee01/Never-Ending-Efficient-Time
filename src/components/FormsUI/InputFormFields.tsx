import { InputFormFieldProps } from "@/lib/types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from "react";

export default function InputFormFields({type, changeHandler, children, isRequired}: InputFormFieldProps) {
  return (
    <>
    <FormControl id={type} isRequired={isRequired??false}>
    <FormLabel>{children}</FormLabel>
    <Input type={type} onChange={changeHandler}/>
    </FormControl>
    </>
  )
}

export function genericFormHandler(setter: Dispatch<SetStateAction<string>>) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setter(event.currentTarget.value);
  }
}