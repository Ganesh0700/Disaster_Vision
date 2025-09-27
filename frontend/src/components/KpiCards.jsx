import { useEffect, useState } from "react";

function KpiCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/forecast/Odisha")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error("Error fetching KPI data:", err));
  }, []);

  if (!data) return <p className="p-4">Loading KPIs...</p>;

  // ✅ Calculate average windspeed
  const avgWind =
    data.predicted_path.reduce((sum, step) => sum + step.windspeed, 0) /
    data.predicted_path.length;

  // ✅ Count high risk points
  const highRiskCount = data.predicted_path.filter(
    (step) => step.predicted_risk === "High Risk"
  ).length;

  return (
    <>
      <div className="p-4 bg-blue-100 dark:bg-blue-800 rounded-lg shadow text-center">
        <h3 className="text-lg font-bold">Cyclone</h3>
        <p>{data.cyclone_name}</p>
      </div>

      <div className="p-4 bg-green-100 dark:bg-green-800 rounded-lg shadow text-center">
        <h3 className="text-lg font-bold">Avg Windspeed</h3>
        <p>{avgWind.toFixed(1)} km/h</p>
      </div>

      <div className="p-4 bg-red-100 dark:bg-red-800 rounded-lg shadow text-center">
        <h3 className="text-lg font-bold">High Risk Points</h3>
        <p>{highRiskCount}</p>
      </div>

      <div className="p-4 bg-yellow-100 dark:bg-yellow-700 rounded-lg shadow text-center">
        <h3 className="text-lg font-bold">Confidence</h3>
        <p>{(data.confidence * 100).toFixed(0)}%</p>
      </div>
    </>
  );
}

export default KpiCards;
