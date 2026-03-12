import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Manages all countdown timer logic.
 * Returns state + control handlers.
 */
export function useCountdown() {
  const [timeLeft, setTimeLeft]       = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [running, setRunning]         = useState(false);
  const [finished, setFinished]       = useState(false);
  const [mode, setMode]               = useState("set"); // "set" | "running"

  const endTimeRef  = useRef(null);
  const intervalRef = useRef(null);

  const tick = useCallback(() => {
    const left = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
    setTimeLeft(left);
    if (left <= 0) {
      clearInterval(intervalRef.current);
      setRunning(false);
      setFinished(true);
    }
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 200);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, tick]);

  /** Start a fresh countdown from given total seconds */
  function start(total) {
    if (total === 0) return;
    setTotalSeconds(total);
    setTimeLeft(total);
    setFinished(false);
    setMode("running");
    endTimeRef.current = Date.now() + total * 1000;
    setRunning(true);
  }

  /** Pause or resume */
  function togglePause() {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    } else {
      endTimeRef.current = Date.now() + timeLeft * 1000;
      setRunning(true);
    }
  }

  /** Reset back to set-mode */
  function reset(total) {
    clearInterval(intervalRef.current);
    setRunning(false);
    setFinished(false);
    setMode("set");
    setTimeLeft(total);
    setTotalSeconds(total);
  }

  const progress = totalSeconds > 0 ? 1 - timeLeft / totalSeconds : 0;

  return {
    timeLeft,
    totalSeconds,
    running,
    finished,
    mode,
    progress,
    start,
    togglePause,
    reset,
  };
}
