import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

const riskColors = {
  "Low Risk": "green",
  "Medium Risk": "orange",
  "High Risk": "red",
};

// Cyclone animated icon 🌪️
const cycloneIcon = L.divIcon({
  className: "cyclone-icon",
  html: `<span style="font-size:28px;">🌪️</span>`,
});

function MapView() {
  const [forecast, setForecast] = useState(null);
  const [positionIndex, setPositionIndex] = useState(0);

  // ✅ Backend se forecast fetch
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/forecast/Odisha")
      .then((res) => res.json())
      .then((data) => setForecast(data))
      .catch((err) => console.error("Error loading forecast:", err));
  }, []);

  // Dummy Lat/Lon points for demo cyclone path
  const path = [
    [20.3, 86.9],
    [20.5, 86.5],
    [20.7, 86.2],
  ];

  // ✅ Animate cyclone marker along the path
  useEffect(() => {
    if (!forecast) return;
    const interval = setInterval(() => {
      setPositionIndex((prev) => (prev + 1) % path.length);
    }, 2000); // move every 2 seconds
    return () => clearInterval(interval);
  }, [forecast]);

  if (!forecast || !forecast.predicted_path) {
    return <p>Loading map...</p>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="font-bold mb-3 text-gray-900 dark:text-gray-100">
        🌪 Cyclone Path (Live Animation)
      </h2>
      <MapContainer
        center={[20.3, 86.9]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* ✅ Polyline for cyclone path */}
        <Polyline positions={path} color="red" weight={3} dashArray="10,6" />

        {/* ✅ Static risk markers */}
        {forecast.predicted_path.map((step, idx) => {
          const latlng = path[idx] || path[0]; // fallback agar path chhota ho
          const risk = step.predicted_risk || "Low Risk";
          return (
            <Marker
              key={idx}
              position={latlng}
              icon={L.divIcon({
                className: "risk-icon",
                html: `<span style="color:${riskColors[risk]}; font-size:22px;">●</span>`,
              })}
            >
              <Popup>
                <strong>Timestamp:</strong> {step.timestamp} <br />
                <strong>Windspeed:</strong> {step.windspeed} km/h <br />
                <strong>Pressure:</strong> {step.pressure} hPa <br />
                <strong>Risk:</strong>{" "}
                <span style={{ color: riskColors[risk] }}>{risk}</span>
              </Popup>
            </Marker>
          );
        })}

        {/* ✅ Moving cyclone icon */}
        <Marker position={path[positionIndex]} icon={cycloneIcon}>
          <Popup>🌪️ Cyclone moving...</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
