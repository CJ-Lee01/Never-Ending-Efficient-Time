"use client"

import { createClient } from '@supabase/supabase-js'

export const supabaseUser = () => createClient(
  "https://ftildovxenjyztgzfvla.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0aWxkb3Z4ZW5qeXp0Z3pmdmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NjgzODYsImV4cCI6MjAwMDI0NDM4Nn0.4EjdmCUIUYoXLJ5NHqqTove7fxAjGw1wdA0bb0MuV8c"
);

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
