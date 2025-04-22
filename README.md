# Weather Chart App

날씨 정보를 실시간으로 확인할 수 있는 웹 애플리케이션입니다. 도시 검색을 통해 현재 날씨, 일기 예보, 대기질 정보를 한눈에 확인할 수 있습니다.

## 주요 기능

- **실시간 날씨 정보**: 선택한 도시의 현재 기온, 날씨 상태, 습도, 풍속 등을 확인할 수 있습니다.
- **대기질 정보**: 미세먼지(PM10)와 초미세먼지(PM2.5) 농도를 실시간으로 확인할 수 있습니다.
- **3일 예보**: 앞으로 3일간의 날씨 예보를 확인할 수 있습니다. 각 날짜별 기온, 날씨 상태, 강수확률을 제공합니다.
- **반응형 디자인**: PC와 모바일 환경 모두에서 최적화된 화면을 제공합니다.

## 기술 스택

- **Frontend**: React, TypeScript
- **상태 관리**: Zustand
- **스타일링**: Tailwind CSS
- **날씨 데이터**: OpenWeatherMap API
- **대기질 데이터**: OpenWeatherMap Air Pollution API

## 설치 및 실행

1. 프로젝트 클론

```bash
git clone [repository-url]
cd weather-chart
```

2. 환경 변수 설정

```bash
# .env 파일 생성
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

3. 의존성 설치

```bash
npm install
```

4. 개발 서버 실행

```bash
npm run dev
```

5. 빌드

```bash
npm run build
```

## 환경 변수

- `VITE_OPENWEATHER_API_KEY`: OpenWeatherMap API 키 (필수)

## 프로젝트 구조

```
weather-chart/
├── src/
│   ├── components/        # React 컴포넌트
│   ├── store/            # Zustand 상태 관리
│   ├── types/            # TypeScript 타입 정의
│   ├── utils/            # 유틸리티 함수
│   └── App.tsx           # 메인 애플리케이션 컴포넌트
├── public/               # 정적 파일
└── package.json          # 프로젝트 설정 및 의존성
```

## 컴포넌트 구조

- **WeatherInfo**: 날씨 정보를 표시하는 메인 컴포넌트
  - 현재 날씨 정보 표시
  - 대기질 정보 표시
  - 3일 예보 표시

## API 응답 타입

```typescript
// 날씨 정보 타입
interface WeatherInfo {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind_speed: number;
}

// 예보 아이템 타입
interface ForecastItem {
  datetime: number;
  temperature: number;
  condition: string;
  pop: number; // 강수확률
}

// 대기질 정보 타입
interface AirQuality {
  components: {
    pm10: number;
    pm2_5: number;
  };
}
```

## 라이선스

MIT License

## 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
