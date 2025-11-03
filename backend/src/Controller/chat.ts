import { Request, Response } from "express";
const Chat = require("../Module/Chat");

// Get all chats (for admin)
export const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find()
      .sort({ lastMessageAt: -1 })
      .select("userId userName userEmail messages status lastMessageAt createdAt");
    
    // Format chats for admin panel
    const formattedChats = chats.map((chat: any) => {
      const lastMessage = chat.messages.length > 0 
        ? chat.messages[chat.messages.length - 1] 
        : null;
      
      return {
        id: chat._id.toString(),
        userId: chat.userId,
        name: chat.userName,
        email: chat.userEmail,
        lastMessage: lastMessage?.message || "No messages yet",
        date: new Date(chat.lastMessageAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        status: chat.status,
        unreadCount: chat.messages.filter((msg: any) => msg.sender === "user" && !msg.read).length,
        createdAt: chat.createdAt,
      };
    });

    res.status(200).json({ success: true, chats: formattedChats });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

// Get chat by ID (with all messages)
export const getChatById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, chat });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

// Get chat by user email
export const getChatByUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const chat = await Chat.findOne({ userEmail: email })
      .sort({ createdAt: -1 });
    
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, chat });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

// Create new chat (when user sends first message)
export const createChat = async (req: Request, res: Response) => {
  try {
    const { userId, userName, userEmail, message } = req.body;

    // Check if chat already exists
    let chat = await Chat.findOne({ userEmail });

    if (!chat) {
      // Create new chat
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
      await chat.save();
    } else {
      // Add message to existing chat
      chat.messages.push({
        sender: "user",
        message,
        timestamp: new Date(),
      });
      chat.lastMessageAt = new Date();
      chat.status = "open";
      await chat.save();
    }

    res.status(201).json({ success: true, chat });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

// Update chat status
export const updateChatStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, chat });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

