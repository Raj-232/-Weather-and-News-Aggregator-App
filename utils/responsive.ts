import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Breakpoints for different screen sizes
export const breakpoints = {
  small: 320,
  medium: 375,
  large: 414,
  xlarge: 768,
};

// Screen size detection
export const getScreenSize = () => {
  if (width <= breakpoints.small) return 'small';
  if (width <= breakpoints.medium) return 'medium';
  if (width <= breakpoints.large) return 'large';
  return 'xlarge';
};

// Responsive font sizes
export const getResponsiveFontSize = (baseSize: number) => {
  const screenSize = getScreenSize();
  const multipliers = {
    small: 0.9,
    medium: 1,
    large: 1.1,
    xlarge: 1.2,
  };
  return Math.round(baseSize * multipliers[screenSize]);
};

// Responsive spacing
export const getResponsiveSpacing = (baseSpacing: number) => {
  const screenSize = getScreenSize();
  const multipliers = {
    small: 0.8,
    medium: 1,
    large: 1.1,
    xlarge: 1.2,
  };
  return Math.round(baseSpacing * multipliers[screenSize]);
};

// Responsive padding/margin classes
export const getResponsiveClasses = {
  padding: {
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4',
    xlarge: 'p-6',
  },
  margin: {
    small: 'm-2',
    medium: 'm-3',
    large: 'm-4',
    xlarge: 'm-6',
  },
  text: {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
  },
};

// Get responsive class based on screen size
export const getResponsiveClass = (type: 'padding' | 'margin' | 'text') => {
  const screenSize = getScreenSize();
  return getResponsiveClasses[type][screenSize];
};

// Check if device is tablet
export const isTablet = () => {
  return width >= breakpoints.xlarge;
};

// Check if device is small phone
export const isSmallPhone = () => {
  return width <= breakpoints.small;
};