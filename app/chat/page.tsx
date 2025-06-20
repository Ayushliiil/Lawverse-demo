"use client";

import React, { useState, useRef, useEffect } from "react"; import { FaPaperPlane, FaMicrophone, FaUpload, FaFilePdf } from "react-icons/fa"; import { BsStars } from "react-icons/bs"; import { FiMenu } from "react-icons/fi";

const ChatPage = () => { const [messages, setMessages] = useState([]); const [input, setInput] = useState(""); const [showSidebar, setShowSidebar] = useState(false); const chatEndRef = useRef(null);

const handleSend = () => { if (!input.trim()) return; const userMsg = { sender: "user", text: input }; setMessages((prev) => [...prev, userMsg]); setInput("");

// Dummy AI response
setTimeout(() => {
  const aiMsg = { sender: "ai", text: "Thanks for your message!" };
  setMessages((prev) => [...prev, aiMsg]);
}, 600);

};

useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

return ( <div className="flex flex-col h-screen w-full bg-[#0f172a] text-white"> {/* Header */} <div className="flex justify-between items-center p-4 border-b border-gray-700"> <button onClick={() => setShowSidebar(!showSidebar)}> <FiMenu size={26} /> </button> <h1 className="text-xl font-semibold tracking-wide">Lawverse™ Chat</h1> <BsStars size={26} /> </div>

{/* Optional Sidebar */}
  {showSidebar && (
    <div className="absolute top-16 left-0 bg-[#1e293b] text-white w-64 h-full p-4 z-50">
      <div className="space-y-4">
        <button className="block w-full text-left">🏠 Home</button>
        <button className="block w-full text-left">ℹ️ About</button>
        <button className="block w-full text-left">📝 Chat History</button>
      </div>
    </div>
  )}

  {/* Chat Messages */}
  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
    {messages.length === 0 && (
      <div className="text-center text-lg text-gray-300">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-blue-300 inline-block text-transparent bg-clip-text">
          How can I assist you?
        </h2>
        <div className="flex justify-center gap-3 flex-wrap">
          {["Criminal Law", "Startup Law", "Fundraising", "Property Rights"].map((item) => (
            <button
              key={item}
              onClick={() => setInput(item)}
              className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-xl text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    )}

    {messages.map((msg, idx) => (
      <div key={idx} className={`w-full flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div
          className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] break-words shadow-md ${
            msg.sender === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          {msg.text}
        </div>
      </div>
    ))}
    <div ref={chatEndRef} />
  </div>

  {/* Input */}
  <div className="w-full border-t border-gray-700 bg-[#0f172a] p-4">
    <div className="flex items-center gap-3">
      {/* Left Icons */}
      <div className="flex gap-2">
        <button className="text-white hover:text-blue-400">
          <FaUpload size={24} />
        </button>
        <button className="text-white hover:text-blue-400">
          <FaFilePdf size={24} />
        </button>
        <button className="text-white hover:text-blue-400">
          <FaMicrophone size={24} />
        </button>
      </div>

      {/* Input Field */}
      <input
        type="text"
        className="flex-1 bg-white text-black px-4 py-2 rounded-xl placeholder-gray-500 w-[65%]"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* Send Button */}
      <button onClick={handleSend} className="text-white hover:text-blue-400">
        <FaPaperPlane size={24} />
      </button>
    </div>
  </div>
</div>

); };

export default ChatPage;

                                                                                                                                                                                   
