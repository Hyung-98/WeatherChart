"use client";

import React, { useState, useEffect } from "react";
import { XMarkIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
// import { useWeatherStore } from "@/store/weatherStore";
import { WeatherData } from "@/types/weather";

interface SearchMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWeather: (weather: WeatherData) => void;
}

interface SearchHistory {
  city: string;
  timestamp: number;
}

const SearchMenu: React.FC<SearchMenuProps> = ({ isOpen, onClose, onAddWeather }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [searchResult, setSearchResult] = useState<WeatherData | null>(null);
  // const { fetchWeather } = useWeatherStore();

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const saveToHistory = (city: string) => {
    const newHistory = [{ city, timestamp: Date.now() }, ...searchHistory.filter((item) => item.city !== city)].slice(
      0,
      10
    );
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const handleSearch = async (city: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) throw new Error("날씨 정보를 가져오는데 실패했습니다");
      const data = await response.json();
      setSearchResult(data);
      saveToHistory(city);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm.trim());
    }
  };

  const handleAddToMain = () => {
    if (searchResult) {
      onAddWeather(searchResult);
      setSearchResult(null);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">날씨 검색</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="도시 이름을 입력하세요"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {searchResult && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{searchResult.city}</h3>
                <button
                  onClick={handleAddToMain}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="text-2xl font-semibold mb-1">{Math.round(searchResult.temperature)}°</div>
              <div className="text-gray-600">{searchResult.condition}</div>
            </div>
          )}

          <h3 className="text-sm font-medium text-gray-500 mb-2">최근 검색</h3>
          <div className="space-y-2">
            {searchHistory.map((item) => (
              <button
                key={item.timestamp}
                onClick={() => handleSearch(item.city)}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {item.city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
