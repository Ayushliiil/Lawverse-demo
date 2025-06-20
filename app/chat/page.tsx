"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaMicrophone, FaUpload, FaFilePdf, FaBars } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { BsStars, BsArrowRepeat } from 'react-icons/bs';
import { AiOutlineLike, AiOutlineDislike, AiOutlineCopy } from 'react-icons/ai';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setHasInteracted(true);

    setTimeout(() => {
      const aiMsg = { sender: "ai", text: "This is a sample response from Lawverse™." };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1000);
  };

  const handleIconClick = (action, msg) => {
    if (action === "copy") navigator.clipboard.writeText(msg.text);
    if (action === "regenerate") handleSend();
    // like/dislike can be tracked later
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1A2E] to-[#0C223E] text-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <button onClick={() => setShowMenu(!showMenu)} className="text-white">
          <FaBars size={20} />
        </button>
        <h1 className="text-xl font-semibold text-white flex items-center gap-2">
          <BsStars className="text-blue-400 animate-pulse" /> Lawverse™
        </h1>
        <div></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {showMenu && (
          <div className="w-64 bg-[#102C4E] text-white p-4 border-r border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 cursor-pointer">Home</li>
              <li className="hover:text-blue-400 cursor-pointer">About</li>
              <li className="hover:text-blue-400 cursor-pointer">Contact</li>
              <li className="hover:text-blue-400 cursor-pointer">Chat History</li>
            </ul>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {!hasInteracted && (
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200 mb-4">
                  Hello! How can I assist you?
                </h2>
                <div className="flex justify-center gap-4 flex-wrap">
                  {["Criminal Law", "Startup Law", "Civil Rights", "Property Law"].map((topic) => (
                    <button
                      key={topic}
                      className="px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg border border-white border-opacity-10"
                      onClick={() => setInput(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-2xl mx-auto px-4 py-3 rounded-xl relative text-sm shadow-lg transition-all duration-300 ${
                  msg.sender === "user"
                    ? "bg-blue-900 text-right ml-auto"
                    : "bg-[#1E3557] text-left"
                }`}
              >
                {msg.text}
                {msg.sender === "ai" && (
                  <div className="flex gap-3 mt-2 text-xs text-gray-400 absolute -bottom-6 left-2">
                    <button onClick={() => handleIconClick("copy", msg)}><AiOutlineCopy /></button>
                    <button><AiOutlineLike /></button>
                    <button><AiOutlineDislike /></button>
                    <button onClick={() => handleIconClick("regenerate", msg)}><BsArrowRepeat /></button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 p-4 bg-[#0C223E]">
            <div className="flex items-center gap-2">
              <button className="text-blue-300 hover:text-white"><FaMicrophone /></button>
              <button className="text-blue-300 hover:text-white"><FaUpload /></button>
              <button className="text-blue-300 hover:text-white"><FaFilePdf /></button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-white bg-opacity-5 text-white px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-700"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                      }
