# Weather Application

한국 도시들의 날씨 정보를 제공하는 풀스택 웹 애플리케이션입니다. Next.js와 FastAPI를 사용하여 구현되었으며, OpenWeather API를 통해 실시간 날씨 데이터를 제공합니다.

## 주요 기능

- 🌍 한국 도시들의 실시간 날씨 정보 조회
- 🌡️ 온도, 습도, 체감 온도 등 상세 날씨 정보 제공
- 🗺️ 위도/경도 기반 날씨 검색
- 📅 5일간의 일기 예보
- 💨 대기질 정보 제공
- 🔄 자동 도시명 한영 변환 지원

## 기술 스택

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Zustand (상태 관리)

### Backend

- FastAPI (Python)
- python-dotenv
- requests

### API

- OpenWeather API

## 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- Python 3.8 이상
- OpenWeather API 키

### 환경 설정

1. 저장소 클론

```bash
git clone <repository-url>
cd weather-app
```

2. 프론트엔드 의존성 설치

```bash
npm install
```

3. 백엔드 의존성 설치

```bash
pip install -r requirements.txt
```

4. 환경 변수 설정

- 프로젝트 루트에 `.env` 파일 생성:

```
OPENWEATHER_API_KEY=your_api_key_here
```

- `.env.local` 파일 생성:

```
NEXT_PUBLIC_API_BASE_URL=/api
```

### 개발 서버 실행

1. 백엔드 서버 실행

```bash
cd src/api
uvicorn index:app --reload
```

2. 프론트엔드 개발 서버 실행

```bash
npm run dev
```

## API 엔드포인트

### 날씨 정보

- `GET /api/weather?city={city_name}` - 도시 이름으로 날씨 조회
- `GET /api/weather/coordinates?lat={latitude}&lon={longitude}` - 좌표로 날씨 조회
- `GET /api/weather/forecast?city={city_name}` - 도시의 5일 예보 조회
- `GET /api/weather/air-quality?lat={latitude}&lon={longitude}` - 대기질 정보 조회

## Vercel 배포

1. GitHub 저장소에 코드 푸시

2. Vercel에서 새 프로젝트 생성

   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `next build`
   - Install Command: `npm install && pip install -r requirements.txt`

3. 환경 변수 설정

   - `OPENWEATHER_API_KEY`: OpenWeather API 키
   - `NEXT_PUBLIC_API_BASE_URL`: `/api`

4. Deploy 버튼 클릭

## 프로젝트 구조

```
weather-app/
├── src/
│   ├── api/              # FastAPI 백엔드
│   │   └── index.py      # API 엔드포인트
│   ├── app/              # Next.js 프론트엔드
│   ├── components/       # React 컴포넌트
│   ├── store/           # Zustand 상태 관리
│   └── types/           # TypeScript 타입 정의
├── public/              # 정적 파일
├── .env                 # 백엔드 환경 변수
├── .env.local          # 프론트엔드 환경 변수
├── requirements.txt     # Python 의존성
├── package.json        # Node.js 의존성
└── vercel.json         # Vercel 배포 설정
```

## 라이선스

MIT License

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
