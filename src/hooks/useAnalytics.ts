import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "crypto";

function getVisitorId(): string {
  let id = localStorage.getItem("kozy_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("kozy_visitor_id", id);
  }
  return id;
}

function getSessionId(): string {
  let id = sessionStorage.getItem("kozy_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("kozy_session_id", id);
  }
  return id;
}

export function useAnalytics() {
  const location = useLocation();
  const lastPath = useRef<string>("");

  useEffect(() => {
    if (location.pathname === lastPath.current) return;
    lastPath.current = location.pathname;

    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;

    const trackVisit = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from("page_visits").insert({
        page_path: location.pathname,
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        user_id: user?.id || null,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });
    };

    trackVisit();
  }, [location.pathname]);
}
