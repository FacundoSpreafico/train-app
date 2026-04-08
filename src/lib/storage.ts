"use client";

import { DayId, DayProgress, WeightEntry } from "@/lib/types";

const DAY_PROGRESS_KEY = "training-day-progress-v1";
const WEIGHT_HISTORY_KEY = "training-weight-history-v1";

type DayProgressMap = Record<string, DayProgress>;
type WeightHistoryMap = Record<string, WeightEntry[]>;

const isClient = () => typeof window !== "undefined";

const readJSON = <T>(key: string, fallback: T): T => {
  if (!isClient()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
};

const writeJSON = <T>(key: string, value: T) => {
  if (!isClient()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getTodayKey = () => new Date().toISOString().slice(0, 10);

export const getDayProgressMap = (): DayProgressMap =>
  readJSON<DayProgressMap>(DAY_PROGRESS_KEY, {});

export const getDayProgress = (dayId: DayId, todayKey: string): DayProgress => {
  const all = getDayProgressMap();
  const current = all[dayId];

  if (!current || current.date !== todayKey) {
    const reset: DayProgress = { date: todayKey, completedSets: [], weights: {} };
    all[dayId] = reset;
    writeJSON(DAY_PROGRESS_KEY, all);
    return reset;
  }

  return current;
};

export const saveDayProgress = (dayId: DayId, progress: DayProgress) => {
  const all = getDayProgressMap();
  all[dayId] = progress;
  writeJSON(DAY_PROGRESS_KEY, all);
};

export const getWeightHistoryMap = (): WeightHistoryMap =>
  readJSON<WeightHistoryMap>(WEIGHT_HISTORY_KEY, {});

export const appendWeightHistory = (
  historyKey: string,
  value: string,
  todayKey: string,
) => {
  const all = getWeightHistoryMap();
  const existing = all[historyKey] ?? [];
  const trimmedValue = value.trim();
  if (!trimmedValue) return;

  const next = [...existing];
  if (next[0]?.date === todayKey) {
    next[0] = { date: todayKey, value: trimmedValue };
  } else {
    next.unshift({ date: todayKey, value: trimmedValue });
  }

  all[historyKey] = next.slice(0, 3);
  writeJSON(WEIGHT_HISTORY_KEY, all);
};
