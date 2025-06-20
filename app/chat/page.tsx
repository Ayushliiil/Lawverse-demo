/* app/chat/page.tsx */

'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, ImageIcon, Upload, Send, FileText, RefreshCcw, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEFAULT_SUGGESTIONS = [
  'Criminal Law',
  'Startup Law',
  'Human Rights',
  'Legal Contracts',
  'Property Law'
];

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lawverse-chat');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('lawverse-chat', JSON.stringify(messages));
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setTimeout(() => {
      const aiMsg = {
        sender: 'ai',
        text: `This is a dummy response for: "${userMsg.text}".`
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#0a0e2a] to-[#0c102f] text-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-900 shadow-sm">
        <h1 className="text-xl font-semibold tracking-wide text-white">Lawverse™</h1>
        <button className="bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-lg text-sm">Go to Home</button>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-lg text-blue-100 space-y-4 animate-fade-in">
            <p className="text-2xl font-semibold text-white">How can I assist you today?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {DEFAULT_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-full text-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex flex-col max-w-xl space-y-1 rounded-xl px-4 py-3 text-sm',
              msg.sender === 'user' ? 'self-end bg-blue-600 text-white' : 'self-start bg-[#141a38] text-blue-100'
            )}
          >
            <p>{msg.text}</p>
            {msg.sender === 'ai' && (
              <div className="flex gap-2 text-xs mt-1 text-gray-400">
                <ThumbsUp className="w-4 h-4 hover:text-white cursor-pointer" />
                <ThumbsDown className="w-4 h-4 hover:text-white cursor-pointer" />
                <Copy className="w-4 h-4 hover:text-white cursor-pointer" />
                <RefreshCcw className="w-4 h-4 hover:text-white cursor-pointer" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="self-start bg-[#141a38] px-4 py-3 rounded-xl max-w-xl animate-pulse text-sm">
            Lawverse™ is typing...
          </div>
        )}
      </div>

      <div className="border-t border-blue-900 bg-[#0c102f] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <Mic className="w-5 h-5 cursor-pointer hover:text-blue-400" title="Voice" />
            <ImageIcon className="w-5 h-5 cursor-pointer hover:text-blue-400" title="Image Upload" />
            <Upload className="w-5 h-5 cursor-pointer hover:text-blue-400" title="PDF / File Upload" />
            <FileText className="w-5 h-5 cursor-pointer hover:text-blue-400" title="Text to Speech" />
          </div>

          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-[#10152d] text-white border border-blue-800 px-4 py-2 rounded-full placeholder-gray-400 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <Send
            onClick={handleSend}
            className="w-5 h-5 text-blue-400 hover:text-white cursor-pointer ml-1"
            title="Send"
          />
        </div>
      </div>
    </div>
  );
                     }
                                       
