'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FaPaperPlane,
  FaMicrophone,
  FaUpload,
  FaFilePdf,
  FaBars,
} from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    const aiMessage = {
      sender: 'ai',
      text: 'Thanks for your message! Lawverse™ will reply soon...',
    };
    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const initialOptions = [
    'Criminal Law',
    'Startup Law',
    'Property Law',
    'Fundraising Legal Help',
  ];

  const insertOption = (text: string) => {
    setInput(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f24] to-[#101628] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1f30] bg-[#0e132b] shadow-md">
        <div className="flex items-center space-x-2 text-white">
          <FaBars size={20} />
          <span className="text-sm font-semibold">Menu</span>
        </div>
        <div className="text-white font-semibold text-lg tracking-wide">
          Lawverse™ Chat
        </div>
        <BsStars size={20} className="text-blue-300" />
      </div>

      {/* Prompt + Options */}
      {messages.length === 0 && (
        <div className="text-center py-10 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#27c4ff] to-[#4a8df9] text-transparent bg-clip-text animate-pulse mb-6">
            How can I assist you?
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center px-4">
            {initialOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => insertOption(opt)}
                className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                msg.sender === 'user'
                  ? 'bg-[#2a5ab9] text-white'
                  : 'bg-[#1e1f2e] text-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-[#0f1224] border-t border-[#1a1f30] px-4 py-3 flex items-center space-x-3">
        {/* Left icons */}
        <div className="flex space-x-3 items-center">
          <label className="cursor-pointer">
            <FaUpload className="text-blue-400 hover:text-blue-500" size={18} />
            <input type="file" hidden />
          </label>
          <button>
            <FaMicrophone className="text-blue-400 hover:text-blue-500" size={18} />
          </button>
          <button>
            <FaFilePdf className="text-blue-400 hover:text-blue-500" size={18} />
          </button>
        </div>

        {/* Input field */}
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-[#1c1e2f] text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300"
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
