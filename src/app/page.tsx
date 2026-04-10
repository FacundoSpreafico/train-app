"use client";

import { useEffect, useState } from "react";
import DayCard from "@/components/DayCard";
import { getDayProgress, getTodayKey } from "@/lib/storage";
import { GLOBAL_SPECS, isDayComplete, TRAINING_DAYS } from "@/lib/training-plan";

export default function Home() {
  const [completedByDay, setCompletedByDay] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadCompleted = () => {
      const todayKey = getTodayKey();
      const nextState = Object.fromEntries(
        TRAINING_DAYS.map((day) => {
          const progress = getDayProgress(day.id, todayKey);
          return [day.id, isDayComplete(day, progress)];
        }),
      );
      setCompletedByDay(nextState);
    };

    loadCompleted();
    window.addEventListener("focus", loadCompleted);
    return () => window.removeEventListener("focus", loadCompleted);
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-6">
      <header className="glass-card mb-5 rounded-3xl p-5">
        <p className="kicker text-xs uppercase tracking-[0.2em]">
          Seguimiento diario
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-50">Plan de Entrenamiento</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Rutina Upper/Lower de 4 días + 1 día de descanso activo. Repeticiones:{" "}
          {GLOBAL_SPECS.reps}. Intensidad: {GLOBAL_SPECS.intensity}. Descanso mínimo:{" "}
          {GLOBAL_SPECS.restMinutes} min.
        </p>
      </header>

      <section className="space-y-3">
        {TRAINING_DAYS.map((day) => (
          <DayCard key={day.id} day={day} completedToday={Boolean(completedByDay[day.id])} />
        ))}
      </section>
    </main>
  );
}
