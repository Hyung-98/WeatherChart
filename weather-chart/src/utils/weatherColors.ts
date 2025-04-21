export const getWeatherColor = (weather: string): string => {
  const colorMap: { [key: string]: string } = {
    Clear: "bg-gradient-to-br from-blue-400 to-blue-600",
    Clouds: "bg-gradient-to-br from-gray-400 to-gray-600",
    Rain: "bg-gradient-to-br from-blue-600 to-blue-800",
    Snow: "bg-gradient-to-br from-blue-200 to-blue-400",
    Thunderstorm: "bg-gradient-to-br from-purple-600 to-purple-800",
    Drizzle: "bg-gradient-to-br from-blue-500 to-blue-700",
    Mist: "bg-gradient-to-br from-gray-300 to-gray-500",
    Smoke: "bg-gradient-to-br from-gray-500 to-gray-700",
    Haze: "bg-gradient-to-br from-gray-400 to-gray-600",
    Dust: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    Fog: "bg-gradient-to-br from-gray-300 to-gray-500",
    Sand: "bg-gradient-to-br from-yellow-500 to-yellow-700",
    Ash: "bg-gradient-to-br from-gray-600 to-gray-800",
    Squall: "bg-gradient-to-br from-blue-700 to-blue-900",
    Tornado: "bg-gradient-to-br from-red-600 to-red-800",
  };

  return colorMap[weather] || "bg-gradient-to-br from-gray-400 to-gray-600";
};
