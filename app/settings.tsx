import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { TemperatureUnit } from '../types';

const newsCategories = [
  { key: 'general', label: 'General', icon: 'newspaper' },
  { key: 'business', label: 'Business', icon: 'business' },
  { key: 'entertainment', label: 'Entertainment', icon: 'film' },
  { key: 'health', label: 'Health', icon: 'medical' },
  { key: 'science', label: 'Science', icon: 'flask' },
  { key: 'sports', label: 'Sports', icon: 'football' },
  { key: 'technology', label: 'Technology', icon: 'laptop' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { state, updateSettings } = useApp();

  const handleTemperatureUnitChange = (unit: TemperatureUnit) => {
    updateSettings({ temperatureUnit: unit });
  };

  const handleNewsCategoryToggle = (category: string) => {
    const currentCategories = state.settings.newsCategories;
    const isSelected = currentCategories.includes(category);
    
    let newCategories: string[];
    if (isSelected) {
      newCategories = currentCategories.filter(cat => cat !== category);
      // Ensure at least one category is selected
      if (newCategories.length === 0) {
        Alert.alert(
          'Cannot Remove Category',
          'You must have at least one news category selected.',
          [{ text: 'OK' }]
        );
        return;
      }
    } else {
      newCategories = [...currentCategories, category];
    }
    
    updateSettings({ newsCategories: newCategories });
  };

  const handleLocationPermission = () => {
    Alert.alert(
      'Location Permission',
      'This app needs location access to show weather for your area. Location data is only used to fetch weather information and is not stored or shared.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Grant Permission', onPress: () => {
          // This will be handled by the context
        }}
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}


      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Temperature Unit Section */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">Temperature Unit</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={() => handleTemperatureUnitChange('celsius')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 ${
                state.settings.temperatureUnit === 'celsius'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text className={`text-center font-semibold ${
                state.settings.temperatureUnit === 'celsius'
                  ? 'text-primary-600'
                  : 'text-gray-600'
              }`}>
                Celsius (°C)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTemperatureUnitChange('fahrenheit')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 ${
                state.settings.temperatureUnit === 'fahrenheit'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text className={`text-center font-semibold ${
                state.settings.temperatureUnit === 'fahrenheit'
                  ? 'text-primary-600'
                  : 'text-gray-600'
              }`}>
                Fahrenheit (°F)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* News Categories Section */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">News Categories</Text>
          <Text className="text-sm text-gray-600 mb-4">
            Select the news categories you're interested in. At least one category must be selected.
          </Text>
          {newsCategories.map((category) => (
            <View key={category.key} className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <View className="flex-row items-center flex-1">
                <Ionicons 
                  name={category.icon as any} 
                  size={20} 
                  color="#6B7280" 
                  style={{ marginRight: 12 }}
                />
                <Text className="text-gray-800 font-medium">{category.label}</Text>
              </View>
              <Switch
                value={state.settings.newsCategories.includes(category.key)}
                onValueChange={() => handleNewsCategoryToggle(category.key)}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={state.settings.newsCategories.includes(category.key) ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
          ))}
        </View>

        {/* Location Section */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">Location</Text>
          <TouchableOpacity
            onPress={handleLocationPermission}
            className="flex-row items-center justify-between py-3"
          >
            <View className="flex-row items-center flex-1">
              <Ionicons name="location" size={20} color="#6B7280" style={{ marginRight: 12 }} />
              <View>
                <Text className="text-gray-800 font-medium">Location Permission</Text>
                <Text className="text-sm text-gray-600">
                  {state.settings.location ? 'Location enabled' : 'Location disabled'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">App Information</Text>
          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Version</Text>
              <Text className="text-gray-800 font-medium">1.0.0</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Weather API</Text>
              <Text className="text-gray-800 font-medium">OpenWeatherMap</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">News API</Text>
              <Text className="text-gray-800 font-medium">NewsAPI</Text>
            </View>
          </View>
        </View>

        {/* Weather Filtering Info */}
        <View className="bg-primary-50 mx-4 mt-4 rounded-xl p-4 border border-primary-200">
          <Text className="text-lg font-bold text-primary-800 mb-2">About Weather-Based News Filtering</Text>
          <Text className="text-sm text-primary-700 leading-5">
            This app filters news based on current weather conditions:
          </Text>
          <View className="mt-2 space-y-1">
            <Text className="text-sm text-primary-700">• Cold weather: Shows news about challenges and difficult times</Text>
            <Text className="text-sm text-primary-700">• Hot weather: Shows news about concerns and urgent matters</Text>
            <Text className="text-sm text-primary-700">• Cool weather: Shows news about success and positive developments</Text>
            <Text className="text-sm text-primary-700">• Moderate weather: Shows balanced news coverage</Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}