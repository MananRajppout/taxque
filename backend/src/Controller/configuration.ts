import { Request, Response } from "express";
const Configuration = require("../Module/Configuration");
const { getConfig } = require("../Module/Configuration");

// Get configuration
export const getConfiguration = async (req: Request, res: Response) => {
  try {
    const config = await getConfig();
    
    // Don't send full API key for security (mask it)
    const configData = {
      geminiApiKey: config.geminiApiKey ? `${config.geminiApiKey.substring(0, 10)}...` : "",
      hasApiKey: !!config.geminiApiKey,
      systemPrompt: config.systemPrompt,
      enableAI: config.enableAI,
      escalationKeywords: config.escalationKeywords,
      greetingMessage: config.greetingMessage || "Hello! 👋 Welcome to TaxQue. How can we help you today?",
      handoverMessage: config.handoverMessage || "Your chat has been transferred to a human agent. Please wait while we connect you with one of our team members.",
      note: "Note: This now uses OpenAI (gpt-4-turbo). Set OPENAI_API_KEY in environment or configure API key here.",
    };

    res.status(200).json({ success: true, config: configData });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update configuration
export const updateConfiguration = async (req: Request, res: Response) => {
  try {
    const { geminiApiKey, systemPrompt, enableAI, escalationKeywords, greetingMessage, handoverMessage } = req.body;

    let config = await Configuration.findOne();
    
    if (!config) {
      config = new Configuration({});
    }

    if (geminiApiKey !== undefined) {
      // Only update if a new key is provided (not masked)
      if (geminiApiKey && !geminiApiKey.includes("...")) {
        config.geminiApiKey = geminiApiKey;
      }
    }

    if (systemPrompt !== undefined) {
      config.systemPrompt = systemPrompt;
    }

    if (enableAI !== undefined) {
      config.enableAI = enableAI;
    }

    if (escalationKeywords !== undefined && Array.isArray(escalationKeywords)) {
      config.escalationKeywords = escalationKeywords;
    }

    if (greetingMessage !== undefined) {
      config.greetingMessage = greetingMessage;
    }

    if (handoverMessage !== undefined) {
      config.handoverMessage = handoverMessage;
    }

    config.updatedAt = new Date();
    await config.save();

    res.status(200).json({
      success: true,
      message: "Configuration updated successfully",
      config: {
        hasApiKey: !!config.geminiApiKey,
        systemPrompt: config.systemPrompt,
        enableAI: config.enableAI,
        escalationKeywords: config.escalationKeywords,
        greetingMessage: config.greetingMessage,
        handoverMessage: config.handoverMessage,
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

