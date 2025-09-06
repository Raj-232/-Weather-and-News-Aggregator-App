import React from 'react';
import { Image, Text, View } from 'react-native';
import { WeatherData } from '../types';
import { isTablet } from '../utils/responsive';
import { convertTemperature, getTemperatureSymbol } from '../utils/weatherFilter';

interface WeatherCardProps {
  weather: WeatherData;
  temperatureUnit: 'celsius' | 'fahrenheit';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, temperatureUnit }) => {
  const temperature = convertTemperature(weather.main.temp, temperatureUnit);
  const feelsLike = convertTemperature(weather.main.feels_like, temperatureUnit);
  const minTemp = convertTemperature(weather.main.temp_min, temperatureUnit);
  const maxTemp = convertTemperature(weather.main.temp_max, temperatureUnit);
  const unitSymbol = getTemperatureSymbol(temperatureUnit);

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const isTabletDevice = isTablet();
  const paddingClass = isTabletDevice ? 'p-8' : 'p-4';
  const marginClass = isTabletDevice ? 'mx-6' : 'mx-4';
  const tempTextSize = isTabletDevice ? 'text-6xl' : 'text-5xl';
  const cityTextSize = isTabletDevice ? 'text-3xl' : 'text-2xl';

  return (
    <View className={`bg-white rounded-xl ${paddingClass} ${marginClass} mb-4 shadow-lg`}>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Text className={`${cityTextSize} font-bold text-gray-800`}>{weather.name}</Text>
          <Text className={`${isTabletDevice ? 'text-xl' : 'text-lg'} text-gray-600 capitalize`}>
            {weather.weather[0].description}
          </Text>
        </View>
        <Image
          source={{ uri: getWeatherIcon(weather.weather[0].icon) }}
          className={`${isTabletDevice ? 'w-20 h-20' : 'w-16 h-16'}`}
          resizeMode="contain"
        />
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <Text className={`${tempTextSize} font-bold text-blue-600`}>
          {temperature}{unitSymbol}
        </Text>
        <View className="items-end">
          <Text className="text-sm text-gray-500">Feels like</Text>
          <Text className={`${isTabletDevice ? 'text-xl' : 'text-lg'} font-semibold text-gray-700`}>
            {feelsLike}{unitSymbol}
          </Text>
        </View>
      </View>

      <View className={`flex-row ${isTabletDevice ? 'justify-around' : 'justify-between'}`}>
        <View className="items-center">
          <Text className="text-sm text-gray-500">Min</Text>
          <Text className={`${isTabletDevice ? 'text-xl' : 'text-lg'} font-semibold text-blue-500`}>
            {minTemp}{unitSymbol}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500">Max</Text>
          <Text className={`${isTabletDevice ? 'text-xl' : 'text-lg'} font-semibold text-red-500`}>
            {maxTemp}{unitSymbol}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500">Humidity</Text>
          <Text className={`${isTabletDevice ? 'text-xl' : 'text-lg'} font-semibold text-gray-700`}>
            {weather.main.humidity}%
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500">Wind</Text>
          <Text className={`${isTabletDevice ? 'text-xl' : 'text-lg'} font-semibold text-gray-700`}>
            {weather.wind.speed} m/s
          </Text>
        </View>
      </View>
    </View>
  );
};