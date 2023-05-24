import { ChangeEventHandler } from "react";

export interface InputFormFieldProps {
    type?: string,
    changeHandler: ChangeEventHandler<HTMLInputElement>,
    children?: React.ReactNode,
    isRequired?: boolean,
}