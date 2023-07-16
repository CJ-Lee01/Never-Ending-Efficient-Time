import { PostgrestError } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { supabaseUser } from "./initSupabase";
import { canvasSyncQuery } from "./types";

export async function getLastCanvasAccess(
  setState: Dispatch<
    SetStateAction<Date>
  >
) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id;
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user_id)
    .single();
  setState(new Date(data?.last_canvas_sync ?? 0));
}

export async function setLastCanvasAccess(date: Date = new Date()) {
  const setDate = date;
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id;
  const { data, error } = await supabase
    .from("profiles")
    .update({
      last_canvas_sync: setDate
    })
    .eq("id", user_id)
    .single();
}