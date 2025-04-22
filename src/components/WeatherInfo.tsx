import { useWeatherStore } from "@/store/weatherStore";
import { ForecastItem } from "@/types/weather";

export default function WeatherInfo() {
  const { currentWeather, forecast, airQuality, isLoading, error } = useWeatherStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 text-red-500 text-base">{error}</div>;
  }

  if (!currentWeather) {
    return <div className="text-center p-6 text-gray-500 text-base">도시를 검색하여 날씨 정보를 확인하세요.</div>;
  }

  // 하루 단위로 데이터 그룹화
  const getDailyForecasts = () => {
    if (!forecast?.forecast) return [];

    const dailyData = new Map<string, ForecastItem>();

    forecast.forecast.forEach((item) => {
      const date = new Date(item.datetime * 1000);
      const dateKey = date.toLocaleDateString("ko-KR");

      // 이미 해당 날짜의 데이터가 있다면 건너뛰기
      if (!dailyData.has(dateKey)) {
        dailyData.set(dateKey, item);
      }
    });

    return Array.from(dailyData.values()).slice(0, 3);
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div className="space-y-6 p-4">
      {/* Current Weather */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-bold text-sky-900">{currentWeather.city}</h2>
          <span className="text-base font-medium text-gray-600">
            {new Date().toLocaleDateString("ko-KR", { weekday: "long" })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-5xl font-bold text-sky-700">{currentWeather.temperature}°C</div>
            <div className="text-lg font-medium text-gray-600">{currentWeather.condition}</div>
          </div>
          <div className="text-right space-y-2">
            <div className="text-base text-gray-700">
              습도: <span className="font-bold">{currentWeather.humidity}%</span>
            </div>
            <div className="text-base text-gray-700">
              풍속: <span className="font-bold">{currentWeather.wind_speed} m/s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Air Quality */}
      {airQuality && (
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-xl font-bold text-sky-900">대기질</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sky-50 p-4 rounded-lg">
              <div className="text-base text-gray-600 font-medium">미세먼지 (PM10)</div>
              <div className="text-lg font-bold text-sky-700 mt-1">
                {airQuality.components.pm10} <span className="text-base">μg/m³</span>
              </div>
            </div>
            <div className="bg-sky-50 p-4 rounded-lg">
              <div className="text-base text-gray-600 font-medium">초미세먼지 (PM2.5)</div>
              <div className="text-lg font-bold text-sky-700 mt-1">
                {airQuality.components.pm2_5} <span className="text-base">μg/m³</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forecast */}
      {dailyForecasts.length > 0 && (
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-xl font-bold text-sky-900">일기 예보</h3>
          <div className="grid grid-cols-3 gap-4">
            {dailyForecasts.map((item: ForecastItem, index: number) => {
              const date = new Date(item.datetime * 1000);
              const dayName = date.toLocaleDateString("ko-KR", { weekday: "long" });
              const dayMonth = date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });

              return (
                <div key={index} className="bg-sky-50 p-4 rounded-lg text-center">
                  <div className="text-base font-bold text-gray-700">{dayName}</div>
                  <div className="text-base text-gray-600 mt-1">{dayMonth}</div>
                  <div className="text-2xl font-bold text-sky-700 mt-2">{Math.round(item.temperature)}°C</div>
                  <div className="text-base font-medium text-gray-600 mt-2">
                    <div className="font-bold">{item.condition}</div>
                    <div className="mt-1">
                      강수확률: <span className="font-bold">{item.pop}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
