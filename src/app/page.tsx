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
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-5">
      <header className="mb-5 space-y-3">
        <h1 className="text-3xl font-bold text-white">Plan de Entrenamiento</h1>
        <p className="text-sm text-zinc-300">
          Upper/Lower 4 días. Reps {GLOBAL_SPECS.reps}, Intensidad{" "}
          {GLOBAL_SPECS.intensity}, Descanso ≥ {GLOBAL_SPECS.restMinutes} min.
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
