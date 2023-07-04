import { PostgrestError } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { supabaseUser } from "./initSupabase";
import { ProfileType } from "./types";
import { profile } from "console";

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

export async function updateAvatar(avatarFile: File) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`avatars/${user_id}/avatar.png`, avatarFile, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading avatar:", error.message);
  } else {
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(`avatars/${user_id}/avatar.png`);

    const avatarUrl = data.publicUrl;
    console.log(avatarUrl);

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user_id);
    if (error) {
      console.error("Error updating Avatar:", error.message);
    }
  }
}

export async function updateName(username: string) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id;
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: username })
    .eq("id", user_id);

  if (error) {
    console.error("Error updating Name:", error.message);
  }
}
