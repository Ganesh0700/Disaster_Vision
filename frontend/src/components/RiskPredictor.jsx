import { useState } from "react";

function RiskPredictor() {
  const [windspeed, setWindspeed] = useState("");
  const [pressure, setPressure] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!windspeed || !pressure) {
      alert("Please enter both windspeed and pressure!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ windspeed: parseFloat(windspeed), pressure: parseFloat(pressure) }),
      });

      const data = await res.json();
      setPrediction(data.predicted_risk);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setPrediction("Error: Unable to fetch prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-green-100 dark:bg-green-800 rounded-lg shadow text-center">
      <h3 className="text-lg font-bold">🤖 Cyclone Risk Predictor</h3>

      <div className="mt-3 space-y-2">
        <input
          type="number"
          placeholder="Enter Windspeed (km/h)"
          value={windspeed}
          onChange={(e) => setWindspeed(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none text-black"
        />
        <input
          type="number"
          placeholder="Enter Pressure (hPa)"
          value={pressure}
          onChange={(e) => setPressure(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none text-black"
        />
        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Risk"}
        </button>
      </div>

      {prediction && (
        <p className="mt-3 text-lg font-semibold">
          Predicted Risk:{" "}
          <span
            className={
              prediction === "High"
                ? "text-red-600"
                : prediction === "Medium"
                ? "text-yellow-600"
                : "text-green-600"
            }
          >
            {prediction}
          </span>
        </p>
      )}
    </div>
  );
}

export default RiskPredictor;
