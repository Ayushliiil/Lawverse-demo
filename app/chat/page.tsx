"use client";

import { useState, useEffect } from "react";
import { Paperclip, Mic, Plus, Menu } from "lucide-react";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiReply: Message = { sender: "ai", text: "This is a demo response from Lawverse AI." };
      setMessages((prev) => [...prev, aiReply]);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages, isLoading]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <header className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
        <button className="text-zinc-400 hover:text-white">
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-semibold">Lawverse™ AI</h1>
        <button className="text-sm px-3 py-1 rounded-md border border-zinc-700 hover:bg-zinc-800 transition">
          New Chat
        </button>
      </header>

      <div id="chat-container" className="flex-1 overflow-y-auto p-4 space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] text-sm ${
              msg.sender === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-zinc-800 text-zinc-100 font-mono"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isLoading && (
          <div className="mr-auto bg-zinc-800 text-zinc-400 text-sm px-4 py-3 rounded-lg w-fit font-mono animate-pulse flex gap-1">
            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:.1s]" />
            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:.2s]" />
            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:.3s]" />
          </div>
        )}
      </div>

      <footer className="p-4 border-t border-zinc-800 flex items-center gap-3 max-w-2xl mx-auto w-full">
        <button className="text-zinc-400 hover:text-white"><Mic size={20} /></button>
        <button className="text-zinc-400 hover:text-white"><Paperclip size={20} /></button>
        <input
          className="flex-1 p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
          placeholder="Type your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-semibold"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
