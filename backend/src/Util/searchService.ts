import axios from "axios";

export interface SearchResult {
  title: string;
  snippet: string;
  link?: string;
}

export const searchAPI = async (query: string): Promise<string> => {
  try {
    const apiKey = process.env.SERP_API_KEY;
    
    if (!apiKey) {
      console.warn("SERP API key not configured, skipping search");
      return "";
    }

    // Using SerpAPI (you can change this to Google Custom Search or other providers)
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google",
        q: query,
        api_key: apiKey,
        num: 5, // Get top 5 results
      },
      timeout: 5000, // 5 second timeout
    });

    if (response.data?.organic_results && response.data.organic_results.length > 0) {
      const results = response.data.organic_results
        .slice(0, 3) // Top 3 results
        .map((result: any) => ({
          title: result.title || "",
          snippet: result.snippet || "",
          link: result.link || "",
        }));

      // Format results as a string for Gemini
      const formattedResults = results
        .map((result: SearchResult, index: number) => {
          return `${index + 1}. ${result.title}\n   ${result.snippet}${result.link ? `\n   Source: ${result.link}` : ""}`;
        })
        .join("\n\n");

      return formattedResults;
    }

    return "";
  } catch (error: any) {
    console.error("Search API Error:", error.message);
    // Don't throw error, just return empty string so Gemini can still respond
    return "";
  }
};



