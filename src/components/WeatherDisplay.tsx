"use client";

import React, { useEffect, useState } from "react";
import { WeatherData } from "@/types/weather";
import { useWeatherStore } from "../store/weatherStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Bars3Icon, EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchMenu from "./SearchMenu";
import "swiper/css";
import "swiper/css/pagination";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  className?: string;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  const getIcon = () => {
    switch (condition) {
      case "Clear":
        return (
          <svg className="weather-icon" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        );
      case "Clouds":
        return (
          <svg className="weather-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        );
      case "Rain":
      case "Drizzle":
        return (
          <svg className="weather-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 16.2A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
            <path d="M8 19v2M8 13v2M16 19v2M16 13v2M12 21v2M12 15v2" strokeWidth="2" />
          </svg>
        );
      case "Snow":
        return (
          <svg className="weather-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
            <path d="M8 16h.01M8 20h.01M12 18h.01M12 22h.01M16 16h.01M16 20h.01" />
          </svg>
        );
      default:
        return null;
    }
  };

  return getIcon();
};

const Stars = () => {
  const [stars, setStars] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
      },
    }));
    setStars(newStars);
  }, []);

  return (
    <>
      {stars.map((star) => (
        <div key={star.id} className="star" style={star.style} />
      ))}
    </>
  );
};

