"use client";

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  sender: "user" | "admin";
  message: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get WebSocket URL
  const getSocketURL = () => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";
    // Extract base URL (remove /taxque/api)
    const baseURL = apiURL.replace("/taxque/api", "");
    return baseURL;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Connect to WebSocket when chat opens
  useEffect(() => {
    if (isOpen && userName && userEmail && !socketRef.current) {
      const socket = io(getSocketURL(), {
        transports: ["websocket", "polling"],
      });

      socket.on("connect", async () => {
        console.log("Connected to server");
        setIsConnected(true);
        
        // Check if user already has a chat and join their room
        try {
          const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";
          const response = await fetch(`${apiURL}/chat/get-by-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
          });
          const result = await response.json();
          if (result.success && result.chat) {
            const existingChatId = result.chat._id.toString();
            setChatId(existingChatId);
            socket.emit("join-user-chat", existingChatId);
            console.log("Joined existing chat room:", existingChatId);
            
            // Load existing messages
            setMessages(result.chat.messages.map((msg: any) => ({
              id: msg._id || Date.now().toString(),
              sender: msg.sender,
              message: msg.message,
              timestamp: new Date(msg.timestamp),
            })));
          }
        } catch (error) {
          console.error("Error checking existing chat:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
        setIsConnected(false);
      });

      socket.on("message-sent", async (data: { success: boolean; chatId: string }) => {
        if (data.success && data.chatId) {
          setChatId(data.chatId);
          socket.emit("join-user-chat", data.chatId);
          
          // Fetch existing chat messages if chat already exists
          try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";
            const response = await fetch(`${apiURL}/chat/get-by-email`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: userEmail }),
            });
            const result = await response.json();
            if (result.success && result.chat) {
              setMessages(result.chat.messages.map((msg: any) => ({
                id: msg._id || Date.now().toString(),
                sender: msg.sender,
                message: msg.message,
                timestamp: new Date(msg.timestamp),
              })));
            }
          } catch (error) {
            console.error("Error fetching chat history:", error);
          }
        }
      });

      socket.on("admin-reply", (data: { chatId: string; message: string; timestamp: Date }) => {
        console.log("Received admin reply:", data);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "admin",
            message: data.message,
            timestamp: new Date(data.timestamp),
          },
        ]);
      });

      socket.on("message-error", (data: { error: string }) => {
        console.error("Message error:", data.error);
      });

      socketRef.current = socket;

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [isOpen, userName, userEmail]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartChat = () => {
    if (userName.trim() && userEmail.trim()) {
      setShowForm(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !socketRef.current || !isConnected) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      message: message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Send via WebSocket
    socketRef.current.emit("user-message", {
      userId: chatId || `user-${Date.now()}`,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      message: message.trim(),
    });

    setMessage("");
  };

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Chat Button - Fixed position (above scroll button) */}
      {!isOpen && (
        <button
          id="taxque-chat-button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 w-16 h-16 bg-orange-500 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors z-40"
          aria-label="Open chat"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Speech bubble shape */}
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H6L10 22V18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
              fill="white"
            />
            {/* Three white dots inside bubble with subtle shadow for visibility */}
            <circle cx="8" cy="10" r="1.8" fill="white" />
            <circle cx="12" cy="10" r="1.8" fill="white" />
            <circle cx="16" cy="10" r="1.8" fill="white" />
          </svg>
        </button>
      )}

      {/* Scroll to Top Button - Below chat button */}
      {showScrollTop && !isOpen && (
        <button
          id="taxque-scroll-top-button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-orange-400 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 19V5M5 12L12 5L19 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header - Orange */}
          <div className="bg-orange-500 rounded-t-2xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👋</span>
              <h3 className="text-white font-bold text-sm">Our team is here for you</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-orange-600 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 bg-white p-4 flex flex-col overflow-hidden">
            {/* Avatar and Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">TA</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">TaxQue Team</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-400"}`}></div>
                <span className={`text-xs font-medium ${isConnected ? "text-green-500" : "text-gray-400"}`}>
                  {isConnected ? "ONLINE" : "OFFLINE"}
                </span>
              </div>
            </div>

            {/* User Info Form */}
            {showForm && (
              <div className="flex-1 flex flex-col justify-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  onClick={handleStartChat}
                  disabled={!userName.trim() || !userEmail.trim()}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Start Chat
                </button>
              </div>
            )}

            {/* Chat Messages Area */}
            {!showForm && (
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm">Start a conversation</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          msg.sender === "user"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-orange-100" : "text-gray-500"}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Field */}
            {!showForm && (
              <div className="relative mt-auto">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-orange-500 text-white placeholder-white/80 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && message.trim()) {
                      handleSendMessage();
                    }
                  }}
                  disabled={!isConnected}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || !isConnected}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-orange-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              </div>
            )}
          </div>

        </div>
      )}
    </>
  );
}

