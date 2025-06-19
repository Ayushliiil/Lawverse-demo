"use client";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to <span className="text-blue-400">Lawverse™</span>
      </h1>
      <p className="text-lg text-zinc-300 mb-6 text-center max-w-xl">
        AI-powered legal assistant to help you understand and use the law for your benefit.
      </p>
      <Link
        href="/chat"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-xl transition"
      >
        Try Now
      </Link>
    </main>
  );
}