const ForecastDay = ({
  day,
  temp,
  condition,
}: {
  day: string;
  temp: { min: number; max: number };
  condition: string;
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-base opacity-60">{day}</span>
      <div className="flex items-center gap-4">
        <WeatherIcon condition={condition} />
        <div className="flex gap-2">
          <span className="text-base font-medium text-blue-500">{temp.min}°</span>
          <span className="text-base font-medium">{temp.max}°</span>
        </div>
      </div>
    </div>
  );
};

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cityName: string;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({ isOpen, onClose, onConfirm, cityName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-sm mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">날씨 정보 삭제</h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-600">
            <span className="font-medium text-gray-900">{cityName}</span>의 날씨 정보를 삭제하시겠습니까?
          </p>
        </div>
        <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors duration-200"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

const getTimeBasedTextColor = (timeOfDay: "dawn" | "morning" | "evening" | "night") => {
  return `text-time-${timeOfDay}`;
};

const EmptyState = ({ timeOfDay }: { timeOfDay: "dawn" | "morning" | "evening" | "night" }) => {
  const textColorClass = getTimeBasedTextColor(timeOfDay);

  return (
    <div className={`text-center ${textColorClass} fade-up`}>
      <p className="text-2xl font-medium">어느 지역의 날씨가 궁금하신가요?</p>
    </div>
  );
};

const SearchButton = ({
  onClick,
  highlight,
  timeOfDay,
}: {
  onClick: () => void;
  highlight: boolean;
  timeOfDay: "dawn" | "morning" | "evening" | "night";
}) => {
  const iconColorClass = getTimeBasedTextColor(timeOfDay);
  const highlightClass = highlight ? "search-button-highlight" : "";
  console.log(iconColorClass);
  return (
    <button
      onClick={onClick}
      className={`absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full z-20 search-button ${iconColorClass} ${highlightClass}`}
    >
      <div className="button-glow rounded-full">
        <Bars3Icon className="w-6 h-6" />
      </div>
    </button>
  );
};

const WeatherCard = ({
  weather,
  onDelete,
  timeOfDay,
}: {
  weather: WeatherData;
  onDelete: () => void;
  timeOfDay: "dawn" | "morning" | "evening" | "night";
}) => {
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const textColorClass = getTimeBasedTextColor(timeOfDay);

  const generateForecast = (baseTemp: number) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const today = new Date().getDay();

    interface ForecastItem {
      day: string;
      temp: {
        min: number;
        max: number;
      };
      condition: string;
    }

    return days
      .slice(today + 1)
      .concat(days.slice(0, today + 1))
      .slice(0, 7)
      .map(
        (day): ForecastItem => ({
          day,
          temp: {
            min: Math.round(baseTemp + (Math.random() - 0.8) * 5),
            max: Math.round(baseTemp + (Math.random() + 0.3) * 5),
          },
          condition: weather.condition,
        })
      );
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = () => {
    setShowDeleteMenu(false);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteAlert(false);
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setShowDeleteMenu(!showDeleteMenu)}
          className={`p-2 hover:bg-black/5 rounded-full transition-all duration-200 ${textColorClass}`}
        >
          <EllipsisVerticalIcon className="w-6 h-6" />
        </button>

        <div
          className={`
            absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden
            transition-all duration-200 origin-top-right
            ${showDeleteMenu ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
          `}
        >
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
          >
            삭제
          </button>
        </div>
      </div>

      <DeleteAlert
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={handleConfirmDelete}
        cityName={weather.city}
      />

      <div className={`weather-content flex-1 ${textColorClass}`}>
        <div className="location-text">{weather.city}</div>
        <div>
          <div className="current-temp">{Math.round(weather.temperature)}°</div>
          <div className="current-condition">{weather.condition}</div>
          <div className="text-lg mt-2 opacity-80">{currentTime}</div>
        </div>
      </div>

      <div className={`weather-forecast mt-auto px-8 pb-8 ${textColorClass}`}>
        {generateForecast(weather.temperature).map((forecast) => (
          <ForecastDay key={forecast.day} day={forecast.day} temp={forecast.temp} condition={forecast.condition} />
        ))}
      </div>
    </div>
  );
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = () => {
  const { currentWeather, isLoading, error } = useWeatherStore();
  const [timeOfDay, setTimeOfDay] = useState<"dawn" | "morning" | "evening" | "night">("morning");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savedWeathers, setSavedWeathers] = useState<WeatherData[]>([]);

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 9) setTimeOfDay("dawn");
      else if (hour >= 9 && hour < 16) setTimeOfDay("morning");
      else if (hour >= 16 && hour < 20) setTimeOfDay("evening");
      else setTimeOfDay("night");
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedWeathers");
    if (saved) {
      setSavedWeathers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (currentWeather && !savedWeathers.find((w) => w.city === currentWeather.city)) {
      const newSavedWeathers = [currentWeather, ...savedWeathers];
      setSavedWeathers(newSavedWeathers);
      localStorage.setItem("savedWeathers", JSON.stringify(newSavedWeathers));
    }
  }, [currentWeather]);

  const handleDeleteWeather = (cityToDelete: string) => {
    const newSavedWeathers = savedWeathers.filter((w) => w.city !== cityToDelete);
    setSavedWeathers(newSavedWeathers);
    localStorage.setItem("savedWeathers", JSON.stringify(newSavedWeathers));
  };

  const handleAddWeather = (weather: WeatherData) => {
    if (!savedWeathers.find((w) => w.city === weather.city)) {
      const newSavedWeathers = [...savedWeathers, weather];
      setSavedWeathers(newSavedWeathers);
      localStorage.setItem("savedWeathers", JSON.stringify(newSavedWeathers));
    }
  };

  if (isLoading) {
    return (
      <div className={`weather-container weather-${timeOfDay} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`weather-container weather-${timeOfDay} flex items-center justify-center`}>
        <div className="text-center text-white p-4">
          <p className="text-lg font-semibold">오류가 발생했습니다</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className={`weather-container weather-${timeOfDay} flex items-center justify-center`}>
        <div className="text-center text-white p-4">
          <p className="text-lg">위치를 선택해주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`weather-container weather-${timeOfDay}`}>
      <SearchButton onClick={() => setIsMenuOpen(true)} highlight={savedWeathers.length === 0} timeOfDay={timeOfDay} />

      <SearchMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onAddWeather={handleAddWeather} />

      <div className={`semicircle semicircle-${timeOfDay}`} />
      {timeOfDay === "night" && <Stars />}

      {savedWeathers.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <EmptyState timeOfDay={timeOfDay} />
        </div>
      ) : (
        <Swiper
          className="h-full"
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
        >
          {savedWeathers.map((weather) => (
            <SwiperSlide key={weather.city} className="h-full">
              <WeatherCard weather={weather} onDelete={() => handleDeleteWeather(weather.city)} timeOfDay={timeOfDay} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default WeatherDisplay;
