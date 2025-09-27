import { useEffect, useState } from "react";

function RiskSummaryCard() {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/forecast/Odisha")
      .then((res) => res.json())
      .then((data) => setForecast(data))
      .catch((err) => console.error("Error fetching risk summary:", err));
  }, []);

  if (!forecast) return <p>Loading risk summary...</p>;

  // Last predicted step as summary
  const lastStep = forecast.predicted_path[forecast.predicted_path.length - 1];

  return (
    <div className="p-4 bg-purple-100 dark:bg-purple-800 rounded-lg shadow text-center">
      <h3 className="text-lg font-bold">⚠️ Upcoming Cyclone Risk</h3>
      <p className="mt-2 font-semibold">{forecast.cyclone_name}</p>
      <p className="mt-1">Confidence: {(forecast.confidence * 100).toFixed(0)}%</p>
      <p className="mt-1">Predicted Risk: {lastStep.predicted_risk}</p>
    </div>
  );
}

export default RiskSummaryCard;

