"use client";

import NotLoggedIn from "@/components/AuthUI/NotLoggedIn";
import { useEffect, useState } from "react";
import { supabaseUser } from "@/lib/initSupabase";

export default function LayoutForUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseUser();
  const [isLoggedIn, setLogin] = useState(false);
  const [haventFetch, setCompleteFetch] = useState<boolean>(true);

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
    : isLoggedIn ? <>{children}</>
      : <NotLoggedIn />;
}
