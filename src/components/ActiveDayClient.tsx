"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RestTimer from "@/components/RestTimer";
import {
  appendWeightHistory,
  getDayProgress,
  getTodayKey,
  getWeightHistoryMap,
  saveDayProgress,
} from "@/lib/storage";
import { getSetKey, getTotalSets, isDayComplete } from "@/lib/training-plan";
import { DayProgress, TrainingDay, WeightEntry } from "@/lib/types";

const REST_MS = 3 * 60 * 1000;

type ActiveDayClientProps = {
  day: TrainingDay;
};

export default function ActiveDayClient({ day }: ActiveDayClientProps) {
  const router = useRouter();
  const todayKey = getTodayKey();

  const [progress, setProgress] = useState<DayProgress>(() =>
    getDayProgress(day.id, todayKey),
  );
  const [restEndTime, setRestEndTime] = useState<number | null>(null);
  const [alert, setAlert] = useState(false);
  const [historyMap, setHistoryMap] = useState<Record<string, WeightEntry[]>>(() =>
    getWeightHistoryMap(),
  );

  const persistProgress = (next: DayProgress) => {
    setProgress(next);
    saveDayProgress(day.id, next);
  };

  const completedCount = progress.completedSets.length;
  const totalSets = getTotalSets(day);
  const completeToday = isDayComplete(day, progress);

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  const onRestCompleted = () => {
    setAlert(true);
    if ("vibrate" in navigator) {
      navigator.vibrate([300, 120, 300]);
    }
    window.setTimeout(() => setAlert(false), 3500);
  };

  const toggleSet = (exerciseId: string, setNumber: number) => {
    const key = getSetKey(exerciseId, setNumber);
    const exists = progress.completedSets.includes(key);

    const nextCompleted = exists
      ? progress.completedSets.filter((setKey) => setKey !== key)
      : [...progress.completedSets, key];

    persistProgress({
      ...progress,
      completedSets: nextCompleted,
    });

    if (!exists) {
      setRestEndTime(new Date().getTime() + REST_MS);
    }
  };

  const updateWeight = (exerciseId: string, value: string) => {
    persistProgress({
      ...progress,
      weights: {
        ...progress.weights,
        [exerciseId]: value,
      },
    });
  };

  const saveWeightHistory = (historyKey: string, value: string) => {
    appendWeightHistory(historyKey, value, todayKey);
    setHistoryMap(getWeightHistoryMap());
  };

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-4 px-4 py-5">
      <header className="space-y-3">
        <button
          type="button"
          onClick={goBack}
          className="soft-panel min-h-12 rounded-xl px-4 text-sm font-semibold text-zinc-100"
        >
          ← Volver al plan
        </button>
        <div className="glass-card rounded-3xl p-4">
          <p className="kicker text-xs uppercase tracking-[0.18em]">Sesión activa</p>
          <h1 className="mt-1 text-2xl font-bold text-white">{day.title}</h1>
          <p className="text-sm text-zinc-300">{day.subtitle}</p>
        </div>
        <div className="soft-panel rounded-2xl p-3 text-sm">
          <p className="text-zinc-300">
            Progreso: <span className="font-semibold text-white">{completedCount}</span> de{" "}
            {totalSets} series completadas
          </p>
          {completeToday && (
            <p className="mt-1 font-semibold text-emerald-300">¡Día completado hoy!</p>
          )}
        </div>
      </header>

      <RestTimer endTime={restEndTime} onComplete={onRestCompleted} />

      {alert && (
        <div className="rounded-xl border border-emerald-500 bg-emerald-500/15 p-3 text-sm font-semibold text-emerald-200">
          Descanso terminado. Puedes empezar la siguiente serie.
        </div>
      )}

      <section className="space-y-4">
        {day.exercises.map((exercise) => {
          const history = historyMap[exercise.historyKey] ?? [];

          return (
            <article key={exercise.id} className="glass-card rounded-3xl p-4">
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-white">{exercise.name}</h2>
                <p className="text-sm text-zinc-300">{exercise.series} series programadas</p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {Array.from({ length: exercise.series }).map((_, index) => {
                  const setNumber = index + 1;
                  const isDone = progress.completedSets.includes(
                    getSetKey(exercise.id, setNumber),
                  );
                  return (
                    <button
                      key={setNumber}
                      type="button"
                      onClick={() => toggleSet(exercise.id, setNumber)}
                      aria-pressed={isDone}
                      className={`series-button min-h-14 rounded-2xl border px-3 text-left text-sm font-semibold ${
                        isDone ? "series-button-done text-emerald-100" : "series-button-pending text-zinc-100"
                      }`}
                    >
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-zinc-300/85">
                        Serie {setNumber}
                      </span>
                      <span className="mt-1 block text-base leading-none">
                        {isDone ? "Completada" : "Marcar como hecha"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-2">
                <label htmlFor={`${exercise.id}-weight`} className="block text-sm text-zinc-300">
                  Peso usado hoy
                </label>
                <input
                  id={`${exercise.id}-weight`}
                  type="text"
                  value={progress.weights[exercise.id] ?? ""}
                  onChange={(event) => updateWeight(exercise.id, event.target.value)}
                  onBlur={(event) => saveWeightHistory(exercise.historyKey, event.target.value)}
                  placeholder="Ejemplo: 25 kg"
                  className="field-input min-h-12 w-full rounded-xl border px-3 text-base text-zinc-100 placeholder:text-zinc-500"
                />
                <p className="text-xs text-zinc-400">
                  Se guarda automáticamente cuando sales de este campo.
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-zinc-200">Últimos 3 registros</p>
                {history.length > 0 ? (
                  <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                    {history.slice(0, 3).map((entry) => (
                      <li
                        key={`${exercise.historyKey}-${entry.date}`}
                        className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-2 py-1"
                      >
                        {entry.date}: {entry.value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-zinc-500">
                    Todavía no hay registros para este ejercicio.
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <Link
        href="/"
        className="soft-panel min-h-12 rounded-xl px-4 py-3 text-center text-sm font-semibold text-zinc-100"
      >
        Volver al plan
      </Link>
    </main>
  );
}
