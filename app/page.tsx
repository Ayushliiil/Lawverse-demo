'use client';

import { useState } from 'react';
import ChatUI from '../components/ChatUI';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-12 flex flex-col items-center justify-center">
      {!showChat ? (
        <section className="text-center space-y-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            ⚖️ Lawverse™ AI
          </h1>
          <p className="text-lg text-zinc-400 font-medium">
            Get instant, free legal help from an intelligent assistant trained in the law. No signup. No fees.
          </p>
          <button
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all text-white font-bold py-3 px-8 rounded-2xl text-lg shadow-lg"
            onClick={() => setShowChat(true)}
          >
            Try Now
          </button>
        </section>
      ) : (
        <section className="w-full max-w-4xl mt-10">
          <ChatUI />
        </section>
      )}
    </main>
  );
}
