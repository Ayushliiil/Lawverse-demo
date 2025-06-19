"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi, I’m your Lawverse™ legal assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Fake AI reply for demo
    setTimeout(() => {
      const aiMsg = { sender: "ai", text: "Thanks for your message. We'll assist you shortly." };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <div className="bg-zinc-900 px-6 py-4 shadow-md text-xl font-semibold">
        Lawverse™ Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-3 rounded-xl text-sm md:text-base ${
              msg.sender === "user"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-zinc-800 text-zinc-100 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 bg-zinc-900 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your legal question..."
          className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Send
        </button>
      </div>
    </main>
  );
}
