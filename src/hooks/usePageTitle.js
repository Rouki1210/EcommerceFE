import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} — Maison`;
    return () => { document.title = "Maison"; }; // reset on unmount
  }, [title]);
}