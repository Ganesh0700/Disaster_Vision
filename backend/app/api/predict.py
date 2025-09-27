from fastapi import APIRouter
from pydantic import BaseModel
from app.core.ml_model import predict_risk

router = APIRouter()

class CycloneInput(BaseModel):
    windspeed: float
    pressure: float

@router.post("/predict")
def get_prediction(data: CycloneInput):
    risk = predict_risk(data.windspeed, data.pressure)
    return {"windspeed": data.windspeed, "pressure": data.pressure, "predicted_risk": risk}
