import { Dispatch, SetStateAction } from "react";
import { supabaseUser } from "./initSupabase";
import { TasksInformation } from "./types";
import { PostgrestError } from "@supabase/supabase-js";

export async function addTask(task: TasksInformation) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id
  const { data, error } = await supabase
    .from('todos')
    .insert({
      ...task,
      user_id: user_id
    })
    .select();

  return { data, error };
}

export async function addBulkTasks(taskList: TasksInformation[]) {
  const supabase = supabaseUser();
  const user_id = (await supabase.auth.getSession()).data.session?.user.id
  const { data, error } = await supabase
    .from('todos')
    .insert(taskList.map(taskList => {
      return {
        ...taskList,
        user_id: user_id
      }
    }))
    .select();

  return { data, error };
}

export async function removeTask(task: TasksInformation) {
  const supabase = supabaseUser();

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', task.id);

  return error;
}

export async function editTask(task: TasksInformation) {
  const supabase = supabaseUser();

  const { data, error } = await supabase
    .from('todos')
    .update(task)
    .eq('id', task.id)
    .select();

  return { data, error };
}

export async function getTasks(setState: Dispatch<SetStateAction<
  {
    data: any,
    error: null | PostgrestError,
  }
>>) {
  const supabase = supabaseUser();
  const { data, error } = await supabase
    .from('todos')
    .select()

  setState({ data, error })

}