import { NewsArticle, WeatherCategory, WeatherData } from '../types';

// Weather-based news filtering logic
export const getWeatherCategory = (temperature: number): WeatherCategory => {
  // Convert to Celsius if needed (assuming input is in Kelvin from OpenWeatherMap)
  const tempCelsius = temperature - 273.15;
  
  if (tempCelsius < 10) return 'cold';
  if (tempCelsius > 30) return 'hot';
  if (tempCelsius >= 15 && tempCelsius <= 25) return 'cool';
  return 'moderate';
};

// Keywords for different weather categories
const weatherKeywords: Record<WeatherCategory, string[]> = {
  cold: [
    'depression', 'sad', 'gloomy', 'melancholy', 'tragedy', 'death', 'loss', 
    'crisis', 'recession', 'unemployment', 'poverty', 'homeless', 'suicide',
    'mental health', 'anxiety', 'stress', 'loneliness', 'isolation'
  ],
  hot: [
    'fear', 'terror', 'panic', 'anxiety', 'danger', 'threat', 'violence',
    'war', 'conflict', 'attack', 'emergency', 'disaster', 'crisis',
    'alarm', 'warning', 'alert', 'scare', 'horror', 'nightmare'
  ],
  cool: [
    'win', 'victory', 'success', 'achievement', 'happiness', 'joy', 'celebration',
    'triumph', 'breakthrough', 'innovation', 'progress', 'growth', 'prosperity',
    'optimism', 'hope', 'inspiration', 'motivation', 'positive', 'good news'
  ],
  moderate: [
    'balance', 'stable', 'normal', 'routine', 'steady', 'consistent',
    'moderate', 'average', 'standard', 'regular', 'typical'
  ]
};

// Filter news articles based on weather
export const filterNewsByWeather = (articles: NewsArticle[], weather: WeatherData): NewsArticle[] => {
  const weatherCategory = getWeatherCategory(weather.main.temp);
  const keywords = weatherKeywords[weatherCategory];
  
  // Filter articles that contain any of the weather-specific keywords
  const filteredArticles = articles.filter(article => {
    const searchText = `${article.title} ${article.description} ${article.content || ''}`.toLowerCase();
    return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
  });

  // If no articles match the weather criteria, return a subset of general articles
  if (filteredArticles.length === 0) {
    return articles.slice(0, 5); // Return first 5 articles as fallback
  }

  // Return up to 10 filtered articles
  return filteredArticles.slice(0, 10);
};

// Get weather description for display
export const getWeatherDescription = (weather: WeatherData): string => {
  const category = getWeatherCategory(weather.main.temp);
  const tempCelsius = Math.round(weather.main.temp - 273.15);
  
  switch (category) {
    case 'cold':
      return `Cold weather (${tempCelsius}°C) - Showing news about challenges and difficult times`;
    case 'hot':
      return `Hot weather (${tempCelsius}°C) - Showing news about concerns and urgent matters`;
    case 'cool':
      return `Cool weather (${tempCelsius}°C) - Showing news about success and positive developments`;
    case 'moderate':
      return `Moderate weather (${tempCelsius}°C) - Showing balanced news coverage`;
    default:
      return `Current weather (${tempCelsius}°C)`;
  }
};

// Convert temperature based on user preference
export const convertTemperature = (tempKelvin: number, unit: 'celsius' | 'fahrenheit'): number => {
  const tempCelsius = tempKelvin - 273.15;
  
  if (unit === 'fahrenheit') {
    return Math.round((tempCelsius * 9/5) + 32);
  }
  
  return Math.round(tempCelsius);
};

// Get temperature unit symbol
export const getTemperatureSymbol = (unit: 'celsius' | 'fahrenheit'): string => {
  return unit === 'celsius' ? '°C' : '°F';
};