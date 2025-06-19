'use client';
import ChatUI from '../components/ChatUI';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-900 dark:to-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-zinc-900 dark:text-white mb-6">
        Welcome to <span className="text-blue-600">Lawverse™</span>
      </h1>
      <p className="text-lg text-center text-zinc-600 dark:text-zinc-300 mb-8 max-w-xl">
        Your AI-powered legal assistant — helping people understand and use the law to their benefit.
      </p>

      <button
        onClick={() => document.getElementById('lawchat')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition mb-12"
      >
        🚀 Try Now
      </button>

      <div id="lawchat" className="w-full max-w-2xl">
        <ChatUI />
      </div>
    </main>
  );
}
