'use client';

import { useState } from 'react';
import { Mic, Image as ImageIcon, FileText, ArrowRight } from 'lucide-react';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "I'm lawverse™ your legal assistant." },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (input.trim() === '') return;
    const userMsg: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiReply: Message = {
        sender: 'ai',
        text: `You said: "${input}". How can I help you further?`,
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#f9fafb] px-4 py-6 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">How can I assist you?</h1>
          <button className="text-sm text-blue-600 underline">Explore Lawverse</button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['Property Law', 'Criminal Law', 'Constitutional Rights', 'Business Law'].map((topic) => (
            <button
              key={topic}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
              onClick={() => {
                const autoMsg: Message = { sender: 'user', text: topic };
                setMessages((prev) => [...prev, autoMsg]);
              }}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-4 space-y-4 h-[60vh] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-100 self-end ml-auto'
                  : 'bg-gray-100 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="text-gray-400 text-sm">Lawverse™ is thinking...</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-2 border rounded-lg shadow-sm"
            placeholder="Type your legal question..."
          />
          <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-full">
            <ArrowRight />
          </button>
          <button className="p-2 text-gray-600">
            <Mic />
          </button>
          <button className="p-2 text-gray-600">
            <ImageIcon />
          </button>
          <button className="p-2 text-gray-600">
            <FileText />
          </button>
        </div>
      </div>
    </main>
  );
            }
