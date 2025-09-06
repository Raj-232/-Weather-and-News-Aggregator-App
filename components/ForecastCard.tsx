import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { ForecastData } from '../types';
import { isTablet } from '../utils/responsive';
import { convertTemperature, getTemperatureSymbol } from '../utils/weatherFilter';

interface ForecastCardProps {
  forecast: ForecastData;
  temperatureUnit: 'celsius' | 'fahrenheit';
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, temperatureUnit }) => {
  const unitSymbol = getTemperatureSymbol(temperatureUnit);

  // Group forecast by day and get the first forecast for each day
  const dailyForecasts = forecast.list
    .filter((item, index) => index % 8 === 0) // Get one forecast per day (every 8th item for 3-hour intervals)
    .slice(0, 5); // Limit to 5 days

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isTabletDevice = isTablet();
  const paddingClass = isTabletDevice ? 'p-6' : 'p-4';
  const marginClass = isTabletDevice ? 'mx-6' : 'mx-4';
  const titleSize = isTabletDevice ? 'text-2xl' : 'text-xl';
  const iconSize = isTabletDevice ? 'w-16 h-16' : 'w-12 h-12';
  const tempSize = isTabletDevice ? 'text-xl' : 'text-lg';
  const minWidth = isTabletDevice ? 'min-w-[100px]' : 'min-w-[80px]';

  return (
    <View className={`bg-white rounded-xl ${paddingClass} ${marginClass} mb-4 shadow-lg`}>
      <Text className={`${titleSize} font-bold text-gray-800 mb-4`}>5-Day Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dailyForecasts.map((day, index) => {
          const temp = convertTemperature(day.main.temp, temperatureUnit);
          const minTemp = convertTemperature(day.main.temp_min, temperatureUnit);
          const maxTemp = convertTemperature(day.main.temp_max, temperatureUnit);

          return (
            <View key={index} className={`items-center mr-4 ${minWidth}`}>
              <Text className={`${isTabletDevice ? 'text-base' : 'text-sm'} font-semibold text-gray-600 mb-2`}>
                {formatDate(day.dt_txt)}
              </Text>
              <Image
                source={{ uri: getWeatherIcon(day.weather[0].icon) }}
                className={`${iconSize} mb-2`}
                resizeMode="contain"
              />
              <Text className={`${tempSize} font-bold text-gray-800 mb-1`}>
                {temp}{unitSymbol}
              </Text>
              <Text className={`${isTabletDevice ? 'text-sm' : 'text-xs'} text-gray-500`}>
                {minTemp}° / {maxTemp}°
              </Text>
              <Text className={`${isTabletDevice ? 'text-sm' : 'text-xs'} text-gray-600 capitalize text-center mt-1`}>
                {day.weather[0].description}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};