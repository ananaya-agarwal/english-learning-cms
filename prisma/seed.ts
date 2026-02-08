import pkg from "@prisma/client";
const { PrismaClient, ActivityType } = pkg;
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "Admin123!";

  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashed,
    },
  });

  const journey = await prisma.journey.create({
    data: {
      slug: "beginner-english-journey",
      title: "Beginner English Journey",
      description:
        "Start learning essential English vocabulary, phrases, and pronunciation.",
      isPublished: true,
    },
  });

  const level1 = await prisma.level.create({
    data: {
      journeyId: journey.id,
      order: 1,
      title: "Level 1: Basics",
      description: "Alphabet, greetings, and simple sentences.",
      isPublished: true,
    },
  });

  const level2 = await prisma.level.create({
    data: {
      journeyId: journey.id,
      order: 2,
      title: "Level 2: Everyday Conversation",
      description: "Speaking about daily routines and common situations.",
      isPublished: true,
    },
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      levelId: level1.id,
      order: 1,
      title: "Alphabet & Pronunciation",
      objective: "Learn the English alphabet and basic sounds.",
      isPublished: true,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      levelId: level1.id,
      order: 2,
      title: "Greetings & Introductions",
      objective: "Say hello and introduce yourself.",
      isPublished: true,
    },
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      levelId: level1.id,
      order: 3,
      title: "Numbers & Time",
      objective: "Talk about numbers and telling time.",
      isPublished: true,
    },
  });

  const lesson4 = await prisma.lesson.create({
    data: {
      levelId: level2.id,
      order: 1,
      title: "Ordering Food",
      objective: "Order food and drinks politely.",
      isPublished: true,
    },
  });

  const lesson5 = await prisma.lesson.create({
    data: {
      levelId: level2.id,
      order: 2,
      title: "Talking About Your Day",
      objective: "Describe your daily routine.",
      isPublished: true,
    },
  });

  const lesson6 = await prisma.lesson.create({
    data: {
      levelId: level2.id,
      order: 3,
      title: "Making Plans",
      objective: "Invite friends and make simple plans.",
      isPublished: true,
    },
  });

  // Activities for lesson1 (Video + Quiz)
  await prisma.activity.createMany({
    data: [
      {
        lessonId: lesson1.id,
        order: 1,
        type: ActivityType.VIDEO,
        isPublished: true,
        content: {
          videoUrl: "https://example.com/videos/alphabet-intro",
          transcript:
            "A for Apple, B for Ball... Learn the English alphabet sounds.",
        },
      },
      {
        lessonId: lesson1.id,
        order: 2,
        type: ActivityType.QUIZ,
        isPublished: true,
        content: {
          question: "Which letter comes after C?",
          options: ["B", "D", "E", "F"],
          correctIndex: 1,
        },
      },
    ],
  });

  // Activities for lesson2 (Reading + Speaking)
  await prisma.activity.createMany({
    data: [
      {
        lessonId: lesson2.id,
        order: 1,
        type: ActivityType.READING,
        isPublished: true,
        content: {
          passageText:
            "Hello! My name is Sam. Nice to meet you. How are you today?",
          vocabulary: ["hello", "nice to meet you", "how are you"],
        },
      },
      {
        lessonId: lesson2.id,
        order: 2,
        type: ActivityType.SPEAKING,
        isPublished: true,
        content: {
          promptText:
            "Introduce yourself: say your name, where you are from, and one thing you like.",
          sampleAnswer:
            "Hi, I’m Ananya. I’m from India, and I like learning languages.",
        },
      },
    ],
  });

  // Activities for lesson3 (Quiz)
  await prisma.activity.create({
    data: {
      lessonId: lesson3.id,
      order: 1,
      type: ActivityType.QUIZ,
      isPublished: true,
      content: {
        question: "It is 7:30. How do you say this time in English?",
        options: ["Seven thirty", "Thirty seven", "Half past eight"],
        correctIndex: 0,
      },
    },
  });

  // Activities for lesson4 (Video)
  await prisma.activity.create({
    data: {
      lessonId: lesson4.id,
      order: 1,
      type: ActivityType.VIDEO,
      isPublished: true,
      content: {
        videoUrl: "https://example.com/videos/ordering-food",
        transcript:
          "Can I have a coffee, please? I’d like a sandwich and a juice.",
      },
    },
  });

  // Activities for lesson5 (Reading)
  await prisma.activity.create({
    data: {
      lessonId: lesson5.id,
      order: 1,
      type: ActivityType.READING,
      isPublished: true,
      content: {
        passageText:
          "Every morning, I wake up at 7:00. I eat breakfast, then go to work.",
        questions: ["What time does the person wake up?"],
      },
    },
  });

  // Activities for lesson6 (Speaking)
  await prisma.activity.create({
    data: {
      lessonId: lesson6.id,
      order: 1,
      type: ActivityType.SPEAKING,
      isPublished: true,
      content: {
        promptText:
          "Make plans with a friend for the weekend. Say where, when, and what you will do.",
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

