import React from "react";
import {
  SunIcon,
  CloudIcon,
  CloudIcon as CloudRainIcon,
  CloudIcon as CloudSnowIcon,
  BoltIcon,
  EyeIcon,
  FireIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export const getWeatherIcon = (weather: string): React.ReactElement => {
  const iconMap: Record<string, React.ReactElement> = {
    Clear: <SunIcon className="w-6 h-6" />,
    Clouds: <CloudIcon className="w-6 h-6" />,
    Rain: <CloudRainIcon className="w-6 h-6" />,
    Snow: <CloudSnowIcon className="w-6 h-6" />,
    Thunderstorm: <BoltIcon className="w-6 h-6" />,
    Drizzle: <CloudRainIcon className="w-6 h-6" />,
    Mist: <EyeIcon className="w-6 h-6" />,
    Smoke: <FireIcon className="w-6 h-6" />,
    Haze: <EyeIcon className="w-6 h-6" />,
    Dust: <EyeIcon className="w-6 h-6" />,
    Fog: <EyeIcon className="w-6 h-6" />,
    Sand: <EyeIcon className="w-6 h-6" />,
    Ash: <FireIcon className="w-6 h-6" />,
    Squall: <CloudIcon className="w-6 h-6" />,
    Tornado: <ExclamationCircleIcon className="w-6 h-6" />,
  };

  return iconMap[weather] || <ExclamationCircleIcon className="w-6 h-6" />;
};
