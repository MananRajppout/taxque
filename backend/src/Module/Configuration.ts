import mongoose from "mongoose";

const ConfigurationSchema = new mongoose.Schema({
  geminiApiKey: {
    type: String,
    default: "",
    // Note: This field name is kept for backward compatibility
    // but it now stores OpenAI API key
  },
  systemPrompt: {
    type: String,
    default: "You are a helpful AI assistant for TaxQue, a tax and compliance services company. Provide accurate, professional, and friendly responses about tax services, GST, compliance, and related topics. If you don't know something, admit it and suggest contacting a human agent.",
  },
  enableAI: {
    type: Boolean,
    default: true,
  },
  escalationKeywords: {
    type: [String],
    default: ["human", "agent", "representative", "speak to someone", "talk to person", "help me", "urgent"],
  },
  greetingMessage: {
    type: String,
    default: "Hello! 👋 Welcome to TaxQue. How can we help you today?",
  },
  handoverMessage: {
    type: String,
    default: "Your chat has been transferred to a human agent. Please wait while we connect you with one of our team members.",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const ConfigurationModel = mongoose.model("Configuration", ConfigurationSchema);

// Helper function to get or create configuration
export const getConfiguration = async () => {
  let config = await ConfigurationModel.findOne();
  if (!config) {
    config = await ConfigurationModel.create({});
  }
  return config;
};

module.exports = ConfigurationModel;
module.exports.getConfig = getConfiguration;

