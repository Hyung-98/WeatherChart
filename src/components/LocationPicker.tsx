"use client";

import { useState, useCallback } from "react";
import { useWeatherStore } from "../store/weatherStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const LocationPicker = () => {
  const [city, setCity] = useState("");
  const { setLocation, fetchCurrentWeather, fetchWeatherByCoordinates, isLoading, error } = useWeatherStore();

  const handleSearch = useCallback(async () => {
    if (city.trim()) {
      await fetchCurrentWeather(city.trim());
      setCity("");
    }
  }, [city, fetchCurrentWeather]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setLocation({ lat, lon, name: "current" });
          await fetchWeatherByCoordinates(lat, lon);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setLocation, fetchWeatherByCoordinates]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-sky-900">위치 선택</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="도시 이름을 입력하세요"
              className="w-full pl-10 pr-4 py-2.5 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200 bg-white/50"
              disabled={isLoading}
            />
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400"
              aria-hidden="true"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
            disabled={isLoading}
          >
            {isLoading ? "검색 중..." : "검색"}
          </button>
        </div>
        <button
          type="button"
          onClick={getCurrentLocation}
          className="w-full px-5 py-2.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          현재 위치 사용
        </button>
      </form>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};
