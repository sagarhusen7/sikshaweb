import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { getBotReply } from "./utils/botResponses";

import { Bot, MessageSquare } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! Greeting from SikshaWeb. I'm your study assistant. How can I help you today?" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = (userText) => {
    const newMessages = [...messages, { type: "user", text: userText }];
    setMessages(newMessages);
    setIsTyping(true);

    // Mock AI response generation
    const reply = getBotReply(userText);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: reply },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userText) => {
    if (userText.toLowerCase().includes("course"))
      return "You can browse courses under the Courses tab.";
    if (userText.toLowerCase().includes("quiz"))
      return "Quizzes are available under the Quizzes section.";
    return "That's a great question! Let me get back to you on that.";
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        {isOpen ? <Bot size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 h-[420px] bg-white dark:bg-gray-800 shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm px-4 py-3 font-semibold">
            🤖 SikshaBot – Study Assistant
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-300 dark:scrollbar-thumb-indigo-700">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} type={msg.type} text={msg.text} />
            ))}
            {isTyping && <ChatMessage type="bot" text="Typing..." />}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input Field */}
          <ChatInput onSend={handleSend} />
        </div>
      )}
    </>
  );
}