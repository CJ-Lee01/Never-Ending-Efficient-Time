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

export async function updateAvatar(avatarFile: File, pageUpdater: () => void) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id;
  const newPath = `avatars/${user_id}/${Date.now()}_avatar.png`;
  const oldFilePath = await getOldFilePath();
  // console.log("Old File path: " + oldFilePath);

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`${newPath}`, avatarFile, {
      upsert: false,
    });

  if (error) {
    console.error("Error uploading avatar:", error.message);
  } else {
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(`${newPath}`);

    const avatarUrl = data.publicUrl;

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user_id);
    if (error) {
      console.error("Error updating Avatar:", error.message);
    } else {
      if (oldFilePath != "") {
        const { data, error } = await supabase.storage
          .from("avatars")
          .remove([oldFilePath]);

        // console.log("Old File Removed: " + oldFilePath);

        if (error) {
          console.error("Error removing Avatar:", error.message);
        }
      }
    }
    pageUpdater();
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

export async function getOldFilePath() {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id;
  const storageUrl = "https://ftildovxenjyztgzfvla.supabase.co/storage/v1";
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user_id)
    .single();

  if (data?.avatar_url == null) {
    return "";
  } else {
    const filePath = data.avatar_url.replaceAll(
      `${storageUrl}/object/public/avatars/`,
      ""
    );
    return filePath;
  }
}
