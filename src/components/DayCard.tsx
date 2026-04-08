"use client";

import Link from "next/link";
import { TrainingDay } from "@/lib/types";

type DayCardProps = {
  day: TrainingDay;
  completedToday: boolean;
};

export default function DayCard({ day, completedToday }: DayCardProps) {
  return (
    <Link
      href={`/day/${day.id}`}
      className={`block rounded-2xl border bg-gradient-to-br p-4 shadow-lg shadow-black/20 transition hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 ${day.colorClass}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold leading-tight text-white">{day.title}</h2>
          <p className="text-sm text-zinc-200">{day.subtitle}</p>
        </div>
        <span
          className={`inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-semibold ${
            completedToday
              ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"
              : "border-zinc-500/60 bg-zinc-800/70 text-zinc-300"
          }`}
        >
          {completedToday ? "Completado hoy" : "Pendiente"}
        </span>
      </div>
    </Link>
  );
}
