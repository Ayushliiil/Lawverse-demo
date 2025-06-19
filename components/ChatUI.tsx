"use client";
import React, { useState } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = `🧑‍⚖️ You: ${input}`;
    const botResponse = "🤖 Lawverse AI: This is a dummy response for now.";

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInput("");
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl max-w-xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">
          💼 Lawverse™ AI
        </h2>
        <button
          onClick={() => setMessages([])}
          className="text-sm text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="h-64 overflow-y-auto mb-4 space-y-2 border p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-black dark:text-white">
        {messages.length === 0 ? (
          <p className="text-zinc-400 italic">Ask anything legal, anytime.</p>
        ) : (
          messages.map((msg, idx) => <div key={idx}>{msg}</div>)
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-3 py-2 rounded-xl border dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
