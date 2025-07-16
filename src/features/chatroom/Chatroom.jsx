import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import MessageBubble from "../../components/MessageBubble";
import TypingIndicator from "../../components/TypingIndicator";
import ChatSkeleton from "../../components/ChatSkeleton";
import { dummyMessages } from "../../utils/fakeMessages";

import { FaPaperPlane, FaImage, FaTimes, FaArrowLeft } from 'react-icons/fa';

const MESSAGES_PER_PAGE = 20;

const Chatroom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const STORAGE_KEY = id ? `chatroom-${id}` : null;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [typing, setTyping] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!STORAGE_KEY) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    const initialMessages = saved && saved !== "[]"
      ? JSON.parse(saved)
      : dummyMessages.slice(0, page * MESSAGES_PER_PAGE).reverse();

    setMessages(initialMessages);
    setTimeout(() => setLoading(false), 800);
  }, [STORAGE_KEY, page]);

  useEffect(() => {
    if (!STORAGE_KEY || messages.length === 0) return;
    try {
      const recent = messages.slice(-50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
    } catch {
      toast.error("⚠️ Could not save chat history.");
    }
  }, [messages, STORAGE_KEY]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || container.scrollTop !== 0) return;

    if (page * MESSAGES_PER_PAGE >= dummyMessages.length) return;

    const nextPage = page + 1;
    const more = dummyMessages.slice(0, nextPage * MESSAGES_PER_PAGE).reverse();

    setMessages((prev) => {
      const unique = [...more, ...prev.filter((m) => !more.some((mm) => mm.id === m.id))];
      return unique;
    });
    setPage(nextPage);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large! Max 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const sendMessage = () => {
    if (!input.trim() && !image) return;

    const userMsg = {
      id: uuidv4(),
      text: input.trim(),
      image,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setImage(null);
    setTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: uuidv4(),
        text: `Gemini's reply to: "${userMsg.text || "image"}" 🤖`,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-850 transition-all duration-500">
      
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          title="Go Back"
        >
          <FaArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
          Chatroom {id || "General"}
        </h2>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-thin scrollbar-thumb-blue-400 dark:scrollbar-thumb-blue-600"
      >
        {loading ? (
          <ChatSkeleton />
        ) : (
          <>
            {page * MESSAGES_PER_PAGE < dummyMessages.length && (
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                Scrolling up to load more messages...
              </div>
            )}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={scrollRef} className="pb-2" />
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex gap-3 items-end shadow-lg">
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer rounded-full"
        >
          <FaImage className="h-7 w-7" />
        </label>

        {image && (
          <div className="relative">
            <img
              src={image}
              alt="Preview"
              className="h-16 w-16 object-cover rounded-lg border-2 border-blue-500 shadow-md"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-gray-800 hover:bg-red-600"
              title="Remove image"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 p-3 border rounded-2xl resize-none min-h-[48px] max-h-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={!input.trim() && !image}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
        >
          <FaPaperPlane className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Chatroom;
