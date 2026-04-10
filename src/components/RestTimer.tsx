"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type RestTimerProps = {
  endTime: number | null;
  onComplete: () => void;
};

const formatSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default function RestTimer({ endTime, onComplete }: RestTimerProps) {
  const [now, setNow] = useState(() => new Date().getTime());
  const firedRef = useRef(false);

  useEffect(() => {
    if (!endTime) return;
    firedRef.current = false;
    const interval = window.setInterval(() => setNow(new Date().getTime()), 250);
    return () => window.clearInterval(interval);
  }, [endTime]);

  const remainingSeconds = useMemo(() => {
    if (!endTime) return 0;
    const ms = endTime - now;
    return Math.max(0, Math.ceil(ms / 1000));
  }, [endTime, now]);

  useEffect(() => {
    if (!endTime || remainingSeconds > 0 || firedRef.current) return;
    firedRef.current = true;
    onComplete();
  }, [endTime, onComplete, remainingSeconds]);

  if (!endTime) {
    return (
      <div className="soft-panel rounded-2xl p-3 text-sm text-zinc-300">
        El descanso empieza cuando marcas una serie. Duración: 3:00.
      </div>
    );
  }

  return (
      <div
        className={`rounded-2xl border p-3 ${
          remainingSeconds === 0
            ? "status-complete"
            : "soft-panel text-zinc-100"
        }`}
      >
      <p className="kicker text-xs uppercase tracking-[0.18em]">Descanso entre series</p>
      <p className="text-3xl font-bold tabular-nums">{formatSeconds(remainingSeconds)}</p>
      {remainingSeconds === 0 && (
        <p className="text-sm font-medium">Descanso terminado. Ya puedes iniciar la siguiente serie.</p>
      )}
    </div>
  );
}
