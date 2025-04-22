"use client";

import { useWeatherStore } from "../store/weatherStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const WeatherChart = () => {
  const { forecast, isLoading } = useWeatherStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!forecast?.forecast?.length) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-sky-900">날씨 변화 그래프</h3>
        <div className="text-center p-4 text-gray-500">날씨 데이터를 불러와주세요.</div>
      </div>
    );
  }

  // 6시간 간격으로 데이터 필터링 (더 간략하게)
  const filteredData = forecast.forecast.filter((_, index) => index % 4 === 0);

  const formatData = filteredData.map((item) => {
    const date = new Date(item.datetime * 1000);
    const time = date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      hour12: true,
    });
    const day = date.toLocaleDateString("ko-KR", {
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });

    return {
      time: `${day} ${time}`,
      temperature: Math.round(item.temperature),
      humidity: Math.round(item.humidity),
    };
  });

  return (
    <div className="p-4">
      <div className="border-b pb-3">
        <h3 className="text-lg font-semibold text-sky-900">날씨 변화 그래프</h3>
      </div>

      <div className="h-[280px] w-full bg-white/50 rounded-lg p-3 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatData} margin={{ top: 15, right: 30, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: "#0369a1" }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
              stroke="#0369a1"
            />
            <YAxis
              yAxisId="left"
              label={{
                value: "°C",
                position: "insideLeft",
                fill: "#ea580c",
                style: { textAnchor: "middle" },
              }}
              tick={{ fontSize: 11, fill: "#ea580c" }}
              stroke="#ea580c"
              width={25}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "%",
                position: "insideRight",
                fill: "#0369a1",
                style: { textAnchor: "middle" },
              }}
              tick={{ fontSize: 11, fill: "#0369a1" }}
              stroke="#0369a1"
              width={25}
            />
            <Tooltip
              formatter={(value, name) => [
                `${value}${name === "온도" ? "°C" : "%"}`,
                name === "온도" ? "온도" : "습도",
              ]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "0.875rem",
              }}
            />
            <Legend
              verticalAlign="top"
              height={30}
              wrapperStyle={{
                paddingTop: "5px",
                fontSize: "0.875rem",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#ea580c"
              name="온도"
              dot={{ r: 3, fill: "#ea580c", strokeWidth: 1 }}
              activeDot={{ r: 6, fill: "#ea580c" }}
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#0369a1"
              name="습도"
              dot={{ r: 3, fill: "#0369a1", strokeWidth: 1 }}
              activeDot={{ r: 6, fill: "#0369a1" }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
