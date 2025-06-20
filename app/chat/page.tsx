/* Updated Chat UI with Lawverse™ brand colors */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaMicrophone, FaUpload, FaFilePdf, FaBars } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { BsStars, BsArrowRepeat } from "react-icons/bs";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `This is a dummy response to: "${userMsg.text}"`,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const QuickOptions = [
    "Criminal Law",
    "Startup Law",
    "Constitution",
    "Civil Rights",
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#08182f] p-4 flex justify-between items-center shadow-lg z-50">
        <div className="text-xl font-bold tracking-wider text-[#00c2ff]">
          Lawverse™
        </div>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-[#00c2ff]">Home</Link>
          <Link href="/chat" className="hover:text-[#00c2ff]">Try Chat</Link>
          <Link href="/about" className="hover:text-[#00c2ff]">About</Link>
          <Link href="/invest" className="hover:text-[#00c2ff]">Invest</Link>
        </nav>
      </header>

      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00c2ff] to-[#004f87] text-transparent bg-clip-text animate-pulse">
            How can I assist you?
          </h1>
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {QuickOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setInput(option)}
                className="border border-[#00c2ff] text-white bg-transparent px-4 py-2 rounded-xl text-sm hover:bg-[#00c2ff33]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-3xl text-sm md:text-base w-fit px-4 py-3 rounded-2xl ${
              msg.sender === "user"
                ? "bg-[#00c2ff] text-black self-end ml-auto"
                : "bg-[#001f3f] text-white self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Chat Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-[#08182f] px-4 py-3 border-t border-[#003c66] flex items-center justify-between gap-2 z-50">
        {/* Left Icons */}
        <div className="flex gap-3">
          <button className="text-white hover:text-[#00c2ff]">
            <FaUpload size={18} />
          </button>
          <button className="text-white hover:text-[#00c2ff]">
            <FaMicrophone size={18} />
          </button>
          <button className="text-white hover:text-[#00c2ff]">
            <FaFilePdf size={18} />
          </button>
        </div>

        {/* Input Field */}
        <textarea
          rows={1}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none rounded-lg px-4 py-2 bg-[#0a0a0a] text-white border border-[#003c66] focus:outline-none"
        ></textarea>

        {/* Right Icons */}
        <div className="flex gap-2 ml-2">
          <button
            onClick={sendMessage}
            className="bg-[#00c2ff] hover:bg-[#009ee3] text-black p-2 rounded-full"
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 bg-[#000d1a] p-2 border-t border-[#003c66]">
        © {new Date().getFullYear()} Lawverse™. All rights reserved. | Terms | Privacy
      </footer>
    </div>
  );
}

        
