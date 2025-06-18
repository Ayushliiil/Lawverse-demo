'use client';
import { useState } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m Lawverse AI. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }, { from: 'bot', text: 'This is a demo reply.' }]);
    setInput('');
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl p-4 text-black shadow-xl">
      <div className="h-[400px] overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-lg ${msg.from === 'bot' ? 'bg-gray-100 text-left' : 'bg-blue-100 text-right'}`}>{msg.text}</div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <button><Paperclip className="w-5 h-5 text-gray-500" /></button>
        <button><Mic className="w-5 h-5 text-gray-500" /></button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your legal question..."
          className="flex-grow px-3 py-2 border rounded-full"
        />
        <button onClick={sendMessage}><Send className="w-5 h-5 text-blue-600" /></button>
      </div>
    </div>
  );
}
