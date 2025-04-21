export const getWeatherDescription = (weather: string): string => {
  const descriptionMap: { [key: string]: string } = {
    Clear: "맑은 날씨",
    Clouds: "흐린 날씨",
    Rain: "비가 오는 날씨",
    Snow: "눈이 오는 날씨",
    Thunderstorm: "천둥번개가 치는 날씨",
    Drizzle: "이슬비가 내리는 날씨",
    Mist: "안개가 낀 날씨",
    Smoke: "연기가 낀 날씨",
    Haze: "안개가 낀 날씨",
    Dust: "먼지가 많은 날씨",
    Fog: "안개가 낀 날씨",
    Sand: "모래바람이 부는 날씨",
    Ash: "재가 날리는 날씨",
    Squall: "돌풍이 부는 날씨",
    Tornado: "토네이도가 발생한 날씨",
  };

  return descriptionMap[weather] || "날씨 정보 없음";
};
