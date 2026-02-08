import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-900/60 px-4 py-6">
        <div className="mb-6">
          <Link href="/" className="block text-sm font-semibold text-slate-200">
            English Learning CMS
          </Link>
          <p className="mt-1 text-xs text-slate-400">Admin dashboard</p>
        </div>
        <nav className="flex-1 space-y-1 text-sm">
          <Link
            href="/admin"
            className="flex items-center rounded-md px-2 py-1.5 text-slate-200 hover:bg-slate-800/80"
          >
            Journeys
          </Link>
          <button
            type="button"
            className="flex w-full cursor-default items-center rounded-md px-2 py-1.5 text-left text-slate-500"
          >
            Settings (coming soon)
          </button>
        </nav>
      </aside>
      <main className="flex-1 px-6 py-6">{children}</main>
    </div>
  );
}

