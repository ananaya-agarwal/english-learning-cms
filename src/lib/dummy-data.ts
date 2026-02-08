/**
 * Dummy data for validating CMS user flow:
 * - Journey list → select journey
 * - Levels list → select level
 * - Lessons + activities (all 4 types: Video, Reading, Quiz, Speaking)
 * - Published vs draft states
 */
import type { Journey, ActivityType } from "./content-types";

let nextId = 1;
const id = () => nextId++;

function activity(
  lessonId: number,
  order: number,
  type: ActivityType,
  isPublished: boolean,
  content: Record<string, unknown>
) {
  return {
    id: id(),
    lessonId,
    order,
    type,
    isPublished,
    content,
  };
}

function lesson(
  levelId: number,
  order: number,
  title: string,
  objective: string,
  isPublished: boolean,
  activities: ReturnType<typeof activity>[]
) {
  return {
    id: id(),
    levelId,
    order,
    title,
    objective,
    isPublished,
    activities,
  };
}

function level(
  journeyId: number,
  order: number,
  title: string,
  description: string,
  isPublished: boolean,
  lessons: ReturnType<typeof lesson>[]
) {
  return {
    id: id(),
    journeyId,
    order,
    title,
    description,
    isPublished,
    lessons,
  };
}

/** Dummy journeys for flow validation: 2 journeys, 2 levels each, 6 lessons total in first, mix of published/draft */
export function getDummyData(): Journey[] {
  const j1Id = id();
  const j2Id = id();

  // ---- Journey 1: Beginner (fully published + 1 draft lesson) ----
  const l1Id = id();
  const l2Id = id();

  const le1Id = id();
  const le2Id = id();
  const le3Id = id();
  const le4Id = id();
  const le5Id = id();
  const le6Id = id();

  const lev1 = level(
    j1Id,
    1,
    "Level 1: Basics",
    "Alphabet, greetings, and simple sentences.",
    true,
    [
      lesson(
        l1Id,
        1,
        "Alphabet & Pronunciation",
        "Learn the English alphabet and basic sounds.",
        true,
        [
          activity(le1Id, 1, "VIDEO", true, {
            videoUrl: "https://example.com/videos/alphabet-intro",
            transcript: "A for Apple, B for Ball... Learn the English alphabet sounds.",
            durationSeconds: 120,
          }),
          activity(le1Id, 2, "QUIZ", true, {
            question: "Which letter comes after C?",
            options: ["B", "D", "E", "F"],
            correctIndex: 1,
          }),
        ]
      ),
      lesson(
        l1Id,
        2,
        "Greetings & Introductions",
        "Say hello and introduce yourself.",
        true,
        [
          activity(le2Id, 1, "READING", true, {
            passageText: "Hello! My name is Sam. Nice to meet you. How are you today?",
            vocabulary: ["hello", "nice to meet you", "how are you"],
          }),
          activity(le2Id, 2, "SPEAKING", true, {
            promptText: "Introduce yourself: say your name, where you are from, and one thing you like.",
            sampleAnswer: "Hi, I'm Ananya. I'm from India, and I like learning languages.",
          }),
        ]
      ),
      lesson(
        l1Id,
        3,
        "Numbers & Time",
        "Talk about numbers and telling time.",
        true,
        [
          activity(le3Id, 1, "QUIZ", true, {
            question: "It is 7:30. How do you say this time in English?",
            options: ["Seven thirty", "Thirty seven", "Half past eight"],
            correctIndex: 0,
          }),
        ]
      ),
    ]
  );

  const lev2 = level(
    j1Id,
    2,
    "Level 2: Everyday Conversation",
    "Speaking about daily routines and common situations.",
    true,
    [
      lesson(le4Id, 1, "Ordering Food", "Order food and drinks politely.", true, [
        activity(le4Id, 1, "VIDEO", true, {
          videoUrl: "https://example.com/videos/ordering-food",
          transcript: "Can I have a coffee, please? I'd like a sandwich and a juice.",
        }),
      ]),
      lesson(le5Id, 2, "Talking About Your Day", "Describe your daily routine.", true, [
        activity(le5Id, 1, "READING", true, {
          passageText: "Every morning, I wake up at 7:00. I eat breakfast, then go to work.",
          questions: ["What time does the person wake up?"],
        }),
      ]),
      lesson(le6Id, 3, "Making Plans", "Invite friends and make simple plans.", true, [
        activity(le6Id, 1, "SPEAKING", true, {
          promptText: "Make plans with a friend for the weekend. Say where, when, and what you will do.",
        }),
      ]),
    ]
  );

  const journey1: Journey = {
    id: j1Id,
    slug: "beginner-english-journey",
    title: "Beginner English Journey",
    description: "Start learning essential English vocabulary, phrases, and pronunciation.",
    isPublished: true,
    levels: [lev1, lev2],
  };

  // ---- Journey 2: Intermediate (one level draft, one lesson draft, one activity draft) ----
  const l3Id = id();
  const l4Id = id();
  const le7Id = id();
  const le8Id = id();
  const le9Id = id();

  const lev3 = level(
    j2Id,
    1,
    "Level 1: Grammar Basics",
    "Simple present and past tense.",
    true,
    [
      lesson(le7Id, 1, "Simple Present", "Use present tense for habits and facts.", true, [
        activity(le7Id, 1, "VIDEO", true, {
          videoUrl: "https://example.com/videos/simple-present",
          transcript: "I work every day. She likes coffee.",
        }),
        activity(le7Id, 2, "QUIZ", false, {
          question: "[Draft] Choose the correct form: She ___ to school every day.",
          options: ["go", "goes", "going"],
          correctIndex: 1,
        }),
      ]),
    ]
  );

  const lev4 = level(
    j2Id,
    2,
    "Level 2: Writing Practice",
    "Short paragraphs and emails.",
    false, // draft level
    [
      lesson(le8Id, 1, "Writing an Email", "Draft a short formal email.", false, [
        activity(le8Id, 1, "READING", true, {
          passageText: "Dear Sir, I am writing to inquire about...",
        }),
      ]),
      lesson(le9Id, 2, "Speaking: Phone Call", "Leave a short voicemail.", false, [
        activity(le9Id, 1, "SPEAKING", false, {
          promptText: "[Draft] Leave a 30-second voicemail asking for a callback.",
        }),
      ]),
    ]
  );

  const journey2: Journey = {
    id: j2Id,
    slug: "intermediate-english-journey",
    title: "Intermediate English Journey",
    description: "Grammar, writing, and listening practice.",
    isPublished: false, // draft journey
    levels: [lev3, lev4],
  };

  return [journey1, journey2];
}

export const dummyJourneys = getDummyData();
