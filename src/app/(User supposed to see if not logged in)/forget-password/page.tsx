"use client";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";

import { ChangeEvent, FormEvent, useState } from "react";
import InputFormFields, { genericInputHandler } from "@/components/FormsUI/InputFormFields";
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { AuthError, User } from "@supabase/supabase-js";
import { supabaseUser } from "../../../lib/initSupabase";
import { UserData } from "@/lib/types";

export default function PasswordRecovery() {

    const supabase = supabaseUser();

    const [email, setEmail] = useState("");
    const [authError, setError] = useState<AuthError | null>();
    const [data, setData] = useState<UserData>();
    
    const emailFormHandler = genericInputHandler(setEmail);

    const submitRecoveryHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { data, error } = await supabase.auth.verifyOtp({ email: email, token: "", type: 'recovery' });
        error && alert(error.message);
    }

    return (
        <form>
            Form
        </form>
    );
}