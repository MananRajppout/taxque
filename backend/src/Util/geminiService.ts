import OpenAI from "openai";

export interface GeminiConfig {
  apiKey: string;
  systemPrompt?: string;
}

// Note: Keeping the name as GeminiConfig for backward compatibility
// but this now uses OpenAI
export const generateAIResponse = async (
  userMessage: string,
  chatHistory: Array<{ sender: string; message: string; timestamp: Date }>,
  searchResults?: string,
  config?: GeminiConfig
): Promise<string> => {
  try {
    const apiKey = config?.apiKey || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.");
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Build conversation history in OpenAI format
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

    // Add system prompt
    const systemPrompt = config?.systemPrompt || 
      "You are a helpful AI assistant for TaxQue, a tax and compliance services company. " +
      "Provide accurate, professional, and friendly responses about tax services, GST, compliance, and related topics. " +
      "If you don't know something, admit it and suggest contacting a human agent.";

    if (searchResults) {
      messages.push({
        role: "system",
        content: `${systemPrompt}\n\nHere is some relevant information from our knowledge base:\n${searchResults}`,
      });
    } else {
      messages.push({
        role: "system",
        content: systemPrompt,
      });
    }

    // Add conversation history (last 10 messages for context)
    const recentHistory = chatHistory.slice(-10);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.message,
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: userMessage,
    });

    // Call OpenAI API with gpt-4-turbo model
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response from OpenAI");
    }

    return response.trim();
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    throw new Error(`Failed to generate AI response: ${error.message}`);
  }
};
