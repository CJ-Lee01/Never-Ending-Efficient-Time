import { Dispatch, SetStateAction } from "react";
import { supabaseUser } from "./initSupabase";
import { PostgrestError } from "@supabase/supabase-js";
import { eventInformation } from "./types";

interface supabaseEventInfoFormat {
  id?: string;
  user_id?: string;
  event_name: string;
  event_description: string;
  start_time: string;
  end_time: string;
}

function convertStringToDateLocal(dateString: string): Date {
  return new Date(dateString + 'Z')
}

function convertToEventInformation(event: supabaseEventInfoFormat): eventInformation {
  return {
    ...event,
    start_time: convertStringToDateLocal(event.start_time),
    end_time: convertStringToDateLocal(event.end_time)
  }
}

function convertToDatabaseFormat(event: eventInformation): supabaseEventInfoFormat {
  return {
    ...event,
    start_time: event.start_time.toISOString(),
    end_time: event.end_time.toISOString()
  }
}

export async function addEvent(event: eventInformation) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id
  const { data, error } = await supabase
    .from('event')
    .insert(convertToDatabaseFormat(event))
    .select();

  return { data, error };
}
export async function addBulkEvent(eventList: eventInformation[]) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id
  const { data, error } = await supabase
    .from('event')
    .insert(eventList.map(event => {
      return {
        ...event,
        user_id: user_id
      }
    }).map(event => convertToDatabaseFormat(event)))
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
    .update(convertToDatabaseFormat(event))
    .eq('id', event.id)
    .select();

  return { data, error };
}

function compareDatetimes(eventA: supabaseEventInfoFormat, eventB: supabaseEventInfoFormat) {
  return eventA.start_time < eventB.start_time
    ? -1
    : eventA.start_time > eventB.start_time
      ? 1
      : 0
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
    .select();
  const eventList = (data as supabaseEventInfoFormat[])?.sort(compareDatetimes).map(event => convertToEventInformation(event));
  setState({ data: eventList, error: error });

}

export const defaultEvent: eventInformation = {
  event_name: "No name",
  event_description: "No description",
  start_time: new Date(),
  end_time: new Date(),
}