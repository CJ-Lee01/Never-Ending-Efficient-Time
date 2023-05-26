"use client";

import NotLoggedIn from "@/components/AuthUI/NotLoggedIn";
import { UserData } from "@/lib/types";
import { AuthError, Session } from "@supabase/supabase-js";
import { useState } from "react";
import { supabaseUser } from "@/lib/initSupabase";
import SignOutButton from "@/components/AuthUI/SignOutButton";

export default function dashboard() {
  const supabase = supabaseUser();
  const [isLoggedIn, setLogin] = useState(false);
  const [authError, setError] = useState<AuthError | null>();
  const [data, setData] = useState<{ session: Session | null }>();
  const [haventFetch, setCompleteFetch] = useState<boolean>(true);

  const refreshStatus = async () => {
    const { data, error } = await supabase.auth.getSession();
    setCompleteFetch(false);
    const { session } = data;
    setData(data);
    setError(error);
    setLogin(session !== null);
  };

  refreshStatus();
  return haventFetch ? (
    <>Fetching data....</>
  ) : isLoggedIn ? (
    <div>
      You are logged in! Future dashboard UI here.
      <SignOutButton />
    </div>
  ) : (
    <NotLoggedIn />
  );
}
