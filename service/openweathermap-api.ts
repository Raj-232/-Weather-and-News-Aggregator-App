import axios from "axios";
import { ForecastData, WeatherData } from "../types";

const backendUrl = process.env.EXPO_PUBLIC_WEATHER_API_URL;
const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const api = axios.create({
    baseURL: backendUrl,
    params: {
        "appid": apiKey
    },
});

// Get current weather by coordinates
export const getCurrentWeather = async (lat: number, lon: number) => {
    try {
        const response = await api.get("/weather", {
            params: {
                lat,
                lon,
                units: "metric" // Get temperature in Celsius
            }
        });
        return { data: response.data as WeatherData, error: null };
    } catch (error) {
        console.error("Weather API Error:", error);
        return { 
            data: null, 
            error: error instanceof Error ? error.message : "Failed to fetch weather data" 
        };
    }
};

// Get 5-day weather forecast
export const getWeatherForecast = async (lat: number, lon: number) => {
    try {
        const response = await api.get("/forecast", {
            params: {
                lat,
                lon,
                units: "metric"
            }
        });
        return { data: response.data as ForecastData, error: null };
    } catch (error) {
        console.error("Forecast API Error:", error);
        return { 
            data: null, 
            error: error instanceof Error ? error.message : "Failed to fetch forecast data" 
        };
    }
};

// Get weather by city name (fallback option)
export const getWeatherByCity = async (cityName: string) => {
    try {
        const response = await api.get("/weather", {
            params: {
                q: cityName,
                units: "metric"
            }
        });
        return { data: response.data as WeatherData, error: null };
    } catch (error) {
        console.error("Weather API Error:", error);
        return { 
            data: null, 
            error: error instanceof Error ? error.message : "Failed to fetch weather data" 
        };
    }
};
