'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface AnalyticsData {
  totalChats: number;
  openChats: number;
  closedChats: number;
  escalatedChats: number;
  escalationRate: number;
  averageResponseTime: number;
  averageRating: number;
  totalMessages: number;
  averageMessagesPerChat: number;
  chatsByDay: { [key: string]: number };
  ratings: {
    total: number;
    average: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

const AnalyticsSection = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getAPIURL = () => {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";
  };

  useEffect(() => {
    fetchAnalytics();
  }, [startDate, endDate]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get(`${getAPIURL()}/analytics`, { params });
      if (response.data.success) {
        setAnalytics(response.data.analytics);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  if (loading && !analytics) {
    return (
      <div className="w-full h-full bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="w-full h-full bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-500">No analytics data available</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h2>

        {/* Date Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab15b]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab15b]"
              />
            </div>
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Total Chats</div>
            <div className="text-3xl font-bold text-gray-800">{analytics.totalChats}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Open Chats</div>
            <div className="text-3xl font-bold text-green-600">{analytics.openChats}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Escalated Chats</div>
            <div className="text-3xl font-bold text-orange-600">{analytics.escalatedChats}</div>
            <div className="text-xs text-gray-500 mt-1">
              {analytics.escalationRate.toFixed(1)}% escalation rate
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Avg Response Time</div>
            <div className="text-3xl font-bold text-blue-600">
              {formatTime(analytics.averageResponseTime)}
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Average Rating</div>
            <div className="text-3xl font-bold text-yellow-600">
              {analytics.averageRating.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {analytics.ratings.total} ratings
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Total Messages</div>
            <div className="text-3xl font-bold text-gray-800">{analytics.totalMessages}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Avg Messages/Chat</div>
            <div className="text-3xl font-bold text-gray-800">
              {analytics.averageMessagesPerChat.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        {analytics.ratings.total > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = analytics.ratings.distribution[rating as keyof typeof analytics.ratings.distribution];
                const percentage = analytics.ratings.total > 0
                  ? (count / analytics.ratings.total) * 100
                  : 0;
                return (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-gray-700">
                      {rating} ⭐
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-yellow-400 h-full rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-16 text-sm text-gray-600 text-right">
                      {count} ({percentage.toFixed(0)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chats by Day (Last 30 Days) */}
        {Object.keys(analytics.chatsByDay).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Chats by Day (Last 30 Days)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {Object.entries(analytics.chatsByDay)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([date, count]) => (
                  <div
                    key={date}
                    className="bg-gray-50 rounded p-2 text-center"
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">{count}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsSection;




