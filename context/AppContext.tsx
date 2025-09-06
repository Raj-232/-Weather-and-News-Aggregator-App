import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { getNewsHeadlines } from '../service/news-api';
import { getCurrentWeather, getWeatherForecast } from '../service/openweathermap-api';
import { AppState, NewsArticle, UserSettings, WeatherData } from '../types';
import { filterNewsByWeather } from '../utils/weatherFilter';

// Initial state
const initialState: AppState = {
  weather: null,
  forecast: null,
  news: [],
  filteredNews: [],
  settings: {
    temperatureUnit: 'celsius',
    newsCategories: ['general', 'technology', 'business'],
    location: null,
  },
  loading: {
    weather: false,
    news: false,
  },
  error: null,
};

// Action types
type AppAction =
  | { type: 'SET_LOADING'; payload: { weather?: boolean; news?: boolean } }
  | { type: 'SET_WEATHER'; payload: WeatherData }
  | { type: 'SET_FORECAST'; payload: any }
  | { type: 'SET_NEWS'; payload: NewsArticle[] }
  | { type: 'SET_FILTERED_NEWS'; payload: NewsArticle[] }
  | { type: 'SET_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOCATION'; payload: { lat: number; lon: number } };

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          ...action.payload,
        },
      };
    case 'SET_WEATHER':
      return {
        ...state,
        weather: action.payload,
        error: null,
      };
    case 'SET_FORECAST':
      return {
        ...state,
        forecast: action.payload,
      };
    case 'SET_NEWS':
      return {
        ...state,
        news: action.payload,
      };
    case 'SET_FILTERED_NEWS':
      return {
        ...state,
        filteredNews: action.payload,
      };
    case 'SET_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_LOCATION':
      return {
        ...state,
        settings: {
          ...state.settings,
          location: action.payload,
        },
      };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  fetchWeather: () => Promise<void>;
  fetchNews: () => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  requestLocationPermission: () => Promise<void>;
} | null>(null);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load settings from storage on app start
  useEffect(() => {
    loadSettings();
  }, []);

  // Fetch weather when location changes
  useEffect(() => {
    if (state.settings.location) {
      fetchWeather();
    }
  }, [state.settings.location]);

  // Filter news when weather or news changes
  useEffect(() => {
    if (state.weather && state.news.length > 0) {
      const filtered = filterNewsByWeather(state.news, state.weather);
      dispatch({ type: 'SET_FILTERED_NEWS', payload: filtered });
    }
  }, [state.weather, state.news]);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        dispatch({ type: 'SET_SETTINGS', payload: settings });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (settings: Partial<UserSettings>) => {
    try {
      const newSettings = { ...state.settings, ...settings };
      await AsyncStorage.setItem('userSettings', JSON.stringify(newSettings));
      dispatch({ type: 'SET_SETTINGS', payload: settings });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        dispatch({ type: 'SET_ERROR', payload: 'Location permission denied' });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      dispatch({ type: 'SET_LOCATION', payload: { lat: latitude, lon: longitude } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to get location' });
    }
  };

  const fetchWeather = async () => {
    if (!state.settings.location) return;

    dispatch({ type: 'SET_LOADING', payload: { weather: true } });
    try {
      const [weatherResult, forecastResult] = await Promise.all([
        getCurrentWeather(state.settings.location.lat, state.settings.location.lon),
        getWeatherForecast(state.settings.location.lat, state.settings.location.lon),
      ]);

      if (weatherResult.error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch weather data' });
        return;
      }

      if (forecastResult.error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch forecast data' });
        return;
      }

      dispatch({ type: 'SET_WEATHER', payload: weatherResult.data });
      dispatch({ type: 'SET_FORECAST', payload: forecastResult.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch weather data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { weather: false } });
    }
  };

  const fetchNews = async () => {
    dispatch({ type: 'SET_LOADING', payload: { news: true } });
    try {
      const result = await getNewsHeadlines(state.settings.newsCategories);
      
      if (result.error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch news data' });
        return;
      }

      dispatch({ type: 'SET_NEWS', payload: result.data.articles });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch news data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { news: false } });
    }
  };

  const updateSettings = async (settings: Partial<UserSettings>) => {
    await saveSettings(settings);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        fetchWeather,
        fetchNews,
        updateSettings,
        requestLocationPermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};