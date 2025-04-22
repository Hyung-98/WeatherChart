import { create } from "zustand";
import { WeatherData, Location, ForecastData, AirQualityData } from "../types/weather";

// 영문 도시명을 한글로 변환하는 매핑
const CITY_NAME_MAPPING: { [key: string]: string } = {
  Seoul: "서울",
  Busan: "부산",
  Incheon: "인천",
  Daegu: "대구",
  Daejeon: "대전",
  Gwangju: "광주",
  Ulsan: "울산",
  Suwon: "수원",
  Goyang: "고양",
  Yongin: "용인",
  Changwon: "창원",
  Seongnam: "성남",
  Jeju: "제주",
  Cheongju: "청주",
  Cheonan: "천안",
  Pohang: "포항",
  Jeonju: "전주",
  Ansan: "안산",
  Anyang: "안양",
  Pyeongtaek: "평택",
  Gimpo: "김포",
  Hwaseong: "화성",
  Paju: "파주",
  "Siheung-si": "시흥",
  Gunpo: "군포",
  Uiwang: "의왕",
  Guri: "구리",
  Namyangju: "남양주",
  Osan: "오산",
  Hanam: "하남",
  "Icheon-si": "이천",
  Anseong: "안성",
  Gimcheon: "김천",
  Gyeongju: "경주",
  Geoje: "거제",
  Yangsan: "양산",
  Jinju: "진주",
  Tongyeong: "통영",
  Sacheon: "사천",
  Miryang: "밀양",
  Haman: "함안",
  Changnyeong: "창녕",
  Goseong: "고성",
  Namhae: "남해",
  Hadong: "하동",
  Sancheong: "산청",
  Hamyang: "함양",
  Geochang: "거창",
  Hapcheon: "합천",
  Masan: "마산",
  Jinhae: "진해",
  Samcheonpo: "삼천포",
  Gimhae: "김해",
};

interface WeatherStore {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  airQuality: AirQualityData | null;
  location: Location | null;
  isLoading: boolean;
  error: string | null;

  setLocation: (location: Location) => void;
  fetchCurrentWeather: (city?: string) => Promise<void>;
  fetchWeatherByCoordinates: (lat: number, lon: number) => Promise<void>;
  fetchForecast: (city?: string, lat?: number, lon?: number) => Promise<void>;
  fetchAirQuality: (lat: number, lon: number) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const useWeatherStore = create<WeatherStore>((set) => ({
  currentWeather: null,
  forecast: null,
  airQuality: null,
  location: null,
  isLoading: false,
  error: null,

  setLocation: (location) => set({ location }),

  fetchCurrentWeather: async (city) => {
    set({ isLoading: true, error: null });
    try {
      const url = city ? `${API_BASE_URL}/weather?city=${encodeURIComponent(city)}` : `${API_BASE_URL}/weather`;

      console.log("Fetching weather data from:", url);
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "날씨 정보를 가져오는데 실패했습니다.");
      }

      const data = await response.json();
      console.log("Weather data received:", data);

      // 도시 이름을 한글로 변환
      const koreanCityName = CITY_NAME_MAPPING[data.city] || data.city;
      const weatherData = {
        ...data,
        city: koreanCityName,
      };

      set({ currentWeather: weatherData, isLoading: false });

      // 현재 날씨를 가져온 후 예보 데이터와 대기질 정보도 가져옵니다
      if (city) {
        useWeatherStore.getState().fetchForecast(city);
        // 대기질 정보를 가져오기 위해 좌표가 필요하므로 날씨 데이터에서 좌표를 사용
        if (data.coord) {
          useWeatherStore.getState().fetchAirQuality(data.coord.lat, data.coord.lon);
        }
      } else if (data.location) {
        useWeatherStore.getState().fetchForecast(undefined, data.location.lat, data.location.lon);
        useWeatherStore.getState().fetchAirQuality(data.location.lat, data.location.lon);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchWeatherByCoordinates: async (lat, lon) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/weather/coordinates?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error("위치 기반 날씨 정보를 가져오는데 실패했습니다.");
      const data = await response.json();

      // 도시 이름을 한글로 변환
      const koreanCityName = CITY_NAME_MAPPING[data.city] || data.city;
      const weatherData = {
        ...data,
        city: koreanCityName,
      };

      set({ currentWeather: weatherData, isLoading: false });

      // 날씨 정보를 가져온 후 대기질 정보도 가져옵니다
      useWeatherStore.getState().fetchAirQuality(lat, lon);
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchForecast: async (city?: string, lat?: number, lon?: number) => {
    set({ isLoading: true, error: null });
    try {
      let url = `${API_BASE_URL}/weather/forecast`;

      if (city) {
        url += `?city=${encodeURIComponent(city)}`;
      } else if (lat && lon) {
        url += `?lat=${lat}&lon=${lon}`;
      } else {
        throw new Error("도시나 위치 정보가 필요합니다.");
      }

      console.log("Fetching forecast from:", url);
      const response = await fetch(url);
      if (!response.ok) throw new Error("예보 정보를 가져오는데 실패했습니다.");

      const data = await response.json();
      console.log("Forecast data received:", data);

      // 도시 이름을 한글로 변환
      const koreanCityName = CITY_NAME_MAPPING[data.city] || data.city;
      const forecastData = {
        ...data,
        city: koreanCityName,
      };

      set({ forecast: forecastData, isLoading: false });
    } catch (error) {
      console.error("Error fetching forecast:", error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchAirQuality: async (lat, lon) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/weather/air-quality?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error("대기질 정보를 가져오는데 실패했습니다.");
      const data = await response.json();
      set({ airQuality: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
