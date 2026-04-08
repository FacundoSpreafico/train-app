"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import ActiveDayClient from "@/components/ActiveDayClient";
import { TRAINING_DAYS } from "@/lib/training-plan";

export default function ActiveDayPage() {
  const params = useParams<{ dayId: string }>();
  const dayId = params.dayId;
  const day = TRAINING_DAYS.find((item) => item.id === dayId);

  if (!day) {
    return (
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-white">Día no encontrado</h1>
        <p className="text-zinc-300">Elegí un día válido desde la pantalla principal.</p>
        <Link
          href="/"
          className="soft-panel min-h-12 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-100"
        >
          Ir al inicio
        </Link>
      </main>
    );
  }

  return <ActiveDayClient day={day} />;
}
