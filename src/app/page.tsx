"use client";

import React, { useEffect } from "react";
import WeatherDisplay from "@/components/WeatherDisplay";
import WeatherLayout from "@/components/WeatherLayout";
import { useWeatherStore } from "@/store/weatherStore";

export default function Home() {
  const { currentWeather, isLoading, error, fetchCurrentWeather } = useWeatherStore();

  useEffect(() => {
    // 초기 날씨 데이터 가져오기 (서울을 기본값으로 설정)
    fetchCurrentWeather("Seoul");
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center mt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="text-center">
              <p className="text-xl font-semibold text-red-500 mb-2">오류가 발생했습니다</p>
              <p className="text-gray-600 mb-4">{error || "날씨 정보를 찾을 수 없습니다."}</p>
              <p className="text-gray-500">다른 도시를 검색해보세요.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 추가 날씨 카드 데이터 생성
  const additionalCards = [
    {
      ...currentWeather,
      title: "오후",
      temperature: currentWeather.temperature + 2,
      condition: "Sunny",
    },
    {
      ...currentWeather,
      title: "저녁",
      temperature: currentWeather.temperature + 1,
      condition: "Cloudy",
    },
    {
      ...currentWeather,
      title: "밤",
      temperature: currentWeather.temperature - 1,
      condition: "Rain",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200">
      <div className="w-full h-screen">
        <div className="h-full max-w-7xl mx-auto">
          <WeatherDisplay weatherData={currentWeather} />
        </div>
      </div>
    </main>
  );
}
