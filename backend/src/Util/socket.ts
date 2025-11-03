import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
const Chat = require("../Module/Chat");

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

        await chat.save();

        // Get the last message (the one just added)
        const lastMessage = chat.messages[chat.messages.length - 1];

        // Notify admin with summary for sidebar
        const chatData = {
          id: chat._id.toString(),
          userId: chat.userId,
          name: chat.userName,
          email: chat.userEmail,
          lastMessage: message,
          date: new Date(chat.lastMessageAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          status: chat.status,
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

        // Send reply to user
        io.to(`user-${chatId}`).emit("admin-reply", {
          chatId,
          message,
          timestamp: new Date(),
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

