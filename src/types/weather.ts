export interface WeatherData {
  city: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  condition: string;
  icon: string;
  pressure: number;
  sunrise?: number;
  sunset?: number;
  title?: string;
  visibility: number;
  maxTemp: number;
  minTemp: number;
  uvIndex: number;
  windSpeed: number;
  timestamp: number;
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
}

export interface ForecastItem {
  datetime: number;
  temperature: number;
  feels_like: number;
  humidity: number;
  condition: string;
  icon: string;
  wind_speed: number;
  pop: number; // Probability of precipitation (0-100)
}

export interface ForecastData {
  city: string;
  country: string;
  forecast: ForecastItem[];
}

export interface AirQualityData {
  location: Location;
  aqi: number;
  aqi_description: string;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

export interface WeatherStore {
  currentWeather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}
