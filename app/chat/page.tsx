'use client';

import { useState, useEffect, useRef } from 'react';
import { FaRegPaperPlane, FaMicrophone, FaFilePdf, FaImage, FaRegCopy, FaThumbsUp, FaThumbsDown, FaPlus, FaBars } from 'react-icons/fa';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const initialSuggestions = [
    'Criminal Law',
    'Startup Law',
    'Property Dispute',
    'Legal Drafting',
    'Consumer Rights'
  ];

  const lawverseBlue = '#1B4FFF';
  const lawverseDark = '#0B0F1A';
  const lawverseBg = '#F4F8FF';
  const lawverseText = '#1A1A1A';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage = {
        sender: 'ai',
        text: `You asked about: "${userMessage.text}". Here's a brief legal insight on that... (Dummy reply)`
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FF] text-[${lawverseText}]">

      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-2 text-lg font-bold text-[${lawverseBlue}]">
          <FaBars className="cursor-pointer" />
          Lawverse™ Chat
        </div>
        <button className="bg-[${lawverseBlue}] text-white px-3 py-1 rounded-full text-sm hover:opacity-90">
          New Chat <FaPlus className="inline ml-1" />
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-600">
            <h2 className="text-2xl mb-4">How can I assist you?</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {initialSuggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setInput(item)}
                  className="bg-white text-[${lawverseBlue}] border border-[${lawverseBlue}] px-4 py-2 rounded-full hover:bg-[${lawverseBlue}] hover:text-white transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-xl text-sm relative ${
                msg.sender === 'user'
                  ? 'bg-[${lawverseBlue}] text-white rounded-br-none'
                  : 'bg-white text-[${lawverseText}] rounded-bl-none shadow'
              }`}
            >
              {msg.text}
              {msg.sender === 'ai' && (
                <div className="mt-1 flex gap-2 text-xs text-gray-400">
                  <FaThumbsUp className="cursor-pointer hover:text-[${lawverseBlue}]" />
                  <FaThumbsDown className="cursor-pointer hover:text-red-500" />
                  <FaRegCopy className="cursor-pointer hover:text-green-500" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-500 animate-pulse">
              Typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="flex items-center px-4 py-3 border-t bg-white gap-2">
        <div className="flex gap-2">
          <button className="text-[${lawverseBlue}] text-xl">
            <FaMicrophone />
          </button>
          <button className="text-[${lawverseBlue}] text-xl">
            <FaImage />
          </button>
          <button className="text-[${lawverseBlue}] text-xl">
            <FaFilePdf />
          </button>
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-full outline-none bg-[#F4F8FF] text-[${lawverseText}]"
        />
        <button
          onClick={sendMessage}
          className="bg-[${lawverseBlue}] text-white p-2 rounded-full text-lg hover:opacity-90"
        >
          <FaRegPaperPlane />
        </button>
      </div>
    </div>
  );
}
