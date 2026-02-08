import type { Journey, ActivityType } from "./content-types";

let nextId = 1;
const nid = () => nextId++;

const a = (lessonId: number, order: number, type: ActivityType, isPublished: boolean, content: Record<string, unknown>) => ({
  id: nid(),
  lessonId,
  order,
  type,
  isPublished,
  content,
});

export const sampleJourney: Journey = (() => {
  const journeyId = nid();

  const level1Id = nid();
  const level2Id = nid();

  const lesson1Id = nid();
  const lesson2Id = nid();
  const lesson3Id = nid();
  const lesson4Id = nid();
  const lesson5Id = nid();
  const lesson6Id = nid();

  const lesson1Activities = [
    a(lesson1Id, 1, "VIDEO", true, {
      videoUrl: "https://example.com/videos/alphabet-intro",
      transcript:
        "A for Apple, B for Ball... Learn the English alphabet sounds.",
    }),
    a(lesson1Id, 2, "QUIZ", true, {
      question: "Which letter comes after C?",
      options: ["B", "D", "E", "F"],
      correctIndex: 1,
    }),
  ];

  const lesson2Activities = [
    a(lesson2Id, 1, "READING", true, {
      passageText:
        "Hello! My name is Sam. Nice to meet you. How are you today?",
      vocabulary: ["hello", "nice to meet you", "how are you"],
    }),
    a(lesson2Id, 2, "SPEAKING", true, {
      promptText:
        "Introduce yourself: say your name, where you are from, and one thing you like.",
      sampleAnswer:
        "Hi, I’m Ananya. I’m from India, and I like learning languages.",
    }),
  ];

  const lesson3Activities = [
    a(lesson3Id, 1, "QUIZ", true, {
      question: "It is 7:30. How do you say this time in English?",
      options: ["Seven thirty", "Thirty seven", "Half past eight"],
      correctIndex: 0,
    }),
  ];

  const lesson4Activities = [
    a(lesson4Id, 1, "VIDEO", true, {
      videoUrl: "https://example.com/videos/ordering-food",
      transcript:
        "Can I have a coffee, please? I’d like a sandwich and a juice.",
    }),
  ];

  const lesson5Activities = [
    a(lesson5Id, 1, "READING", true, {
      passageText:
        "Every morning, I wake up at 7:00. I eat breakfast, then go to work.",
      questions: ["What time does the person wake up?"],
    }),
  ];

  const lesson6Activities = [
    a(lesson6Id, 1, "SPEAKING", true, {
      promptText:
        "Make plans with a friend for the weekend. Say where, when, and what you will do.",
    }),
  ];

  const level1Lessons = [
    {
      id: lesson1Id,
      levelId: level1Id,
      order: 1,
      title: "Alphabet & Pronunciation",
      objective: "Learn the English alphabet and basic sounds.",
      isPublished: true,
      activities: lesson1Activities,
    },
    {
      id: lesson2Id,
      levelId: level1Id,
      order: 2,
      title: "Greetings & Introductions",
      objective: "Say hello and introduce yourself.",
      isPublished: true,
      activities: lesson2Activities,
    },
    {
      id: lesson3Id,
      levelId: level1Id,
      order: 3,
      title: "Numbers & Time",
      objective: "Talk about numbers and telling time.",
      isPublished: true,
      activities: lesson3Activities,
    },
  ];

  const level2Lessons = [
    {
      id: lesson4Id,
      levelId: level2Id,
      order: 1,
      title: "Ordering Food",
      objective: "Order food and drinks politely.",
      isPublished: true,
      activities: lesson4Activities,
    },
    {
      id: lesson5Id,
      levelId: level2Id,
      order: 2,
      title: "Talking About Your Day",
      objective: "Describe your daily routine.",
      isPublished: true,
      activities: lesson5Activities,
    },
    {
      id: lesson6Id,
      levelId: level2Id,
      order: 3,
      title: "Making Plans",
      objective: "Invite friends and make simple plans.",
      isPublished: true,
      activities: lesson6Activities,
    },
  ];

  return {
    id: journeyId,
    slug: "beginner-english-journey",
    title: "Beginner English Journey",
    description:
      "Start learning essential English vocabulary, phrases, and pronunciation.",
    isPublished: true,
    levels: [
      {
        id: level1Id,
        journeyId,
        order: 1,
        title: "Level 1: Basics",
        description: "Alphabet, greetings, and simple sentences.",
        isPublished: true,
        lessons: level1Lessons,
      },
      {
        id: level2Id,
        journeyId,
        order: 2,
        title: "Level 2: Everyday Conversation",
        description: "Speaking about daily routines and common situations.",
        isPublished: true,
        lessons: level2Lessons,
      },
    ],
  } satisfies Journey;
})();

export const sampleJourneys: Journey[] = [sampleJourney];

