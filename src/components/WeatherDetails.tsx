"use client";

import { useWeatherStore } from "../store/weatherStore";

export const WeatherDetails = () => {
  const { airQuality, currentWeather } = useWeatherStore();

  if (!airQuality || !currentWeather) {
    return null;
  }

  const getAqiColor = (aqi: number) => {
    const colors = {
      1: "bg-green-100 text-green-800",
      2: "bg-yellow-100 text-yellow-800",
      3: "bg-orange-100 text-orange-800",
      4: "bg-red-100 text-red-800",
      5: "bg-purple-100 text-purple-800",
    };
    return colors[aqi as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-sky-900">상세 정보</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sky-800">대기질 정보</h4>
            <div className={`mt-2 inline-block px-3 py-1 rounded-full ${getAqiColor(airQuality.aqi)}`}>
              {airQuality.aqi_description}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sky-800">대기 오염물질</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="text-sky-600">미세먼지 (PM10):</span>
                <span className="ml-2 text-sky-900">{airQuality.components.pm10} µg/m³</span>
              </div>
              <div className="text-sm">
                <span className="text-sky-600">초미세먼지 (PM2.5):</span>
                <span className="ml-2 text-sky-900">{airQuality.components.pm2_5} µg/m³</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {currentWeather.sunrise && currentWeather.sunset && (
            <div>
              <h4 className="font-medium text-sky-800">일출/일몰</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm">
                  <span className="text-sky-600">일출:</span>
                  <span className="ml-2 text-sky-900">
                    {new Date(currentWeather.sunrise * 1000).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-sky-600">일몰:</span>
                  <span className="ml-2 text-sky-900">
                    {new Date(currentWeather.sunset * 1000).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
