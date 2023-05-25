import { Session, User } from "@supabase/supabase-js";
import { ChangeEventHandler, ReactElement } from "react";

export interface InputFormFieldProps {
    type?: string,
    changeHandler: ChangeEventHandler<HTMLInputElement>,
    children?: React.ReactNode,
    isRequired?: boolean,
}

export interface UserData {
    user: User | null,
    session: Session | null
}

export interface CardProps {
    heading: string;
    description: string;
    icon: ReactElement;
    href: string;
}

export interface featureDescription {
    heading: string,
    icon: string,
    description: string
}