import { Request, Response } from "express";
const Chat = require("../Module/Chat");

// Get analytics
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    // Build date filter
    const dateFilter: any = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) {
        dateFilter.createdAt.$gte = new Date(startDate as string);
      }
      if (endDate) {
        dateFilter.createdAt.$lte = new Date(endDate as string);
      }
    }

    // Get all chats
    const chats = await Chat.find(dateFilter);

    // Calculate metrics
    const totalChats = chats.length;
    const openChats = chats.filter((chat: any) => chat.status === "open").length;
    const closedChats = chats.filter((chat: any) => chat.status === "closed").length;
    const escalatedChats = chats.filter((chat: any) => chat.escalated).length;

    // Calculate average response time (time between user message and admin/AI response)
    let totalResponseTime = 0;
    let responseCount = 0;

    chats.forEach((chat: any) => {
      const messages = chat.messages || [];
      for (let i = 0; i < messages.length - 1; i++) {
        if (messages[i].sender === "user" && messages[i + 1].sender === "admin") {
          const responseTime = new Date(messages[i + 1].timestamp).getTime() - 
                              new Date(messages[i].timestamp).getTime();
          totalResponseTime += responseTime;
          responseCount++;
        }
      }
    });

    const averageResponseTime = responseCount > 0 
      ? Math.round(totalResponseTime / responseCount / 1000) // Convert to seconds
      : 0;

    // Calculate ratings
    const ratings = chats
      .filter((chat: any) => chat.rating)
      .map((chat: any) => chat.rating);
    
    const averageRating = ratings.length > 0
      ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length
      : 0;

    // Calculate chats by day (last 30 days)
    const chatsByDay: { [key: string]: number } = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    chats
      .filter((chat: any) => new Date(chat.createdAt) >= thirtyDaysAgo)
      .forEach((chat: any) => {
        const date = new Date(chat.createdAt).toISOString().split("T")[0];
        chatsByDay[date] = (chatsByDay[date] || 0) + 1;
      });

    // Calculate escalation rate
    const escalationRate = totalChats > 0 
      ? (escalatedChats / totalChats) * 100 
      : 0;

    // Calculate messages per chat
    const totalMessages = chats.reduce((sum: number, chat: any) => 
      sum + (chat.messages?.length || 0), 0);
    const averageMessagesPerChat = totalChats > 0 
      ? totalMessages / totalChats 
      : 0;

    res.status(200).json({
      success: true,
      analytics: {
        totalChats,
        openChats,
        closedChats,
        escalatedChats,
        escalationRate: Math.round(escalationRate * 100) / 100,
        averageResponseTime, // in seconds
        averageRating: Math.round(averageRating * 100) / 100,
        totalMessages,
        averageMessagesPerChat: Math.round(averageMessagesPerChat * 100) / 100,
        chatsByDay,
        ratings: {
          total: ratings.length,
          average: Math.round(averageRating * 100) / 100,
          distribution: {
            5: ratings.filter((r: number) => r === 5).length,
            4: ratings.filter((r: number) => r === 4).length,
            3: ratings.filter((r: number) => r === 3).length,
            2: ratings.filter((r: number) => r === 2).length,
            1: ratings.filter((r: number) => r === 1).length,
          },
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

