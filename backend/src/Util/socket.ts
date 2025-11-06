import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
const Chat = require("../Module/Chat");
const Configuration = require("../Module/Configuration");
const { getConfig } = require("../Module/Configuration");
import { generateAIResponse } from "./geminiService";
import { searchAPI } from "./searchService";

let io: SocketServer;

export const initializeSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://f.taxque.in",
        "https://b.taxque.in",
        "https://server.taxque.in",
        "https://taxquee.rafikyconnect.net",
        "https://taxquee.rafikyconnect.net/",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Join admin room
    socket.on("join-admin", () => {
      socket.join("admin-room");
      console.log("Admin joined:", socket.id);
    });

    // User sends message
    socket.on("user-message", async (data: { userId: string; userName: string; userEmail: string; message: string }) => {
      try {
        const { userId, userName, userEmail, message } = data;

        // Get configuration
        const config = await getConfig();

        // Find or create chat
        let chat = await Chat.findOne({ userEmail });

        if (!chat) {
          chat = new Chat({
            userId: userId || `user-${Date.now()}`,
            userName,
            userEmail,
            messages: [{
              sender: "user",
              message,
              timestamp: new Date(),
            }],
            status: "open",
            lastMessageAt: new Date(),
          });
        } else {
          chat.messages.push({
            sender: "user",
            message,
            timestamp: new Date(),
          });
          chat.lastMessageAt = new Date();
          chat.status = "open";
        }

        // Check for escalation keywords
        const messageLower = message.toLowerCase();
        const shouldEscalate = config.escalationKeywords?.some((keyword: string) => 
          messageLower.includes(keyword.toLowerCase())
        ) || chat.escalated;

        const wasJustEscalated = shouldEscalate && !chat.escalated;
        
        // Get the user's message before potentially adding handover message
        const userMessage = chat.messages[chat.messages.length - 1];
        
        if (wasJustEscalated) {
          chat.escalated = true;
          chat.escalatedAt = new Date();
          
          // Send handover message to user
          const handoverMsg = config.handoverMessage || "Your chat has been transferred to a human agent. Please wait while we connect you with one of our team members.";
          chat.messages.push({
            sender: "admin",
            message: handoverMsg,
            timestamp: new Date(),
          });
        }

        await chat.save();

        // Use user's message for admin notification (not handover message)
        const lastMessage = userMessage;

        // Notify admin with summary for sidebar
        const chatData = {
          id: chat._id.toString(),
          userId: chat.userId,
          name: chat.userName,
          email: chat.userEmail,
          lastMessage: message,
          date: new Date(chat.lastMessageAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          status: chat.status,
          escalated: chat.escalated,
          unreadCount: 1,
        };

        io.to("admin-room").emit("new-message", chatData);

        // Also emit the actual new message for real-time update in chat window
        io.to("admin-room").emit("new-message-data", {
          chatId: chat._id.toString(),
          message: {
            _id: lastMessage._id?.toString() || Date.now().toString(),
            sender: lastMessage.sender,
            message: lastMessage.message,
            timestamp: lastMessage.timestamp,
          },
        });

        // If escalated or AI disabled, skip AI response
        if (shouldEscalate || !config.enableAI) {
          // If chat was just escalated, send handover message to user
          if (wasJustEscalated) {
            const handoverMessage = chat.messages[chat.messages.length - 1];
            socket.emit("admin-reply", {
              chatId: chat._id.toString(),
              message: handoverMessage.message,
              timestamp: new Date(handoverMessage.timestamp),
              messageId: handoverMessage._id?.toString(),
            });
            
            // Also notify admin panel
            io.to("admin-room").emit("new-message-data", {
              chatId: chat._id.toString(),
              message: {
                _id: handoverMessage._id?.toString() || Date.now().toString(),
                sender: handoverMessage.sender,
                message: handoverMessage.message,
                timestamp: handoverMessage.timestamp,
              },
            });
          }
          
          // Confirm to user
          socket.emit("message-sent", { success: true, chatId: chat._id.toString(), escalated: true });
          socket.join(`user-${chat._id}`);
          return;
        }

        // Generate AI response using Search API + Gemini
        try {
          // Step 1: Perform Search API query
          const searchResults = await searchAPI(message);

          // Step 2: Generate AI response with Gemini
          const aiResponse = await generateAIResponse(
            message,
            chat.messages.map((msg: any) => ({
              sender: msg.sender,
              message: msg.message,
              timestamp: msg.timestamp,
            })),
            searchResults,
            {
              apiKey: config.geminiApiKey || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY,
              systemPrompt: config.systemPrompt,
            }
          );

          // Step 3: Save AI response
          chat.messages.push({
            sender: "admin",
            message: aiResponse,
            timestamp: new Date(),
          });
          chat.lastMessageAt = new Date();
          await chat.save();

          // Step 4: Send AI response to user
          const aiMessage = chat.messages[chat.messages.length - 1];
          socket.emit("admin-reply", {
            chatId: chat._id.toString(),
            message: aiResponse,
            timestamp: new Date(aiMessage.timestamp),
            messageId: aiMessage._id?.toString(),
          });

          // Step 5: Update admin panel
          io.to("admin-room").emit("new-message-data", {
            chatId: chat._id.toString(),
            message: {
              _id: aiMessage._id?.toString() || Date.now().toString(),
              sender: aiMessage.sender,
              message: aiMessage.message,
              timestamp: aiMessage.timestamp,
            },
          });

          const updatedChatData = {
            id: chat._id.toString(),
            userId: chat.userId,
            name: chat.userName,
            email: chat.userEmail,
            lastMessage: aiResponse,
            date: new Date(chat.lastMessageAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            status: chat.status,
            escalated: chat.escalated,
          };

          io.to("admin-room").emit("chat-updated", updatedChatData);
        } catch (aiError: any) {
          console.error("AI Response Error:", aiError);
          // If AI fails, notify admin that human intervention is needed
          const wasAlreadyEscalated = chat.escalated;
          chat.escalated = true;
          chat.escalatedAt = new Date();
          
          // Send handover message if chat wasn't already escalated
          if (!wasAlreadyEscalated) {
            const handoverMsg = config.handoverMessage || "Your chat has been transferred to a human agent. Please wait while we connect you with one of our team members.";
            chat.messages.push({
              sender: "admin",
              message: handoverMsg,
              timestamp: new Date(),
            });
            
            const handoverMessage = chat.messages[chat.messages.length - 1];
            
            // Send handover message to user
            socket.emit("admin-reply", {
              chatId: chat._id.toString(),
              message: handoverMsg,
              timestamp: new Date(handoverMessage.timestamp),
              messageId: handoverMessage._id?.toString(),
            });
            
            // Notify admin panel
            io.to("admin-room").emit("new-message-data", {
              chatId: chat._id.toString(),
              message: {
                _id: handoverMessage._id?.toString() || Date.now().toString(),
                sender: handoverMessage.sender,
                message: handoverMessage.message,
                timestamp: handoverMessage.timestamp,
              },
            });
          }
          
          await chat.save();

          io.to("admin-room").emit("chat-escalated", {
            chatId: chat._id.toString(),
            reason: "AI response failed",
          });
        }

        // Confirm to user
        socket.emit("message-sent", { success: true, chatId: chat._id.toString() });

        // Join user to their room
        socket.join(`user-${chat._id}`);
      } catch (error: any) {
        console.error("Error handling user message:", error);
        socket.emit("message-error", { error: error.message });
      }
    });

    // Admin sends reply
    socket.on("admin-reply", async (data: { chatId: string; message: string }) => {
      try {
        const { chatId, message } = data;

        const chat = await Chat.findById(chatId);
        if (!chat) {
          socket.emit("reply-error", { error: "Chat not found" });
          return;
        }

        chat.messages.push({
          sender: "admin",
          message,
          timestamp: new Date(),
        });
        chat.lastMessageAt = new Date();
        chat.status = "open";
        await chat.save();

        // Get the last message (the one just added)
        const lastMessage = chat.messages[chat.messages.length - 1];
        
        // Send reply to user
        io.to(`user-${chatId}`).emit("admin-reply", {
          chatId,
          message,
          timestamp: new Date(),
          messageId: lastMessage._id?.toString(),
        });

        // Update admin panel - send summary for sidebar
        const updatedChat = {
          id: chat._id.toString(),
          userId: chat.userId,
          name: chat.userName,
          email: chat.userEmail,
          lastMessage: message,
          date: new Date(chat.lastMessageAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          status: chat.status,
        };

        io.to("admin-room").emit("chat-updated", updatedChat);
        
        // Send full chat with all messages to the admin who sent the reply
        socket.emit("reply-sent", { 
          success: true, 
          chat: {
            _id: chat._id.toString(),
            userId: chat.userId,
            userName: chat.userName,
            userEmail: chat.userEmail,
            messages: chat.messages,
            status: chat.status,
            lastMessageAt: chat.lastMessageAt,
          }
        });
      } catch (error: any) {
        console.error("Error handling admin reply:", error);
        socket.emit("reply-error", { error: error.message });
      }
    });

    // User joins their chat room
    socket.on("join-user-chat", (chatId: string) => {
      socket.join(`user-${chatId}`);
      console.log(`User joined chat room: user-${chatId}`);
    });

    // Admin requests chat history
    socket.on("get-chat-history", async (chatId: string) => {
      try {
        const chat = await Chat.findById(chatId);
        if (chat) {
          socket.emit("chat-history", chat);
        }
      } catch (error: any) {
        socket.emit("chat-history-error", { error: error.message });
      }
    });

    // Typing indicators
    socket.on("typing-start", (data: { chatId: string; sender: "user" | "admin" }) => {
      const { chatId, sender } = data;
      if (sender === "user") {
        // User is typing - notify admin
        io.to("admin-room").emit("user-typing", { chatId, isTyping: true });
      } else {
        // Admin is typing - notify user
        io.to(`user-${chatId}`).emit("admin-typing", { isTyping: true });
      }
    });

    socket.on("typing-stop", (data: { chatId: string; sender: "user" | "admin" }) => {
      const { chatId, sender } = data;
      if (sender === "user") {
        // User stopped typing - notify admin
        io.to("admin-room").emit("user-typing", { chatId, isTyping: false });
      } else {
        // Admin stopped typing - notify user
        io.to(`user-${chatId}`).emit("admin-typing", { isTyping: false });
      }
    });

    // Read receipts
    socket.on("message-read", async (data: { chatId: string; messageIds: string[]; reader: "user" | "admin" }) => {
      try {
        const { chatId, messageIds, reader } = data;
        const chat = await Chat.findById(chatId);
        
        if (!chat) {
          return;
        }

        // Update readAt for messages that haven't been read yet
        let updated = false;
        for (const msgId of messageIds) {
          const message = chat.messages.id(msgId);
          if (message) {
            // Only mark as read if the reader is the opposite party
            // (user reads admin messages, admin reads user messages)
            const shouldMarkRead = 
              (reader === "user" && message.sender === "admin") ||
              (reader === "admin" && message.sender === "user");
            
            if (shouldMarkRead && !message.readAt) {
              message.readAt = new Date();
              updated = true;
            }
          }
        }

        if (updated) {
          await chat.save();
          
          // Notify the other party that messages were read
          if (reader === "user") {
            // User read admin messages - notify admin
            io.to("admin-room").emit("messages-read", {
              chatId,
              messageIds,
            });
          } else {
            // Admin read user messages - notify user
            io.to(`user-${chatId}`).emit("messages-read", {
              chatId,
              messageIds,
            });
          }
        }
      } catch (error: any) {
        console.error("Error handling message read:", error);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

