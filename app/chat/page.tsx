'use client';

import { useState } from 'react';
import { Mic, Image as ImageIcon, FileText, ArrowRight, ThumbsUp, ThumbsDown, Copy, RefreshCw } from 'lucide-react';

// Define strict message type
const MESSAGE_TYPE = {
  USER: 'user',
  AI: 'ai',
} as const;

type Message = {
  sender: keyof typeof MESSAGE_TYPE;
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'AI', text: "I'm lawverse™ your legal assistant." },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (input.trim() === '') return;
    const userMsg: Message = { sender: 'USER', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiReply: Message = {
        sender: 'AI',
        text: `You said: \"${input}\". How can I help you further?`,
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] flex flex-col">
      <div className="p-4 border-b shadow bg-white flex justify-between items-center">
        <h1 className="text-lg font-semibold text-[#3b82f6]">Lawverse™ Chat</h1>
        <button className="text-sm text-gray-500 hover:underline">Home</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`w-full flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 shadow text-sm leading-relaxed relative ${
                msg.sender === 'USER' ? 'bg-[#e0f2fe] text-right' : 'bg-white text-left'
              }`}
            >
              {msg.text}
              {msg.sender === 'AI' && (
                <div className="flex gap-2 mt-2 text-gray-400 text-xs">
                  <button><ThumbsUp size={16} /></button>
                  <button><ThumbsDown size={16} /></button>
                  <button><Copy size={16} /></button>
                  <button><RefreshCw size={16} /></button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="w-full flex justify-start">
            <div className="max-w-[80%] bg-white px-4 py-3 rounded-xl shadow text-sm">
              Lawverse™ is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t shadow flex flex-col gap-3">
        <div className="flex gap-2 flex-wrap">
          {["Criminal Law", "Property Law", "Civil Rights", "Startup Law"].map((text) => (
            <button
              key={text}
              onClick={() => setMessages((prev) => [...prev, { sender: 'USER', text }])}
              className="px-3 py-1 rounded-full bg-gray-200 text-sm hover:bg-gray-300"
            >
              {text}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            placeholder="Ask me any legal question..."
          />
          <button
            onClick={handleSend}
            className="bg-[#3b82f6] text-white rounded-full p-2"
          >
            <ArrowRight />
          </button>
          <button className="p-2 text-gray-500">
            <Mic />
          </button>
          <button className="p-2 text-gray-500">
            <ImageIcon />
          </button>
          <button className="p-2 text-gray-500">
            <FileText />
          </button>
        </div>
      </div>
    </main>
  );
        }
