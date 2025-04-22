"use client";

import { LocationPicker } from "@/components/LocationPicker";
import WeatherInfo from "@/components/WeatherInfo";
import { WeatherChart } from "@/components/WeatherChart";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-300 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">🌤️ 날씨 정보 앱</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽 컬럼 */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <LocationPicker />
            </div>
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <WeatherInfo />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <WeatherChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
