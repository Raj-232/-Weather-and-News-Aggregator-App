import axios from "axios";
import { NewsResponse } from "../types";

const backendUrl = process.env.EXPO_PUBLIC_NEWS_API_URL;
const apiKey = process.env.EXPO_PUBLIC_NEWS_API_KEY;

const api = axios.create({
    baseURL: backendUrl,
    params: {
        "apiKey": apiKey
    },
});

// Get top headlines
export const getTopHeadlines = async (category?: string, country: string = 'us') => {
    try {
        const params: any = {
            country,
            pageSize: 50
        };
        
        if (category) {
            params.category = category;
        }

        const response = await api.get("/top-headlines", { params });
        return { data: response.data as NewsResponse, error: null };
    } catch (error) {
        console.error("News API Error:", error);
        return { 
            data: null, 
            error: error instanceof Error ? error.message : "Failed to fetch news data" 
        };
    }
};

// Get news headlines by categories
export const getNewsHeadlines = async (categories: string[] = ['general']) => {
    try {
        // Fetch news for each category and combine results
        const promises = categories.map(category => getTopHeadlines(category));
        const results = await Promise.all(promises);
        
        // Combine all articles and remove duplicates
        const allArticles = results
            .filter(result => result.data && !result.error)
            .flatMap(result => result.data!.articles);
        
        // Remove duplicates based on title
        const uniqueArticles = allArticles.filter((article, index, self) => 
            index === self.findIndex(a => a.title === article.title)
        );

        return { 
            data: { 
                status: 'ok', 
                totalResults: uniqueArticles.length, 
                articles: uniqueArticles 
            } as NewsResponse, 
            error: null 
        };
    } catch (error) {
        console.error("News API Error:", error);
        return { 
            data: null, 
            error: error instanceof Error ? error.message : "Failed to fetch news data" 
        };
    }
};

// Search news by query
export const searchNews = async (query: string, sortBy: string = 'publishedAt') => {
    try {
        const response = await api.get("/everything", {
            params: {
                q: query,
                sortBy,
                pageSize: 50,
                language: 'en'
            }
        });
        return { data: response.data as NewsResponse, error: null };
    } catch (error) {
        console.error("News API Error:", error);
        return { 
            data: null, 
            error: error instanceof Error ? error.message : "Failed to search news" 
        };
    }
};

// Get news by specific sources
export const getNewsBySources = async (sources: string[]) => {
    try {
        const response = await api.get("/everything", {
            params: {
                sources: sources.join(','),
                pageSize: 50,
                sortBy: 'publishedAt'
            }
        });
        return { data: response.data as NewsResponse, error: null };
    } catch (error) {
        console.error("News API Error:", error);
        return { 
            data: null, 
            error: error instanceof Error ? error.message : "Failed to fetch news from sources" 
        };
    }
};
