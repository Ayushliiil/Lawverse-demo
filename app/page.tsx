"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-blue-400">Lawverse™</span>
        </h1>
        <p className="text-lg text-zinc-300">
          Your AI-powered legal assistant. Helping everyone access justice, instantly.
        </p>
        <Link
          href="/chat"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-xl shadow"
        >
          Try Now
        </Link>
      </div>
    </main>
  );
}
