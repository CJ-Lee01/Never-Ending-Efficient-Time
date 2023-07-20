import { Dispatch, SetStateAction } from "react";
import { supabaseUser } from "./initSupabase";
import { TimerDataType } from "./types";
import { PostgrestError } from "@supabase/supabase-js";

export async function addTimer(timer: TimerDataType) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id;
  const { data, error } = await supabase
    .from("timers")
    .insert({
      ...timer,
      user_id: user_id,
    })
    .select();

  return { data, error };
}

export async function removeTimer(timer: TimerDataType) {
  const supabase = supabaseUser();
  const { error } = await supabase.from("timers").delete().eq("id", timer.id);

  return error;
}

export async function editTimer(timer: TimerDataType) {
  const supabase = supabaseUser();

  const { data, error } = await supabase
    .from("timers")
    .update(timer)
    .eq("id", timer.id)
    .select();

  return { data, error };
}

export async function getTimers(
  setState: Dispatch<
    SetStateAction<{
      data: any;
      error: null | PostgrestError;
    }>
  >
) {
  const supabase = supabaseUser();
  const { data, error } = await supabase.from("timers").select();

  setState({ data, error });
}
