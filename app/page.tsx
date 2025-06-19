'use client';

import { useState } from 'react';
import ChatUI from '../components/ChatUI';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-4">
      {!showChat ? (
        <>
          <h1 className="text-4xl font-bold mb-6">⚖️ Welcome to Lawverse™</h1>
          <p className="text-lg mb-6 text-center max-w-md">Legal help made simple and free. Powered by AI, built for everyone.</p>
          <button
            className="bg-white text-zinc-900 font-semibold py-3 px-6 rounded-2xl hover:bg-zinc-200 transition-all"
            onClick={() => setShowChat(true)}
          >
            🚀 Try Now
          </button>
        </>
      ) : (
        <ChatUI />
      )}
    </main>
  );
}
