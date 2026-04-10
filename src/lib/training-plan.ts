import { DayProgress, TrainingDay } from "@/lib/types";

export const GLOBAL_SPECS = {
  reps: "5-8",
  intensity: "RIR 0-1",
  restMinutes: 3,
};

export const TRAINING_DAYS: TrainingDay[] = [
  {
    id: "day-1",
    title: "Día 1 - Torso A",
    subtitle: "Enfoque Pectoral",
    colorClass: "day-tone-upper",
    exercises: [
      {
        id: "d1-elevaciones-laterales",
        historyKey: "elevaciones-laterales",
        name: "Elevaciones laterales (Mancuernas / Polea)",
        series: 2,
      },
      {
        id: "d1-press-inclinado",
        historyKey: "press-inclinado",
        name: "Press inclinado (Mancuernas / Multipower)",
        series: 2,
      },
      {
        id: "d1-press-plano",
        historyKey: "press-plano",
        name: "Press plano (Mancuernas / Máquina)",
        series: 2,
      },
      {
        id: "d1-jalon-pecho",
        historyKey: "jalon-pecho",
        name: "Jalón al pecho",
        series: 2,
      },
      {
        id: "d1-remo-sagital",
        historyKey: "remo-plano-sagital",
        name: "Remo plano sagital (Polea / Remo Dorian)",
        series: 2,
      },
      {
        id: "d1-pull-over",
        historyKey: "pull-over-polea",
        name: "Pull over en polea",
        series: 2,
      },
      {
        id: "d1-extension-triceps",
        historyKey: "extension-triceps-polea",
        name: "Extensión de tríceps en polea",
        series: 2,
      },
      {
        id: "d1-curl-predicador",
        historyKey: "curl-predicador-maquina",
        name: "Curl predicador en máquina",
        series: 2,
      },
    ],
  },
  {
    id: "day-2",
    title: "Día 2 - Pierna A",
    subtitle: "Enfoque Cuádriceps",
    colorClass: "day-tone-lower",
    exercises: [
      {
        id: "d2-patron-sentadilla",
        historyKey: "patron-sentadilla",
        name: "Patrón de sentadilla (Hack / Sentadilla con barra)",
        series: 2,
      },
      {
        id: "d2-curl-femoral",
        historyKey: "curl-femoral",
        name: "Curl femoral",
        series: 2,
      },
      {
        id: "d2-extension-pierna",
        historyKey: "extension-pierna",
        name: "Extensión de pierna",
        series: 1,
      },
      {
        id: "d2-aductores",
        historyKey: "aductores-maquina",
        name: "Aductores en máquina",
        series: 2,
      },
      {
        id: "d2-gemelos-pie",
        historyKey: "gemelos-pie",
        name: "Gemelos de pie (Multipower / Máquina)",
        series: 2,
      },
      {
        id: "d2-crunch-abdominal",
        historyKey: "crunch-abdominal",
        name: "Crunch abdominal (Polea / Máquina)",
        series: 2,
      },
    ],
  },
  {
    id: "day-3",
    title: "Día 3 - Descanso Activo",
    subtitle: "Recuperación",
    colorClass: "day-tone-recovery",
    exercises: [
      {
        id: "d3-pasear",
        historyKey: "pasear-aire-libre",
        name: "Salir a pasear al aire libre",
        series: 2,
      },
      {
        id: "d3-lo-que-mas-guste",
        historyKey: "actividad-favorita",
        name: "Hacer lo que más te guste",
        series: 1,
      },
    ],
  },
  {
    id: "day-4",
    title: "Día 4 - Torso B",
    subtitle: "Enfoque Espalda",
    colorClass: "day-tone-upper",
    exercises: [
      {
        id: "d4-elevaciones-laterales",
        historyKey: "elevaciones-laterales",
        name: "Elevaciones laterales (Mancuernas / Máquina)",
        series: 2,
      },
      {
        id: "d4-jalon-pecho",
        historyKey: "jalon-pecho",
        name: "Jalón al pecho",
        series: 2,
      },
      {
        id: "d4-remo-sagital",
        historyKey: "remo-plano-sagital",
        name: "Remo plano sagital (Polea / Remo Dorian)",
        series: 2,
      },
      {
        id: "d4-pull-over",
        historyKey: "pull-over-polea",
        name: "Pull over en polea",
        series: 2,
      },
      {
        id: "d4-press-inclinado",
        historyKey: "press-inclinado",
        name: "Press inclinado (Mancuernas / Multipower)",
        series: 2,
      },
      {
        id: "d4-press-plano",
        historyKey: "press-plano",
        name: "Press plano (Mancuernas / Máquina)",
        series: 2,
      },
      {
        id: "d4-fondos-press-jm",
        historyKey: "fondos-lastrados-press-jm",
        name: "Fondos lastrados / Press JM en Multipower",
        series: 2,
      },
      {
        id: "d4-curl-predicador",
        historyKey: "curl-predicador-maquina",
        name: "Curl predicador en máquina",
        series: 2,
      },
    ],
  },
  {
    id: "day-5",
    title: "Día 5 - Pierna B",
    subtitle: "Enfoque Femoral",
    colorClass: "day-tone-lower",
    exercises: [
      {
        id: "d5-bisagra-cadera",
        historyKey: "bisagra-cadera",
        name: "Bisagra de cadera (Peso muerto rumano / Hiperextensiones)",
        series: 2,
      },
      {
        id: "d5-curl-femoral-tumbado",
        historyKey: "curl-femoral-tumbado",
        name: "Curl femoral tumbado",
        series: 2,
      },
      {
        id: "d5-patron-sentadilla",
        historyKey: "patron-sentadilla",
        name: "Patrón de sentadilla (Hack / Sentadilla con barra)",
        series: 1,
      },
      {
        id: "d5-extension-pierna",
        historyKey: "extension-pierna",
        name: "Extensión de pierna",
        series: 1,
      },
      {
        id: "d5-aductores",
        historyKey: "aductores-maquina",
        name: "Aductores en máquina",
        series: 2,
      },
      {
        id: "d5-gemelos-pie",
        historyKey: "gemelos-pie",
        name: "Gemelos de pie (Máquina / Multipower)",
        series: 2,
      },
      {
        id: "d5-crunch-abdominal",
        historyKey: "crunch-abdominal",
        name: "Crunch abdominal (Polea / Máquina)",
        series: 2,
      },
    ],
  },
];

export const getSetKey = (exerciseId: string, setNumber: number) =>
  `${exerciseId}-${setNumber}`;

export const getTotalSets = (day: TrainingDay) =>
  day.exercises.reduce((acc, exercise) => acc + exercise.series, 0);

export const isDayComplete = (day: TrainingDay, progress: DayProgress) =>
  progress.completedSets.length >= getTotalSets(day);
