/* Updated Chat UI with Lawverse™ brand colors */

import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaMicrophone, FaUpload, FaFilePdf, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { BsStars, BsArrowRepeat } from 'react-icons/bs';

const messagesMock = [
  { sender: 'ai', text: 'How can I assist you today?' }
];

export default function ChatPage() {
  const [messages, setMessages] = useState(messagesMock);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage = {
        sender: 'ai',
        text: `You said: "${userMessage.text}". Here’s a legal insight...`
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-[#0F172A] shadow-md">
        <button className="flex items-center gap-2 text-white hover:text-blue-400">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold text-blue-400">Lawverse™ Chat</h1>
        <button className="hover:text-red-400"><FiTrash2 /></button>
      </div>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl p-3 rounded-xl text-sm leading-relaxed shadow-md ${
              msg.sender === 'user'
                ? 'bg-[#1E293B] self-end ml-auto text-right'
                : 'bg-[#1E40AF] self-start text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="bg-[#1E40AF] p-3 rounded-xl text-sm max-w-xs animate-pulse">
            Lawverse™ is typing...
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Predefined Buttons */}
      {messages.length === 1 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-[#0F172A] text-white">
          {['Criminal Law', 'Startup Law', 'Property Law', 'Fundraising Law'].map(topic => (
            <button
              key={topic}
              onClick={() => setInput(topic)}
              className="bg-[#1E293B] hover:bg-blue-700 px-3 py-2 rounded-xl text-sm shadow"
            >
              {topic}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Area */}
      <div className="bg-[#0F172A] p-4 flex items-center gap-2">
        {/* Left Buttons */}
        <div className="flex gap-2 text-blue-400">
          <button><FaUpload /></button>
          <button><FaFilePdf /></button>
          <button><FaMicrophone /></button>
        </div>

        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 rounded-xl bg-[#1E293B] text-white px-4 py-2 outline-none border border-[#334155]"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="text-blue-500 hover:text-blue-300 text-xl"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
          }
