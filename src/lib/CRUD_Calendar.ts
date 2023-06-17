import { Dispatch, SetStateAction } from "react";
import { supabaseUser } from "./initSupabase";
import { PostgrestError } from "@supabase/supabase-js";
import { eventInformation } from "./types";

export async function addEvent(event: eventInformation) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id
  const { data, error } = await supabase
    .from('event')
    .insert({
      ...event,
      user_id: user_id
    })
    .select();

  return { data, error };
}
export async function addBulkEvent(eventList: eventInformation[]) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id
  const { data, error } = await supabase
    .from('event')
    .insert(eventList.map(event => {return {
      ...event,
      user_id: user_id
    }}))
    .select();

  return { data, error };
}

export async function removeEvent(event: eventInformation) {
  const supabase = supabaseUser();

  const { error } = await supabase
    .from('event')
    .delete()
    .eq('id', event.id);

  return error;
}

export async function editEvent(event: eventInformation) {
  const supabase = supabaseUser();

  const { data, error } = await supabase
    .from('event')
    .update(event)
    .eq('id', event.id)
    .select();

  return { data, error };
}

export async function getEvent(setState: Dispatch<SetStateAction<
  {
    data: any,
    error: null | PostgrestError,
  }
>>) {
  const supabase = supabaseUser();
  const { data, error } = await supabase
    .from('event')
    .select()

  setState({ data, error })

}

export const defaultEvent: eventInformation = {
  event_name: "No name",
  event_description: "No description",
  start_time: "",
  end_time: "",
}