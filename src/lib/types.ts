export type DayId = "day-1" | "day-2" | "day-3" | "day-4" | "day-5";

export type Exercise = {
  id: string;
  historyKey: string;
  name: string;
  series: number;
};

export type TrainingDay = {
  id: DayId;
  title: string;
  subtitle: string;
  colorClass: string;
  exercises: Exercise[];
};

export type DayProgress = {
  date: string;
  completedSets: string[];
  weights: Record<string, string>;
};

export type WeightEntry = {
  value: string;
  date: string;
};
