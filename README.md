# 🌪️ Cyclone Disaster Prediction Dashboard

A full-stack web application to **predict, monitor, and visualize cyclone risks** in India.  
This project integrates **ML risk prediction**, **real-time weather data**, and an **interactive map** with cyclone path simulation.  
It also includes an **AI-powered chatbot** for disaster FAQs and safety guidance.

---

## 🚀 Features
- ✅ **Frontend (React + Tailwind CSS)**
  - Modern dashboard UI with KPI cards
  - Interactive **Leaflet map** with cyclone path animation
  - Weather widget (live data from OpenWeather API)
  - Risk prediction and safety alerts
  - AI-powered **Chatbot (LLaMA / HuggingFace / OpenAI)**

- ✅ **Backend (FastAPI + Python)**
  - ML Model trained on cyclone dataset (`scikit-learn`, `joblib`)
  - REST APIs:
    - `/api/predict` → Predict cyclone risk from windspeed + pressure
    - `/api/forecast/{region}` → Cyclone forecast data
    - `/api/chatbot` → AI chatbot endpoint
  - MongoDB integration for storing alerts

---

## 🛠️ Tech Stack

**Frontend**
- React (CRA)
- Tailwind CSS
- React Router
- React-Leaflet (Map)

**Backend**
- FastAPI
- Uvicorn
- Scikit-learn
- Joblib
- Pandas
- MongoDB (via `motor` or `pymongo`)

**AI / ML**
- Cyclone Risk Prediction Model (`RandomForestClassifier`)
- Chatbot: Configurable with **OpenAI GPT / HuggingFace API / Ollama (local LLaMA)**

---

## ⚡ Installation Guide

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/cyclone-dashboard.git
cd cyclone-dashboard
2️⃣ Backend Setup
bash
Copy code
cd backend
python -m venv venv
venv\Scripts\activate   # (Windows)
# source venv/bin/activate  # (Linux/Mac)

pip install -r requirements.txt

# Run FastAPI server
python -m uvicorn app.main:app --reload
👉 Backend will run at: http://127.0.0.1:8000

3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
👉 Frontend will run at: http://localhost:3000

🔑 API Routes
GET / → Health check

POST /api/predict → Cyclone risk prediction

GET /api/forecast/{region} → Forecast for a region

POST /api/chatbot → AI chatbot reply

🤖 AI Chatbot Setup
Option A: OpenAI (Paid after free credits)
Get API Key → https://platform.openai.com/

Add key in chatbot.py

python
Copy code
openai.api_key = "YOUR_API_KEY"
Option B: HuggingFace (Free)
Create account → https://huggingface.co/join

Generate token in Settings → Access Tokens

Use API URL in backend

Option C: Ollama (Free + Offline)
Install Ollama → https://ollama.ai

Run model locally

bash
Copy code
ollama run llama2
Call http://localhost:11434/api/generate in chatbot API
