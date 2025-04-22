"use client";

import { useWeatherStore } from "../store/weatherStore";
import { getWeatherIcon } from "../utils/weatherIcons";
import { getWeatherDescription } from "../utils/weatherDescriptions";

export const WeatherDisplay = () => {
  const { currentWeather, isLoading, error } = useWeatherStore();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center text-red-500 p-4">
          <p className="text-lg font-semibold">오류가 발생했습니다</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="space-y-4">
        <div className="text-center text-sky-500 p-4">
          <p className="text-lg">위치를 선택해주세요</p>
        </div>
      </div>
    );
  }

  const weatherIcon = getWeatherIcon(currentWeather.condition);
  const weatherDescription = getWeatherDescription(currentWeather.condition);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <div className="text-6xl mb-4">{weatherIcon}</div>
        <h2 className="text-2xl font-bold text-sky-900 mb-2">{currentWeather.city}</h2>
        <div className="text-4xl font-bold text-orange-600 mb-2">{Math.round(currentWeather.temperature)}°C</div>
        <div className="text-lg text-sky-600 mb-4">{weatherDescription}</div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
          <div className="bg-sky-50 rounded-lg p-4 text-center border border-sky-100">
            <div className="text-sm text-sky-600">체감 온도</div>
            <div className="text-xl font-semibold text-orange-600">{Math.round(currentWeather.feels_like)}°C</div>
          </div>
          <div className="bg-sky-50 rounded-lg p-4 text-center border border-sky-100">
            <div className="text-sm text-sky-600">습도</div>
            <div className="text-xl font-semibold text-orange-600">{Math.round(currentWeather.humidity)}%</div>
          </div>
          <div className="bg-sky-50 rounded-lg p-4 text-center border border-sky-100">
            <div className="text-sm text-sky-600">바람</div>
            <div className="text-xl font-semibold text-orange-600">{Math.round(currentWeather.wind_speed)}m/s</div>
          </div>
          <div className="bg-sky-50 rounded-lg p-4 text-center border border-sky-100">
            <div className="text-sm text-sky-600">기압</div>
            <div className="text-xl font-semibold text-orange-600">{currentWeather.pressure}hPa</div>
          </div>
        </div>
      </div>
    </div>
  );
};
