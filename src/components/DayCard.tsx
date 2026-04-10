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
      className={`glass-card group block rounded-3xl p-4 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200/80 ${day.colorClass}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Sesión</p>
          <h2 className="text-lg font-semibold leading-tight text-zinc-50 transition group-hover:text-white">
            {day.title}
          </h2>
          <p className="text-sm text-zinc-300">{day.subtitle}</p>
        </div>
        <span
          className={`inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-semibold ${
            completedToday
              ? "border-emerald-400/60 bg-emerald-500/25 text-emerald-100"
              : "border-indigo-300/40 bg-indigo-500/10 text-indigo-100"
          }`}
        >
          {completedToday ? "Completado hoy" : "Pendiente"}
        </span>
      </div>
    </Link>
  );
}
