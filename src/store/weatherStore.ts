import { create } from "zustand";
import { WeatherData, Location, ForecastData, AirQualityData } from "../types/weather";

// 영문-한글 도시명 매핑
const CITY_NAME_MAPPING: { [key: string]: string } = {
  // 특별시/광역시
  Seoul: "서울",
  Busan: "부산",
  Incheon: "인천",
  Daegu: "대구",
  Daejeon: "대전",
  Gwangju: "광주",
  Ulsan: "울산",
  Sejong: "세종",

  // 경기도
  Suwon: "수원",
  Seongnam: "성남",
  Goyang: "고양",
  Yongin: "용인",
  Bucheon: "부천",
  Ansan: "안산",
  Anyang: "안양",
  Namyangju: "남양주",
  Hwaseong: "화성",
  Pyeongtaek: "평택",
  Uijeongbu: "의정부",
  Siheung: "시흥",
  Paju: "파주",
  Gimpo: "김포",
  "Gwangju-si": "광주", // 경기도 광주
  Gwangmyeong: "광명",
  Gunpo: "군포",
  Hanam: "하남",
  Osan: "오산",
  Icheon: "이천",
  Guri: "구리",
  Uiwang: "의왕",
  Anseong: "안성",
  Pocheon: "포천",
  Dongducheon: "동두천",
  Yangju: "양주",
  Gwacheon: "과천",
  Yeoju: "여주",

  // 강원도
  Chuncheon: "춘천",
  Wonju: "원주",
  Gangneung: "강릉",
  Donghae: "동해",
  Taebaek: "태백",
  Sokcho: "속초",
  Samcheok: "삼척",

  // 충청북도
  Cheongju: "청주",
  Chungju: "충주",
  Jecheon: "제천",

  // 충청남도
  Cheonan: "천안",
  Gongju: "공주",
  Boryeong: "보령",
  Asan: "아산",
  Seosan: "서산",
  Nonsan: "논산",
  Gyeryong: "계룡",
  Dangjin: "당진",

  // 전라북도
  Jeonju: "전주",
  Gunsan: "군산",
  Iksan: "익산",
  Jeongeup: "정읍",
  Namwon: "남원",
  Gimje: "김제",

  // 전라남도
  Mokpo: "목포",
  Yeosu: "여수",
  Suncheon: "순천",
  Naju: "나주",
  Gwangyang: "광양",

  // 경상북도
  Pohang: "포항",
  Gyeongju: "경주",
  Gimcheon: "김천",
  Andong: "안동",
  Gumi: "구미",
  Yeongju: "영주",
  Yeongcheon: "영천",
  Sangju: "상주",
  Mungyeong: "문경",

  // 경상남도
  Changwon: "창원",
  Jinju: "진주",
  Tongyeong: "통영",
  Sacheon: "사천",
  Gimhae: "김해",
  Miryang: "밀양",
  Geoje: "거제",
  Yangsan: "양산",

  // 제주특별자치도
  Jeju: "제주",
  Seogwipo: "서귀포",

  // 주요 지역/구
  "Gangnam-gu": "강남구",
  "Gangdong-gu": "강동구",
  "Gangbuk-gu": "강북구",
  "Gangseo-gu": "강서구",
  "Gwanak-gu": "관악구",
  "Gwangjin-gu": "광진구",
  "Guro-gu": "구로구",
  "Geumcheon-gu": "금천구",
  "Nowon-gu": "노원구",
  "Dobong-gu": "도봉구",
  "Dongdaemun-gu": "동대문구",
  "Dongjak-gu": "동작구",
  "Mapo-gu": "마포구",
  "Seodaemun-gu": "서대문구",
  "Seocho-gu": "서초구",
  "Seongdong-gu": "성동구",
  "Seongbuk-gu": "성북구",
  "Songpa-gu": "송파구",
  "Yangcheon-gu": "양천구",
  "Yeongdeungpo-gu": "영등포구",
  "Yongsan-gu": "용산구",
  "Eunpyeong-gu": "은평구",
  "Jongno-gu": "종로구",
  "Jung-gu": "중구",
  "Jungnang-gu": "중랑구",
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
  fetchWeather: (city: string) => Promise<void>;
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

  fetchWeather: async (city: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);

      if (!response.ok) {
        throw new Error("날씨 정보를 가져오는데 실패했습니다");
      }

      const data = await response.json();

      // Convert city name to Korean if mapping exists
      const koreanCityName = CITY_NAME_MAPPING[data.city] || data.city;

      set({
        currentWeather: {
          ...data,
          city: koreanCityName,
          timestamp: Date.now(),
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다",
        isLoading: false,
      });
    }
  },
}));
