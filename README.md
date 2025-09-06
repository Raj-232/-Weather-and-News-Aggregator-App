# Weather and News Aggregator App

A React Native app built with Expo that fetches and displays weather information and news headlines using publicly available APIs. The app includes unique logic to filter news based on the current weather conditions.

## Features

### Weather Information
- Fetch current weather data based on user's location
- Display temperature, weather conditions, and 5-day forecast
- Support for both Celsius and Fahrenheit temperature units
- Uses OpenWeatherMap API

### News Headlines
- Fetch latest news headlines from multiple categories
- Display headlines, descriptions, and links to full articles
- Uses NewsAPI for news data

### Weather-Based News Filtering
The app implements unique logic to filter news based on current weather:
- **Cold weather** (< 10°C): Shows news about challenges and difficult times
- **Hot weather** (> 30°C): Shows news about concerns and urgent matters  
- **Cool weather** (15-25°C): Shows news about success and positive developments
- **Moderate weather**: Shows balanced news coverage

### Settings
- Temperature unit selection (Celsius/Fahrenheit)
- News category preferences
- Location permission management

## Technical Specifications

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Context API with useReducer
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **APIs**: OpenWeatherMap API, NewsAPI
- **Location Services**: Expo Location
- **Storage**: AsyncStorage for settings persistence

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raj-232/-Weather-and-News-Aggregator-App
   cd -Weather-and-News-Aggregator-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with your API keys:
   ```env
   # Weather API Configuration
   EXPO_PUBLIC_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
   EXPO_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key_here

   # News API Configuration  
   EXPO_PUBLIC_NEWS_API_URL=https://newsapi.org/v2
   EXPO_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
   ```

4. **Get API Keys**
   
   **OpenWeatherMap API:**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard
   
   **NewsAPI:**
   - Visit [NewsAPI](https://newsapi.org/)
   - Sign up for a free account
   - Get your API key from the dashboard

5. **Start the development server**
   ```bash
   npx expo start
   ```

6. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## Project Structure

```
WNA-App/
├── app/                    # App screens (Expo Router)
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Home screen
│   ├── settings.tsx       # Settings screen
│   └── +not-found.tsx     # 404 page
├── components/            # Reusable UI components
│   ├── WeatherCard.tsx    # Weather display component
│   ├── NewsCard.tsx       # News article component
│   └── ForecastCard.tsx   # 5-day forecast component
├── context/               # State management
│   └── AppContext.tsx     # Main app context and provider
├── service/               # API services
│   ├── openweathermap-api.ts  # Weather API integration
│   └── news-api.ts        # News API integration
├── types/                 # TypeScript type definitions
│   └── index.ts           # App-wide type definitions
├── utils/                 # Utility functions
│   ├── weatherFilter.ts   # Weather-based news filtering logic
│   └── responsive.ts      # Responsive design utilities
└── assets/                # Static assets (images, fonts)
```

## Key Components

### Weather-Based News Filtering
The app uses a sophisticated filtering system that analyzes weather conditions and matches them with relevant news keywords:

- **Cold Weather Keywords**: depression, sad, gloomy, tragedy, crisis, etc.
- **Hot Weather Keywords**: fear, terror, panic, danger, emergency, etc.
- **Cool Weather Keywords**: win, victory, success, happiness, achievement, etc.

### Responsive Design
The app adapts to different screen sizes:
- Small phones (≤320px)
- Medium phones (≤375px) 
- Large phones (≤414px)
- Tablets (≥768px)

### State Management
Uses Context API with useReducer for:
- Weather data and forecast
- News articles and filtered results
- User settings and preferences
- Loading states and error handling

## API Integration

### OpenWeatherMap API
- Current weather by coordinates
- 5-day weather forecast
- Weather icons and descriptions
- Temperature in metric units

### NewsAPI
- Top headlines by category
- Multiple news categories support
- Article metadata (title, description, image, URL)
- Duplicate article filtering

## Permissions

The app requires the following permissions:
- **Location**: To fetch weather data for user's current location
- **Internet**: To fetch weather and news data

## Development

### Available Scripts
- `npm start`: Start Expo development server
- `npm run android`: Run on Android emulator
- `npm run ios`: Run on iOS simulator
- `npm run web`: Run on web browser
- `npm run lint`: Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- NativeWind for styling

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your API keys are correctly set in the `.env` file
   - Verify API keys are valid and have proper permissions

2. **Location Permission**
   - Grant location permission when prompted
   - Check device location settings

3. **Network Issues**
   - Ensure stable internet connection
   - Check API service status

4. **Build Issues**
   - Clear Expo cache: `npx expo start --clear`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the [Expo documentation](https://docs.expo.dev/)
- Review API documentation for [OpenWeatherMap](https://openweathermap.org/api) and [NewsAPI](https://newsapi.org/docs)
- Open an issue in the repository
