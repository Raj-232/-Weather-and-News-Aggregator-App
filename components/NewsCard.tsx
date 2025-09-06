import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { NewsArticle } from '../types';
import { isTablet } from '../utils/responsive';

interface NewsCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => {
  const handlePress = async () => {
    if (onPress) {
      onPress();
    } else if (article.url) {
      try {
        await Linking.openURL(article.url);
      } catch (error) {
        console.error('Failed to open URL:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isTabletDevice = isTablet();
  const paddingClass = isTabletDevice ? 'p-6' : 'p-4';
  const marginClass = isTabletDevice ? 'mx-6' : 'mx-4';
  const imageSize = isTabletDevice ? 'w-24 h-24' : 'w-20 h-20';
  const titleSize = isTabletDevice ? 'text-lg' : 'text-base';
  const descriptionSize = isTabletDevice ? 'text-base' : 'text-sm';

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-white rounded-lg ${paddingClass} ${marginClass} mb-3 shadow-md active:shadow-lg`}
      activeOpacity={0.7}
    >
      <View className="flex-row">
        {article.urlToImage && (
          <Image
            source={{ uri: article.urlToImage }}
            className={`${imageSize} rounded-lg mr-3`}
            resizeMode="cover"
          />
        )}
        <View className="flex-1">
          <Text className={`${isTabletDevice ? 'text-base' : 'text-sm'} font-semibold text-gray-500 mb-1`}>
            {article.source.name}
          </Text>
          <Text className={`${titleSize} font-bold text-gray-800 mb-2 leading-5`}>
            {article.title}
          </Text>
          {article.description && (
            <Text className={`${descriptionSize} text-gray-600 mb-2 leading-4`} numberOfLines={2}>
              {article.description}
            </Text>
          )}
          <Text className={`${isTabletDevice ? 'text-sm' : 'text-xs'} text-gray-400`}>
            {formatDate(article.publishedAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};