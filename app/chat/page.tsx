"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, `🧑‍⚖️ You: ${input}`, `🤖 Lawverse: This is a demo reply.`]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center">💼 Lawverse™ AI</h2>
      <div className="max-w-2xl mx-auto bg-zinc-900 rounded-2xl shadow-xl p-4 space-y-4 h-[70vh] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-md ${msg.includes("You:") ? "text-right text-blue-300" : "text-left text-green-300"}`}>
            {msg}
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto mt-4 flex gap-2">
        <input
          className="flex-1 p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700"
          placeholder="Type your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl font-semibold"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
