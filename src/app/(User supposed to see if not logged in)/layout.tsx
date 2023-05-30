"use client";

import NotLoggedIn from "@/components/AuthUI/NotLoggedIn";
import { AuthError, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabaseUser } from "@/lib/initSupabase";
import AlreadySignedIn from "@/components/AuthUI/AlreadySignIn";

export default function LayoutForNonUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseUser();
  const [haventFetch, setCompleteFetch] = useState<boolean>(true);

  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        setLogin(true);
      }
      if (event == "SIGNED_OUT") {
        setLogin(false);
      }
      setCompleteFetch(false)
    });
  }, [isLoggedIn]);

  return haventFetch ? <>Fetching data....</>
    : isLoggedIn ? <AlreadySignedIn />
      : <>{children}</>;
}
