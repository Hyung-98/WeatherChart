from fastapi import FastAPI, Query, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv
from typing import Optional
import logging

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(root_path="/api")

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5"

# 한글 도시명을 영문으로 변환하는 매핑
CITY_NAME_MAPPING = {
    "서울": "Seoul",
    "부산": "Busan",
    "인천": "Incheon",
    "대구": "Daegu",
    "대전": "Daejeon",
    "광주": "Gwangju",
    "울산": "Ulsan",
    "수원": "Suwon",
    "고양": "Goyang",
    "용인": "Yongin",
    "창원": "Changwon",
    "성남": "Seongnam",
    "제주": "Jeju",
    "청주": "Cheongju",
    "천안": "Cheonan",
    "포항": "Pohang",
    "전주": "Jeonju",
    "안산": "Ansan",
    "안양": "Anyang",
    "평택": "Pyeongtaek",
    "김포": "Gimpo",
    "화성": "Hwaseong",
    "파주": "Paju",
    "시흥": "Siheung-si",
    "군포": "Gunpo",
    "의왕": "Uiwang",
    "구리": "Guri",
    "남양주": "Namyangju",
    "오산": "Osan",
    "하남": "Hanam",
    "이천": "Icheon-si",
    "안성": "Anseong",
    "김천": "Gimcheon",
    "경주": "Gyeongju",
    "거제": "Geoje",
    "양산": "Yangsan",
    "진주": "Jinju",
    "통영": "Tongyeong",
    "사천": "Sacheon",
    "밀양": "Miryang",
    "함안": "Haman",
    "창녕": "Changnyeong",
    "고성": "Goseong",
    "남해": "Namhae",
    "하동": "Hadong",
    "산청": "Sancheong",
    "함양": "Hamyang",
    "거창": "Geochang",
    "합천": "Hapcheon",
    "마산": "Masan",
    "진해": "Jinhae",
    "삼천포": "Samcheonpo",
    "밀양": "Miryang",
    "양산": "Yangsan",
    "김해": "Gimhae",
    "창원": "Changwon",
    "진주": "Jinju",
    "통영": "Tongyeong",
    "사천": "Sacheon",
    "밀양": "Miryang",
    "함안": "Haman",
    "창녕": "Changnyeong",
    "고성": "Goseong",
    "남해": "Namhae",
    "하동": "Hadong",
    "산청": "Sancheong",
    "함양": "Hamyang",
    "거창": "Geochang",
    "합천": "Hapcheon",
    "마산": "Masan",
    "진해": "Jinhae",
    "삼천포": "Samcheonpo",
}

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "🚀 FastAPI Weather MCP 서버가 정상적으로 실행 중입니다."
    }

@app.get("/weather")
async def get_weather(city: str = Query(default="Seoul")):
    logger.info(f"날씨 정보 요청: {city}")
    
    # 한글 도시명을 영문으로 변환
    city_name = CITY_NAME_MAPPING.get(city, city)
    logger.info(f"변환된 도시명: {city_name}")
    
    url = f"{BASE_URL}/weather?q={city_name}&appid={OPENWEATHER_API_KEY}&units=metric&lang=kr"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        logger.info(f"OpenWeather API 응답: {data}")

        result = {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "feels_like": data["main"]["feels_like"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "condition": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"],
            "sunrise": data.get("sys", {}).get("sunrise"),
            "sunset": data.get("sys", {}).get("sunset")
        }
        return JSONResponse(content=result)
    except requests.exceptions.HTTPError as e:
        logger.error(f"OpenWeather API 요청 실패: {str(e)}")
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="도시를 찾을 수 없습니다.")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"날씨 정보 요청 실패: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/weather/coordinates")
async def get_weather_by_coordinates(
    lat: float = Query(..., description="위도"),
    lon: float = Query(..., description="경도")
):
    logger.info(f"좌표 기반 날씨 정보 요청: lat={lat}, lon={lon}")
    url = f"{BASE_URL}/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric&lang=kr"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        logger.info(f"OpenWeather API 응답: {data}")

        result = {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "feels_like": data["main"]["feels_like"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "condition": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"],
            "sunrise": data.get("sys", {}).get("sunrise"),
            "sunset": data.get("sys", {}).get("sunset")
        }
        return JSONResponse(content=result)
    except Exception as e:
        logger.error(f"좌표 기반 날씨 정보 요청 실패: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/weather/forecast")
async def get_weather_forecast(
    city: Optional[str] = Query(None, description="도시 이름"),
    lat: Optional[float] = Query(None, description="위도"),
    lon: Optional[float] = Query(None, description="경도")
):
    logger.info(f"날씨 예보 요청: city={city}, lat={lat}, lon={lon}")
    try:
        if city:
            # 한글 도시명을 영문으로 변환
            city_name = CITY_NAME_MAPPING.get(city, city)
            url = f"{BASE_URL}/forecast?q={city_name}&appid={OPENWEATHER_API_KEY}&units=metric&lang=kr"
        elif lat is not None and lon is not None:
            url = f"{BASE_URL}/forecast?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric&lang=kr"
        else:
            raise HTTPException(status_code=400, detail="도시 이름 또는 위도/경도를 제공해야 합니다.")

        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        logger.info(f"OpenWeather API 예보 응답: {data}")

        forecast_data = []
        for item in data["list"]:
            forecast_data.append({
                "datetime": item["dt"],
                "temperature": item["main"]["temp"],
                "feels_like": item["main"]["feels_like"],
                "humidity": item["main"]["humidity"],
                "condition": item["weather"][0]["description"],
                "icon": item["weather"][0]["icon"],
                "wind_speed": item["wind"]["speed"]
            })

        result = {
            "city": data["city"]["name"],
            "country": data["city"]["country"],
            "forecast": forecast_data
        }
        return JSONResponse(content=result)
    except Exception as e:
        logger.error(f"날씨 예보 요청 실패: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/weather/air-quality")
async def get_air_quality(
    lat: float = Query(..., description="위도"),
    lon: float = Query(..., description="경도")
):
    logger.info(f"대기질 정보 요청: lat={lat}, lon={lon}")
    url = f"{BASE_URL}/air_pollution?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        logger.info(f"OpenWeather API 대기질 응답: {data}")

        # AQI (Air Quality Index) 설명
        aqi_descriptions = {
            1: "매우 좋음",
            2: "좋음",
            3: "보통",
            4: "나쁨",
            5: "매우 나쁨"
        }

        result = {
            "location": {
                "lat": lat,
                "lon": lon
            },
            "aqi": data["list"][0]["main"]["aqi"],
            "aqi_description": aqi_descriptions[data["list"][0]["main"]["aqi"]],
            "components": {
                "co": data["list"][0]["components"]["co"],
                "no2": data["list"][0]["components"]["no2"],
                "o3": data["list"][0]["components"]["o3"],
                "pm2_5": data["list"][0]["components"]["pm2_5"],
                "pm10": data["list"][0]["components"]["pm10"]
            }
        }
        return JSONResponse(content=result)
    except Exception as e:
        logger.error(f"대기질 정보 요청 실패: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))