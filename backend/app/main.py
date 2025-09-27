from fastapi import FastAPI
from app.api import predict, forecast, chatbot
from fastapi.middleware.cors import CORSMiddleware
from app.api import predict, forecast   # ✅ import forecast

app = FastAPI(title="Cyclone Dashboard API 🚀")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(predict.router, prefix="/api", tags=["Prediction"])
app.include_router(forecast.router, prefix="/api", tags=["Forecast"])  # ✅ added
app.include_router(chatbot.router, prefix="/api", tags=["Chatbot"])

@app.get("/")
def root():
    return {"message": "Cyclone Dashboard Backend is running 🚀"}

@app.get("/forecast/{region}")
def get_forecast(region: str):
    return {
        "region": region,
        "cyclone_name": "Cyclone Fani",
        "confidence": 0.85,
        "predicted_path": [
            {"timestamp": "2023-09-26T00:00:00Z", "windspeed": 120, "pressure": 980},
            {"timestamp": "2023-09-27T00:00:00Z", "windspeed": 135, "pressure": 975},
            {"timestamp": "2023-09-28T00:00:00Z", "windspeed": 150, "pressure": 970},
        ],
    }


@app.get("/api/safety")
def safety_tips():
    return {
        "tips": [
            "Stay indoors during cyclone 🚪",
            "Keep an emergency kit ready 🧰",
            "Charge your phone and powerbank 🔋",
            "Follow government alerts 📢"
        ]
    }

