"use client"

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';




export default function App() {
  
  const supabase = createClient(
    'https://ftildovxenjyztgzfvla.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0aWxkb3Z4ZW5qeXp0Z3pmdmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NjgzODYsImV4cCI6MjAwMDI0NDM4Nn0.4EjdmCUIUYoXLJ5NHqqTove7fxAjGw1wdA0bb0MuV8c'
  );
  return <Auth
    providers={[]}
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
  />
};