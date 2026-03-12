import { useState, useEffect } from "react";

/**
 * Returns a live Date object that updates every second.
 */
export function useRealTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return now;
}

/**
 * Formats a Date into clock parts.
 */
export function formatRealTime(date) {
  const h24 = date.getHours();
  const h12 = h24 % 12 || 12;
  return {
    h12: String(h12).padStart(2, "0"),
    m:   String(date.getMinutes()).padStart(2, "0"),
    s:   String(date.getSeconds()).padStart(2, "0"),
    ampm: h24 >= 12 ? "PM" : "AM",
  };
}
