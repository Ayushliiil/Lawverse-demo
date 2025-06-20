"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to <span className="text-blue-400">Lawverse™</span>
        </h1>
        <p className="text-lg text-zinc-300 max-w-xl mx-auto">
          Your AI-powered legal assistant — helping people understand and use the law to their benefit.
        </p>
        <Link
          href="/chat"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
        >
          Try Now
        </Link>
      </div>
    </main>
  );
}
