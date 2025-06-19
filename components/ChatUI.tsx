'use client';

import { useState, useRef } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: '👋 Hi! I’m Lawverse — your AI-powered legal assistant.' }
  ]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { type: 'user', text: input.trim() };
    const botMessage = { type: 'bot', text: '🤖 This is a demo reply from Lawverse AI.' };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl max-w-xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">💼 Lawverse™ AI</h2>
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="text-sm px-3 py-1 border rounded-full"
        >
          Toggle Theme
        </button>
      </div>
      <div className="h-64 overflow-y-auto bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg mb-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={\`
              mb-2 p-2 rounded-lg \${msg.type === 'user'
                ? 'bg-blue-500 text-white self-end ml-auto max-w-xs'
                : 'bg-gray-200 dark:bg-zinc-700 text-black dark:text-white self-start mr-auto max-w-xs'}
            \`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-gray-200 dark:bg-zinc-700 p-2 rounded-full"
          onClick={() => fileInputRef.current?.click()}
        >
          📎
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,audio/*"
          hidden
          onChange={() => alert('📤 Upload received (demo only)')}
        />
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
          placeholder="Type your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
