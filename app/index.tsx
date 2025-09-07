import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ForecastCard } from '../components/ForecastCard';
import { NewsCard } from '../components/NewsCard';
import { WeatherCard } from '../components/WeatherCard';
import { useApp } from '../context/AppContext';
import { getWeatherDescription } from '../utils/weatherFilter';

export default function HomeScreen() {
  const router = useRouter();
  const {
    state,
    fetchWeather,
    fetchNews,
    requestLocationPermission
  } = useApp();

  useEffect(() => {
    // Request location permission and fetch initial data
    const initializeApp = async () => {
      await requestLocationPermission();
      await fetchNews();
    };

    initializeApp();
  }, []);

  const handleRefresh = async () => {
    await Promise.all([
      fetchWeather(),
      fetchNews()
    ]);
  };

  const handleLocationPress = () => {
    Alert.alert(
      'Location Permission',
      'This app needs location access to show weather for your area. Would you like to enable location services?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Enable', onPress: requestLocationPermission }
      ]
    );
  };

  const isLoading = state.loading.weather || state.loading.news;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <Stack.Screen options={{
        headerRight: () => (
          <View className="flex-row gap-x-2">
            <TouchableOpacity
              onPress={handleLocationPress}
              className="flex-row items-center bg-primary-500 px-3 py-2 rounded-lg"
            >
              <Ionicons name="location" size={16} color="white" />
              <Text className="text-white ml-1 text-sm">Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              className="flex-row items-center bg-primary-500 px-3 py-2 rounded-lg"
            >
              <Ionicons name="settings" size={16} color="white" />
              <Text className="text-white ml-1 text-sm">Settings</Text>
            </TouchableOpacity>
          </View>
        )
      }} />


      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Weather Section */}
        {state.weather && (
          <>
            <WeatherCard
              weather={state.weather}
              temperatureUnit={state.settings.temperatureUnit}
            />

            {state.forecast && (
              <ForecastCard
                forecast={state.forecast}
                temperatureUnit={state.settings.temperatureUnit}
              />
            )}

            {/* Weather-based News Filter Description */}
            <View className="bg-primary-50 rounded-lg p-4 mx-4 mb-4">
              <Text className="text-sm text-primary-800 font-medium">
                {getWeatherDescription(state.weather)}
              </Text>
            </View>
          </>
        )}

        {/* News Section */}
        <View className="px-4 mb-4">
          <Text className="text-xl font-bold text-gray-800 mb-3">
            Weather-Filtered News
          </Text>

          {state.error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <Text className="text-red-800 text-sm">{state.error}</Text>
            </View>
          )}

          {state.filteredNews.length === 0 && !isLoading && (
            <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <Text className="text-yellow-800 text-sm">
                No news articles match the current weather conditions. Try refreshing or check your internet connection.
              </Text>
            </View>
          )}

          {state.filteredNews.map((article, index) => (
            <NewsCard key={`${article.title}-${index}`} article={article} />
          ))}
        </View>

        {/* Loading State */}
        {isLoading && state.filteredNews.length === 0 && (
          <View className="items-center py-8">
            <Text className="text-gray-500">Loading weather and news...</Text>
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}