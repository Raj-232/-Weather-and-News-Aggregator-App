// Weather Types
export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
}

// News Types
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Weather Categories for News Filtering
export type WeatherCategory = 'cold' | 'hot' | 'cool' | 'moderate';

export interface WeatherBasedNewsFilter {
  category: WeatherCategory;
  keywords: string[];
}

// Settings Types
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface UserSettings {
  temperatureUnit: TemperatureUnit;
  newsCategories: string[];
  location: {
    lat: number;
    lon: number;
  } | null;
}

// App State Types
export interface AppState {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  news: NewsArticle[];
  filteredNews: NewsArticle[];
  settings: UserSettings;
  loading: {
    weather: boolean;
    news: boolean;
  };
  error: string | null;
}

// Location Types
export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}