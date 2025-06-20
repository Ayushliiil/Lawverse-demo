"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaHome, FaInfoCircle, FaComments, FaTrash } from 'react-icons/fa';
import { HiOutlineArrowPath } from 'react-icons/hi2';
import { FiCopy, FiThumbsUp, FiThumbsDown, FiMic, FiUpload } from 'react-icons/fi';
import { AiOutlineSend, AiOutlineFilePdf } from 'react-icons/ai';
import Link from 'next/link';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      const aiReply = { sender: "ai", text: `This is a response to: ${input}` };
      setMessages(prev => [...prev, aiReply]);
      setIsLoading(false);
    }, 1200);
  };

  const starterOptions = ["Criminal Law", "Startup Law", "Property Rights", "Fundraising Law"];

  return (
    <div className="flex h-screen bg-[#0b1529] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1e3a] p-4 hidden sm:block">
        <h1 className="text-xl font-bold mb-4">☰ Menu</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 text-[#70a1ff] hover:underline"><FaHome /> Home</Link>
          <Link href="/about" className="flex items-center gap-2 text-[#70a1ff] hover:underline"><FaInfoCircle /> About</Link>
          <Link href="/chat" className="flex items-center gap-2 text-[#70a1ff] hover:underline"><FaComments /> Chat</Link>
        </nav>
        <div className="mt-6">
          <h2 className="text-sm font-semibold">Chat History</h2>
          <ul className="text-sm mt-2 text-gray-400">
            <li>• Criminal Law Chat</li>
            <li>• Startup Query</li>
            <li>• Property Rights</li>
          </ul>
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-[#0f1e3a] p-4 shadow">
          <h1 className="text-2xl font-bold">Lawverse™</h1>
          <FaStar className="text-[#70a1ff] text-2xl animate-pulse" title="Gemena AI Mode" />
        </header>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center mt-12">
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-[#1e3c72] to-[#2a5298] p-2 rounded-lg mb-4 animate-fade">How can I assist you?</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {starterOptions.map((opt, i) => (
                  <button key={i} onClick={() => setInput(opt)} className="bg-[#1e3c72] bg-opacity-40 border border-[#70a1ff] text-[#70a1ff] px-4 py-2 rounded-full text-sm hover:bg-opacity-60 transition">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`max-w-xl my-2 p-3 rounded-xl ${msg.sender === 'user' ? 'ml-auto bg-[#1e3c72]' : 'mr-auto bg-[#2a5298]'}`}>
              <p>{msg.text}</p>
              <div className="flex gap-2 mt-2 text-sm text-gray-300">
                <button title="Copy"><FiCopy /></button>
                <button title="Like"><FiThumbsUp /></button>
                <button title="Dislike"><FiThumbsDown /></button>
                <button title="Speak"><FiMic /></button>
                <button title="Regenerate"><HiOutlineArrowPath /></button>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="p-4 border-t border-[#2a2a2a] bg-[#0f1e3a]">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <button title="Upload"><FiUpload className="text-xl text-[#70a1ff]" /></button>
              <button title="Upload PDF"><AiOutlineFilePdf className="text-xl text-[#70a1ff]" /></button>
              <button title="Voice Input"><FiMic className="text-xl text-[#70a1ff]" /></button>
            </div>
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-xl bg-[#1e1e2f] text-white placeholder-gray-400 focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="text-2xl text-[#70a1ff]"><AiOutlineSend /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

              
