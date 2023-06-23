import { Dispatch, SetStateAction } from "react";
import { supabaseUser } from "./initSupabase";
import { AnnouncementData } from "./types";
import { PostgrestError } from "@supabase/supabase-js";

export async function addBulkAnnoucement(announcementList: AnnouncementData[]) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id
  const { data, error } = await supabase
    .from('announcement')
    .insert(announcementList.map(announcement => {
      return {
        ...announcement,
        user_id: user_id
      }
    }))
    .select();

  return { data, error };
}

export async function removeAnnouncement(announcement: AnnouncementData) {
  const supabase = supabaseUser();

  const { error } = await supabase
    .from('announcement')
    .delete()
    .eq('id', announcement.id);

  return error;
}

export async function getAnnouncements(setState: Dispatch<SetStateAction<
  {
    data: any,
    error: null | PostgrestError,
  }
>>) {
  const supabase = supabaseUser();
  const { data, error } = await supabase
    .from('announcement')
    .select()

  setState({ data, error })

}