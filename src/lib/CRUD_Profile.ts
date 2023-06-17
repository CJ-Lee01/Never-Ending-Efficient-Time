import { PostgrestError } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { supabaseUser } from "./initSupabase";

export async function getProfile(
  setState: Dispatch<
    SetStateAction<{
      data: any;
      error: null | PostgrestError;
    }>
  >
) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id;
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user_id)
    .single();

  setState({ data, error });
}
