"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-blue-400">Lawverse™</span></h1>
      <p className="text-lg text-zinc-300 mb-6 text-center max-w-xl">
        Your AI-powered legal assistant — helping people understand and use the law to their benefit.
      </p>
      <Link href="/chat" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow">
         Try Now
      </Link>
    </main>
  );
}
