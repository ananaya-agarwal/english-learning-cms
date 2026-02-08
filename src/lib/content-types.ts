export type ActivityType = "VIDEO" | "READING" | "QUIZ" | "SPEAKING";

export interface Activity {
  id: number;
  lessonId: number;
  order: number;
  type: ActivityType;
  isPublished: boolean;
  content: Record<string, unknown>;
}

export interface Lesson {
  id: number;
  levelId: number;
  order: number;
  title: string;
  objective?: string;
  isPublished: boolean;
  activities: Activity[];
}

export interface Level {
  id: number;
  journeyId: number;
  order: number;
  title: string;
  description?: string;
  isPublished: boolean;
  lessons: Lesson[];
}

export interface Journey {
  id: number;
  slug: string;
  title: string;
  description?: string;
  isPublished: boolean;
  levels: Level[];
}

