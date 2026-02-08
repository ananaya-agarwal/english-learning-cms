"use client";

import { useState } from "react";
import { dummyJourneys } from "../../lib/dummy-data";
import type { Journey, Activity } from "../../lib/content-types";

function PublishBadge({ published }: { published: boolean }) {
  return (
    <span
      className={
        published
          ? "rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400"
          : "rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-400"
      }
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

function activityPreview(activity: Activity): string {
  const c = activity.content as Record<string, unknown>;
  switch (activity.type) {
    case "VIDEO":
      return (c.videoUrl as string) || "Video";
    case "READING":
      return (c.passageText as string)?.slice(0, 50) + "..." || "Reading";
    case "QUIZ":
      return (c.question as string) || "Quiz";
    case "SPEAKING":
      return (c.promptText as string)?.slice(0, 50) + "..." || "Speaking";
    default:
      return activity.type;
  }
}

export default function AdminHomePage() {
  const [selectedJourneyId, setSelectedJourneyId] = useState<number | null>(
    dummyJourneys[0]?.id ?? null
  );
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);

  const journey: Journey | undefined = dummyJourneys.find(
    (j) => j.id === selectedJourneyId
  );
  const selectedLevel = journey?.levels.find((l) => l.id === selectedLevelId);
  // When journey changes, select first level
  const effectiveLevelId =
    selectedLevelId && journey?.levels.some((l) => l.id === selectedLevelId)
      ? selectedLevelId
      : journey?.levels[0]?.id ?? null;
  const effectiveLevel = journey?.levels.find((l) => l.id === effectiveLevelId);

  const setJourney = (id: number) => {
    setSelectedJourneyId(id);
    const j = dummyJourneys.find((x) => x.id === id);
    setSelectedLevelId(j?.levels[0]?.id ?? null);
  };

  const setLevel = (id: number) => setSelectedLevelId(id);

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Content (dummy data – validate flow)
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Select a journey → level → see lessons and activities. Draft vs
          published shown.
        </p>
      </header>

      {/* Journey selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Journey
        </span>
        {dummyJourneys.map((j) => {
          const active = j.id === selectedJourneyId;
          return (
            <button
              key={j.id}
              type="button"
              onClick={() => setJourney(j.id)}
              className={
                active
                  ? "rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-50"
                  : "rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
              }
            >
              {j.title}
            </button>
          );
        })}
      </div>

      {!journey ? (
        <p className="text-sm text-slate-400">Select a journey.</p>
      ) : (
        <div className="grid grid-cols-[220px,1fr] gap-6">
          <aside className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Levels
              </h2>
              <PublishBadge published={journey.isPublished} />
            </div>
            <div className="space-y-1">
              {journey.levels.map((level) => {
                const isActive = level.id === effectiveLevelId;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setLevel(level.id)}
                    className={
                      isActive
                        ? "block w-full rounded-md bg-slate-800 px-3 py-2 text-left text-sm text-slate-50"
                        : "block w-full rounded-md bg-slate-900 px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800/70"
                    }
                  >
                    <div className="font-medium">{level.title}</div>
                    {level.description && (
                      <div className="mt-0.5 line-clamp-2 text-xs text-slate-400">
                        {level.description}
                      </div>
                    )}
                    <div className="mt-1">
                      <PublishBadge published={level.isPublished} />
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="space-y-4">
            {effectiveLevel ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {effectiveLevel.title}
                    </h2>
                    {effectiveLevel.description && (
                      <p className="mt-1 text-sm text-slate-400">
                        {effectiveLevel.description}
                      </p>
                    )}
                  </div>
                  <PublishBadge published={effectiveLevel.isPublished} />
                </div>

                <div className="space-y-3">
                  {effectiveLevel.lessons.map((lesson) => (
                    <article
                      key={lesson.id}
                      className="rounded-xl border border-slate-800 bg-slate-900/70 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {lesson.title}
                          </h3>
                          {lesson.objective && (
                            <p className="mt-1 text-xs text-slate-400">
                              {lesson.objective}
                            </p>
                          )}
                        </div>
                        <PublishBadge published={lesson.isPublished} />
                      </div>

                      <ul className="mt-3 space-y-2 text-xs">
                        {lesson.activities.map((activity) => (
                          <li
                            key={activity.id}
                            className="flex flex-col gap-0.5 rounded-md bg-slate-900 px-2 py-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-200">
                                {activity.type}
                              </span>
                              <PublishBadge published={activity.isPublished} />
                            </div>
                            <span className="text-slate-400 line-clamp-2">
                              {activityPreview(activity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400">
                Select a level on the left to view lessons and activities.
              </p>
            )}
          </main>
        </div>
      )}
    </section>
  );
}
