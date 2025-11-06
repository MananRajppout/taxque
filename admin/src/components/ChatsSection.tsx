'use client';

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";

interface Message {
  _id?: string;
  sender: "user" | "admin";
  message: string;
  timestamp: Date | string;
  readAt?: Date | string | null;
}

interface ChatUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  lastMessage: string;
  date: string;
  status: string;
  escalated?: boolean;
  unreadCount?: number;
}

interface ChatData {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  messages: Message[];
  status: string;
  lastMessageAt: Date | string;
}

const ChatsSection = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatUser[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatData | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedChatRef = useRef<string | null>(null);
  const currentChatRef = useRef<ChatData | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTypingEmitRef = useRef<number>(0);

  // Get API URL
  const getAPIURL = () => {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";
  };

  // Get Socket URL
  const getSocketURL = () => {
    const apiURL = getAPIURL();
    return apiURL.replace("/taxque/api", "");
  };

  // Fetch all chats
  const fetchChats = async () => {
    try {
      const response = await axios.get(`${getAPIURL()}/chats`);
      if (response.data.success) {
        setChats(response.data.chats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // Fetch chat by ID
  const fetchChatById = async (chatId: string) => {
    try {
      const response = await axios.get(`${getAPIURL()}/chat/${chatId}`);
      if (response.data.success) {
        setCurrentChat(response.data.chat);
        
        // Mark user messages as read when chat is opened
        const userMessageIds = response.data.chat.messages
          .filter((msg: Message) => msg.sender === "user" && !msg.readAt)
          .map((msg: Message) => msg._id);
        
        if (userMessageIds.length > 0 && socketRef.current) {
          setTimeout(() => {
            socketRef.current?.emit("message-read", {
              chatId,
              messageIds: userMessageIds,
              reader: "admin",
            });
          }, 500);
        }
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = io(getSocketURL(), {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Admin connected to WebSocket");
      setIsConnected(true);
      socket.emit("join-admin");
    });

    socket.on("disconnect", () => {
      console.log("Admin disconnected from WebSocket");
      setIsConnected(false);
    });

    socket.on("new-message", (chatData: ChatUser) => {
      // Update chats list with new message
      setChats((prev) => {
        const existingIndex = prev.findIndex((c) => c.id === chatData.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = chatData;
          // Move to top
          return [updated[existingIndex], ...updated.filter((_, i) => i !== existingIndex)];
        }
        // Add new chat
        return [chatData, ...prev];
      });
    });

    socket.on("new-message-data", (data: { chatId: string; message: Message }) => {
      // If this is the selected chat, append the new message directly to currentChat
      // Use ref to get latest value (not closure value)
      if (selectedChatRef.current === data.chatId) {
        setCurrentChat((prev) => {
          // If currentChat exists and matches, append the message
          if (prev && prev._id === data.chatId) {
            const updatedMessages = [...prev.messages, data.message];
            
            // Mark user messages as read when they arrive (admin sees them immediately)
            const userMessageIds = updatedMessages
              .filter((msg) => msg.sender === "user" && !msg.readAt && msg._id)
              .map((msg) => msg._id!);
            
            if (userMessageIds.length > 0) {
              setTimeout(() => {
                socketRef.current?.emit("message-read", {
                  chatId: data.chatId,
                  messageIds: userMessageIds,
                  reader: "admin",
                });
              }, 100);
            }
            
            return {
              ...prev,
              messages: updatedMessages,
            };
          }
          // If currentChat doesn't exist yet, fetch the full chat
          // This handles the case where message arrives before chat is loaded
          if (!prev) {
            fetchChatById(data.chatId);
          }
          return prev;
        });
      }
    });

    socket.on("chat-updated", (chatData: ChatUser) => {
      setChats((prev) =>
        prev.map((chat) => (chat.id === chatData.id ? chatData : chat))
      );
      
      // Update current chat if it's the selected one (use ref for latest value)
      if (selectedChatRef.current === chatData.id) {
        fetchChatById(chatData.id);
      }
    });

    socket.on("reply-sent", (data: { success: boolean; chat?: ChatData }) => {
      // Update currentChat with the full chat data including the new message
      // Use ref to get latest value (not closure value)
      if (data.success && data.chat && selectedChatRef.current === data.chat._id) {
        setCurrentChat(data.chat);
      }
    });

    socket.on("chat-history", (chat: ChatData) => {
      // Use ref to get latest value (not closure value)
      if (selectedChatRef.current === chat._id) {
        setCurrentChat(chat);
      }
    });

    socket.on("chat-escalated", (data: { chatId: string; reason: string }) => {
      // Update chat list to show escalated status
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === data.chatId ? { ...chat, escalated: true } : chat
        )
      );
      
      // Show notification
      toast.warning(`Chat escalated: ${data.reason}`);
    });

    socket.on("user-typing", (data: { chatId: string; isTyping: boolean }) => {
      // Only show typing indicator if this is the selected chat
      if (selectedChatRef.current === data.chatId) {
        setIsUserTyping(data.isTyping);
      }
    });

    socket.on("messages-read", (data: { chatId: string; messageIds: string[] }) => {
      // Update read status for admin messages
      if (selectedChatRef.current === data.chatId && currentChatRef.current) {
        setCurrentChat((prev) => {
          if (!prev || prev._id !== data.chatId) return prev;
          return {
            ...prev,
            messages: prev.messages.map((msg) => {
              if (msg.sender === "admin" && msg._id && data.messageIds.includes(msg._id)) {
                return { ...msg, readAt: new Date() };
              }
              return msg;
            }),
          };
        });
      }
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch chats on mount
  useEffect(() => {
    fetchChats();
  }, []);

  // Update refs when state changes
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  // Fetch chat when selected
  useEffect(() => {
    if (selectedChat && socketRef.current) {
      fetchChatById(selectedChat);
      socketRef.current.emit("get-chat-history", selectedChat);
    }
  }, [selectedChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  const handleTyping = () => {
    if (!socketRef.current || !isConnected || !selectedChat) return;

    const now = Date.now();
    // Throttle typing events (emit max once per 2 seconds)
    if (now - lastTypingEmitRef.current < 2000) {
      return;
    }

    lastTypingEmitRef.current = now;
    socketRef.current.emit("typing-start", {
      chatId: selectedChat,
      sender: "admin",
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing indicator after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (socketRef.current && selectedChat) {
        socketRef.current.emit("typing-stop", {
          chatId: selectedChat,
          sender: "admin",
        });
      }
    }, 3000);
  };

  // Handle send reply
  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedChat || !socketRef.current) return;

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (socketRef.current && selectedChat) {
      socketRef.current.emit("typing-stop", {
        chatId: selectedChat,
        sender: "admin",
      });
    }

    socketRef.current.emit("admin-reply", {
      chatId: selectedChat,
      message: replyMessage.trim(),
    });

    setReplyMessage("");
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search ⌘K"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#5ab15b] text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity">
              JD
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Chat List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search Bar in Sidebar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#5ab15b] text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Chats Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 pt-4 pb-2">
              <h2 className="text-sm font-semibold text-[#5ab15b]">Chats</h2>
            </div>
            <div className="px-2 py-2">
              {chats.length === 0 ? (
                <div className="px-3 py-4 text-center text-gray-500 text-sm">No chats yet</div>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all mb-1 ${
                      selectedChat === chat.id
                        ? "bg-[#5ab15b] shadow-[0px_10px_30px_0px_#5ab15b66] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {chat.name.charAt(0)}
                        </div>
                        {chat.escalated && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 border-2 border-white rounded-full" title="Escalated"></span>
                        )}
                        {!chat.escalated && chat.status === "open" && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-semibold truncate ${selectedChat === chat.id ? "text-white" : "text-gray-900"}`}>
                            {chat.name}
                          </h3>
                          <span className={`text-xs flex-shrink-0 ml-2 ${selectedChat === chat.id ? "text-white/80" : "text-gray-500"}`}>
                            {chat.date}
                          </span>
                        </div>
                        <p className={`text-xs mb-1 ${selectedChat === chat.id ? "text-white/80" : "text-gray-500"}`}>
                          {chat.email}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className={`text-xs truncate ${selectedChat === chat.id ? "text-white/90" : "text-gray-600"}`}>
                            {chat.lastMessage}
                          </p>
                          {chat.escalated && (
                            <span className="text-xs px-2 py-0.5 bg-orange-500 text-white rounded-full flex-shrink-0" title="Escalated to human agent">
                              ⚠️
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Main Content - Chat Window */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {!selectedChat ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#5ab15b]/10 to-[#5ab15b]/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-[#5ab15b]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Select a chat to start conversation</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{currentChat?.userName || "User"}</h3>
                      {chats.find(c => c.id === selectedChat)?.escalated && (
                        <span className="text-xs px-2 py-1 bg-orange-500 text-white rounded-full" title="Escalated to human agent">
                          ⚠️ Escalated
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{currentChat?.userEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-400"}`}></div>
                    <span className="text-xs text-gray-500">{isConnected ? "Connected" : "Disconnected"}</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentChat?.messages && currentChat.messages.length > 0 ? (
                  <>
                    {currentChat.messages.map((msg, index) => (
                      <div
                        key={msg._id || index}
                        className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            msg.sender === "admin"
                              ? "bg-[#5ab15b] text-white"
                              : "bg-white border border-gray-200 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <div className={`flex items-center gap-1 mt-1 ${
                            msg.sender === "admin" ? "text-white/80" : "text-gray-500"
                          }`}>
                            <p className="text-xs">
                              {new Date(msg.timestamp).toLocaleString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            {msg.sender === "admin" && (
                              <span className="text-xs">
                                {msg.readAt ? (
                                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M15.854 1.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L8.5 7.793l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                    <path d="M.5 9a.5.5 0 0 1 .5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 1 0 1h-5A1.5 1.5 0 0 1 0 14.5v-5a.5.5 0 0 1 .5-.5zm5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5h-5z"/>
                                  </svg>
                                ) : (
                                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                  </svg>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isUserTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-[70%]">
                          <div className="flex items-center gap-1">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            </div>
                            <span className="text-xs text-gray-500 ml-2">{currentChat?.userName || "User"} is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm">No messages yet</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Input */}
              <div className="bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => {
                      setReplyMessage(e.target.value);
                      handleTyping();
                    }}
                    placeholder="Type your reply..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab15b]"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && replyMessage.trim()) {
                        handleSendReply();
                      }
                    }}
                    disabled={!isConnected}
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim() || !isConnected}
                    className="px-6 py-2 bg-[#5ab15b] text-white rounded-lg font-semibold hover:bg-[#4a9f4a] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsSection;

