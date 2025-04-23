# Weather App

실시간 날씨 정보를 제공하는 Next.js 기반의 웹 애플리케이션입니다. 이 앱은 OpenWeatherMap API를 사용하여 전 세계 도시의 날씨 정보를 시각적으로 표시합니다.

## 주요 기능

- 실시간 날씨 정보 조회
- 도시 검색 기능
- 시간대별 날씨 차트 표시
- 반응형 디자인
- 다크 모드 지원

## 기술 스택

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: SCSS + Tailwind CSS
- **상태 관리**: Zustand
- **아이콘**: Heroicons
- **차트**: Recharts

## 설치 방법

1. 저장소 클론

```bash
git clone [repository-url]
cd weather-app
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

```bash
# .env.local 파일 생성
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

4. 개발 서버 실행

```bash
npm run dev
```

## 프로젝트 구조

```
weather-app/
├── src/
│   ├── app/
│   │   ├── globals.scss
│   │   └── page.tsx
│   ├── components/
│   │   ├── SearchInput.tsx
│   │   ├── WeatherChart.tsx
│   │   ├── WeatherDetails.tsx
│   │   └── WeatherDisplay.tsx
│   ├── store/
│   │   └── weatherStore.ts
│   ├── types/
│   │   └── weather.ts
│   └── utils/
│       └── weatherIcons.tsx
├── public/
├── postcss.config.js
├── tailwind.config.ts
└── package.json
```

## 스타일링

이 프로젝트는 SCSS와 Tailwind CSS를 함께 사용합니다:

- `globals.scss`: 전역 스타일 및 커스텀 스타일 정의
- Tailwind CSS: 유틸리티 클래스 기반의 스타일링
- PostCSS: SCSS와 Tailwind의 통합을 위한 설정

## 날씨 아이콘

날씨 상태에 따른 아이콘은 Heroicons를 사용하여 구현되었으며, `weatherIcons.tsx`에서 관리됩니다. 다음과 같은 날씨 상태를 지원합니다:

- Clear (맑음)
- Clouds (구름)
- Rain (비)
- Snow (눈)
- Thunderstorm (천둥번개)
- 기타 기상 조건
