"use client";

import { useEffect, useState } from "react";
import { supabaseUser } from "@/lib/initSupabase";
import AlreadySignedIn from "@/components/AuthUI/AlreadySignIn";
import { ReactNode } from "react";

export default function LayoutForNonUser({
  children,
}: {
  children: ReactNode;
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
  }, [supabase.auth]);

  return haventFetch ? <>Fetching data....</>
    : isLoggedIn ? <AlreadySignedIn />
      : <>{children}</>;
}
