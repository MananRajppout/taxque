'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ConfigurationSection = () => {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    geminiApiKey: "",
    hasApiKey: false,
    systemPrompt: "",
    enableAI: true,
    escalationKeywords: [] as string[],
    greetingMessage: "",
    handoverMessage: "",
  });
  const [newKeyword, setNewKeyword] = useState("");

  const getAPIURL = () => {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get(`${getAPIURL()}/configuration`);
      if (response.data.success) {
        setConfig(response.data.config);
      }
    } catch (error) {
      console.error("Error fetching configuration:", error);
      toast.error("Failed to load configuration");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${getAPIURL()}/configuration/update`, {
        geminiApiKey: config.geminiApiKey,
        systemPrompt: config.systemPrompt,
        enableAI: config.enableAI,
        escalationKeywords: config.escalationKeywords,
        greetingMessage: config.greetingMessage,
        handoverMessage: config.handoverMessage,
      });

      if (response.data.success) {
        toast.success("Configuration updated successfully!");
        setConfig(response.data.config);
      } else {
        toast.error("Failed to update configuration");
      }
    } catch (error: any) {
      console.error("Error updating configuration:", error);
      toast.error(error.response?.data?.message || "Failed to update configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !config.escalationKeywords.includes(newKeyword.trim())) {
      setConfig({
        ...config,
        escalationKeywords: [...config.escalationKeywords, newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setConfig({
      ...config,
      escalationKeywords: config.escalationKeywords.filter((k) => k !== keyword),
    });
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">AI Chat Configuration</h2>

        {/* OpenAI API Key */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key
          </label>
          <input
            type="password"
            value={config.geminiApiKey}
            onChange={(e) => setConfig({ ...config, geminiApiKey: e.target.value })}
            placeholder={config.hasApiKey ? "Enter new API key to update" : "Enter OpenAI API Key (or set OPENAI_API_KEY in .env)"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab15b]"
          />
          {config.hasApiKey && (
            <p className="mt-1 text-xs text-gray-500">
              API key is configured. Enter a new key to update it.
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Using <strong>gpt-4-turbo</strong> model. Get your API key from{" "}
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              OpenAI Platform
            </a>
          </p>
        </div>

        {/* System Prompt */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Prompt
          </label>
          <textarea
            value={config.systemPrompt}
            onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
            rows={6}
            placeholder="Enter system prompt for AI assistant..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab15b] resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            This prompt defines how the AI assistant behaves and responds to users.
          </p>
        </div>

        {/* Enable AI Toggle */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.enableAI}
              onChange={(e) => setConfig({ ...config, enableAI: e.target.checked })}
              className="w-5 h-5 text-[#5ab15b] rounded focus:ring-2 focus:ring-[#5ab15b]"
            />
            <span className="text-sm font-medium text-gray-700">
              Enable AI Assistant
            </span>
          </label>
          <p className="mt-1 ml-8 text-xs text-gray-500">
            When disabled, all chats will be escalated to human agents.
          </p>
        </div>

        {/* Greeting Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Greeting Message
          </label>
          <textarea
            value={config.greetingMessage}
            onChange={(e) => setConfig({ ...config, greetingMessage: e.target.value })}
            rows={3}
            placeholder="Enter greeting message to show when chat widget opens..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab15b] resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            This message will be displayed automatically when the chat widget opens for users.
          </p>
        </div>

        {/* Handover Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Handover Message
          </label>
          <textarea
            value={config.handoverMessage}
            onChange={(e) => setConfig({ ...config, handoverMessage: e.target.value })}
            rows={3}
            placeholder="Enter message to show when chat is transferred to human agent..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab15b] resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            This message will be sent automatically when a chat is escalated or transferred to a human agent.
          </p>
        </div>

        {/* Escalation Keywords */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Escalation Keywords
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Messages containing these keywords will automatically escalate to human agents.
          </p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
              placeholder="Add keyword (e.g., 'human', 'agent')"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab15b]"
            />
            <button
              onClick={handleAddKeyword}
              className="px-4 py-2 bg-[#5ab15b] text-white rounded-lg hover:bg-[#4a9f4a] transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.escalationKeywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {keyword}
                <button
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-6 py-2 bg-[#5ab15b] text-white rounded-lg font-semibold hover:bg-[#4a9f4a] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSection;

