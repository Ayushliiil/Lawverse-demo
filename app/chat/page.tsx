'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Image, Upload, RefreshCcw, Copy, ThumbsUp, ThumbsDown, Send } from 'lucide-react';

// Define type
type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const presetPrompts = ['Criminal Law', 'Startup Law', 'Cyber Law', 'Property Disputes', 'Legal Rights'];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('lawverse_chat');
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('lawverse_chat', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMsg: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        sender: 'ai',
        text: `Here's some legal information on "${userMsg.text}". (Dummy response for now)`
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-[#f4f6fc] min-h-screen flex flex-col px-2 md:px-10 pt-6 overflow-x-hidden">
      <div className="max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-[#031926] mb-3">How can I assist you?</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {presetPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="bg-[#031926] text-white px-4 py-2 rounded-full text-sm shadow hover:bg-opacity-90"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 mb-24">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 shadow-sm text-sm whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-[#031926] text-white rounded-tr-none'
                    : 'bg-[#e0e9f1] text-[#031926] rounded-tl-none border'
                }`}
              >
                {msg.text}
                {msg.sender === 'ai' && (
                  <div className="flex gap-3 mt-2 text-gray-400 text-xs">
                    <button title="Copy"><Copy size={14} /></button>
                    <button title="Like"><ThumbsUp size={14} /></button>
                    <button title="Dislike"><ThumbsDown size={14} /></button>
                    <button title="Regenerate"><RefreshCcw size={14} /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="fixed bottom-4 left-0 w-full px-4">
          <div className="max-w-3xl mx-auto flex items-center bg-white shadow-md rounded-full border px-4 py-2 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 outline-none text-[#031926] placeholder:text-gray-500 text-sm"
              placeholder="Type your message..."
            />
            <div className="flex gap-2 text-[#031926]">
              <button title="Voice"><Mic size={20} /></button>
              <button title="Image"><Image size={20} /></button>
              <button title="Upload File"><Upload size={20} /></button>
              <button title="Send" onClick={handleSend}><Send size={20} className="text-[#031926]" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                  }
