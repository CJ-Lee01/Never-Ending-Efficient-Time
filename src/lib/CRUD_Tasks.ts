import { supabaseUser } from "./initSupabase";
import { TasksInformation } from "./types";

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
    .from('todo')
    .update(task)
    .eq('id', task.id)
    .select();

  return { data, error };
}

export async function getTasks() {
  const supabase = supabaseUser();
  const { data, error } = await supabase
    .from('todos')
    .select()

  return { data, error }

}