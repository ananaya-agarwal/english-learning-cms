import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Learning CMS",
  description: "Admin panel for managing journeys, levels, lessons, and activities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}

