// Fixed weekly class timetable shown on the public site. Labels live in the
// i18n dictionaries (schedule.classes / schedule.levels).

export type ClassKey = "grapplingMma" | "womenBjj" | "grappling" | "mma" | "openMat";
export type Level = "advanced" | "beginner" | "women" | "all";

export interface ClassSession {
  start: string;
  end: string;
  cls: ClassKey;
  level: Level;
}

const MON_WED_FRI: ClassSession[] = [
  { start: "09:30", end: "11:00", cls: "grapplingMma", level: "advanced" },
  { start: "16:45", end: "17:45", cls: "womenBjj", level: "women" },
  { start: "18:00", end: "19:45", cls: "grappling", level: "advanced" },
  { start: "20:00", end: "21:00", cls: "grappling", level: "beginner" },
];

const TUE_THU: ClassSession[] = [
  { start: "09:30", end: "11:00", cls: "mma", level: "advanced" },
  { start: "18:00", end: "19:45", cls: "mma", level: "advanced" },
  { start: "20:00", end: "21:00", cls: "mma", level: "beginner" },
];

const SAT: ClassSession[] = [{ start: "10:00", end: "12:00", cls: "openMat", level: "all" }];

/** Monday-first week; `day` uses JS numbering (0 = Sunday). */
export const WEEK: { day: number; sessions: ClassSession[] }[] = [
  { day: 1, sessions: MON_WED_FRI },
  { day: 2, sessions: TUE_THU },
  { day: 3, sessions: MON_WED_FRI },
  { day: 4, sessions: TUE_THU },
  { day: 5, sessions: MON_WED_FRI },
  { day: 6, sessions: SAT },
];
