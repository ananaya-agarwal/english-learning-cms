import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="max-w-xl rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg shadow-slate-900/60">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          English Learning CMS
        </p>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">
          Admin panel for journeys, levels, lessons & activities
        </h1>
        <p className="mb-6 text-sm text-slate-300">
          Use this CMS to manage the content hierarchy for your English learning
          app. Start by opening the admin dashboard.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Open admin dashboard
        </Link>
      </div>
    </main>
  );
}

