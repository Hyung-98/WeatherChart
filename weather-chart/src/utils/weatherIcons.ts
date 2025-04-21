export const getWeatherIcon = (weather: string): string => {
  const iconMap: { [key: string]: string } = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Mist: "🌫️",
    Smoke: "💨",
    Haze: "🌫️",
    Dust: "💨",
    Fog: "🌫️",
    Sand: "💨",
    Ash: "🌋",
    Squall: "🌬️",
    Tornado: "🌪️",
  };

  return iconMap[weather] || "❓";
};
