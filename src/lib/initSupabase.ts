import { createClient } from '@supabase/supabase-js'

export const supabaseUser = () =>{
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "");
}

export const ROOT_URL = "https://never-ending-efficient-time.vercel.app/";

export function getAnyFromServer(table: string) {
  return async () => {
    const supabase = supabaseUser();

    const { data, error } = await supabase
      .from(table)
      .select();

    return { data, error };
  }
}
