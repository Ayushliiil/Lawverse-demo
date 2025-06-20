// page.tsx — refined Lawverse™ Chat UI
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaPaperPlane, FaUpload, FaFilePdf } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { FiCopy, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { BsStars, BsArrowRepeat } from "react-icons/bs";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiMsg = {
        sender: "ai",
        text: `This is a placeholder response for: "${input}"`,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1200);
  };

  const handleOptionClick = (text) => {
    setInput(text);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a0f1d] to-[#0e1628] text-white">
      <header className="flex justify-between items-center p-4 border-b border-white/10">
        <button className="text-white text-2xl">
          <IoMdMenu />
        </button>
        <h1 className="text-xl font-bold flex items-center gap-2">
          Lawverse™
          <BsStars className="text-blue-400 animate-pulse" />
        </h1>
      </header>

      <div className="flex flex-col px-4 py-6 gap-2">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          How can I assist you?
        </h2>
        <div className="flex gap-2 flex-wrap mt-2">
          {["Criminal Law", "Startup Law", "Civil Rights", "Legal Drafting"].map((law, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(law)}
              className="px-3 py-1 bg-white/10 border border-white/20 text-sm rounded-full hover:bg-white/20 transition"
            >
              {law}
            </button>
          ))}
        </div>
      </div>

      <section className="flex-1 overflow-y-auto px-4 pb-24">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md text-sm relative ${
                msg.sender === "user"
                  ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              {msg.text}
              {msg.sender === "ai" && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 text-white/60 text-xs">
                  <FiCopy className="cursor-pointer hover:text-white" />
                  <FiThumbsUp className="cursor-pointer hover:text-white" />
                  <FiThumbsDown className="cursor-pointer hover:text-white" />
                  <BsArrowRepeat className="cursor-pointer hover:text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </section>

      <footer className="fixed bottom-0 left-0 w-full bg-[#0b111f] px-4 py-3 border-t border-white/10">
        <div className="flex gap-2 items-center">
          <div className="flex gap-2">
            <button className="text-white/70 hover:text-white">
              <FaUpload className="text-xl" />
            </button>
            <button className="text-white/70 hover:text-white">
              <FaFilePdf className="text-xl" />
            </button>
            <button className="text-white/70 hover:text-white">
              <FaMicrophone className="text-xl" />
            </button>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 px-4 py-2 text-sm rounded-full text-white placeholder-white/50 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="text-blue-400 hover:text-white text-xl px-2"
          >
            <FaPaperPlane />
          </button>
        </div>
      </footer>
    </main>
  );
};

export default Chat;
