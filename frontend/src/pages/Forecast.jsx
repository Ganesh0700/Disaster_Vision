import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

function Forecast() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region] = useState("Odisha"); // default region, later dropdown se change kar sakte ho

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/forecast/${region}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Forecast API:", data);
        setForecast(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching forecast:", err);
        setLoading(false);
      });
  }, [region]);

  if (loading) return <p className="p-6">Loading forecast...</p>;
  if (!forecast) return <p className="p-6 text-red-500">No forecast data available.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Cyclone Forecast - {forecast.region}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {forecast.cyclone_name} (Confidence: {(forecast.confidence * 100).toFixed(0)}%)
        </h3>

        {/* Forecast Chart */}
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={forecast.predicted_path}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="timestamp" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }} />
            <Legend />

            {/* Windspeed Line */}
            <Line
              type="monotone"
              dataKey="windspeed"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            {/* Pressure Line */}
            <Line
              type="monotone"
              dataKey="pressure"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            {/* Gradient Fill for Windspeed */}
            <defs>
              <linearGradient id="windspeedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="windspeed"
              stroke="none"
              fill="url(#windspeedFill)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Forecast;
