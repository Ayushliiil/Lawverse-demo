'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, UploadCloud, Mic, Image, FileText, RefreshCw, ThumbsUp, ThumbsDown, Copy, Home } from 'lucide-react';

const WELCOME_OPTIONS = ["Criminal Law", "Startup Law", "Property Law", "Cyber Law", "Divorce Law"];

const ChatPage = () => {
  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lawverse-chat');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('lawverse-chat', JSON.stringify(messages));
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setTimeout(() => {
      const aiReply = { sender: 'ai', text: `Here's some information about ${userMsg.text}.` };
      setMessages(prev => [...prev, aiReply]);
      setIsLoading(false);
    }, 1000);
  };

  const handleWelcomeClick = (text) => {
    setInput(text);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9]">
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-[#002b36] text-white">
        <h1 className="text-xl font-bold">Lawverse™</h1>
        <button className="text-sm bg-white text-[#002b36] px-4 py-1 rounded hover:bg-gray-200 flex items-center">
          <Home className="w-4 h-4 mr-1" /> Home
        </button>
      </header>

      <main className="flex-1 flex flex-col px-4 py-2 max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="text-center mt-10">
            <h2 className="text-xl mb-4 font-semibold text-[#002b36]">How can I assist you today?</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {WELCOME_OPTIONS.map(option => (
                <button
                  key={option}
                  className="bg-[#002b36] text-white px-4 py-2 rounded-full text-sm hover:opacity-90"
                  onClick={() => handleWelcomeClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={chatRef} className="flex-1 overflow-y-auto mt-4 space-y-4 p-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow ${
                msg.sender === 'user'
                  ? 'self-end bg-[#dbeafe] text-right'
                  : 'self-start bg-white border text-left'
              } animate-fade-in`}
            >
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
              {msg.sender === 'ai' && (
                <div className="flex gap-2 mt-2 text-gray-400 text-xs">
                  <button onClick={() => handleCopy(msg.text)}><Copy size={14} /></button>
                  <button><ThumbsUp size={14} /></button>
                  <button><ThumbsDown size={14} /></button>
                  <button><RefreshCw size={14} /></button>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="self-start bg-white border max-w-[80%] px-4 py-3 rounded-2xl shadow animate-pulse">
              <p className="text-sm text-gray-400">Typing...</p>
            </div>
          )}
        </div>

        <div className="flex items-center mt-4 space-x-2">
          <button className="p-2 rounded-full bg-[#002b36] text-white hover:opacity-90"><Mic size={20} /></button>
          <button className="p-2 rounded-full bg-[#002b36] text-white hover:opacity-90"><Image size={20} /></button>
          <button className="p-2 rounded-full bg-[#002b36] text-white hover:opacity-90"><UploadCloud size={20} /></button>
          <input
            className="flex-1 border rounded-full px-4 py-2 outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-[#002b36] text-white px-4 py-2 rounded-full hover:bg-[#01424f]"
          >
            <Send size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
