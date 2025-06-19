'use client';

import { useState } from 'react';

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-2xl p-8 max-w-xl w-full shadow-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          ⚖️ Lawverse™
        </h1>
        {!showMessage ? (
          <>
            <p className="text-zinc-400 text-lg mb-6">
              Our AI Legal Agent is currently under development.
            </p>
            <button
              onClick={() => setShowMessage(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all text-white font-bold py-3 px-8 rounded-2xl text-lg shadow-md"
            >
              🔁 Try Again
            </button>
          </>
        ) : (
          <p className="text-green-400 font-medium text-lg mt-4">
            Loading demo... Please wait 🧠⚖️
          </p>
        )}
      </div>
    </main>
  );
}
