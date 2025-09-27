import { useEffect, useState } from "react";

function Safety() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/safety")
      .then((res) => res.json())
      .then((data) => setTips(data.tips))
      .catch(() => setTips([]));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛡️ Safety Guidelines</h1>
      <ul className="space-y-2">
        {tips.length > 0 ? (
          tips.map((tip, i) => (
            <li key={i} className="p-3 bg-green-100 rounded-lg shadow">
              {tip}
            </li>
          ))
        ) : (
          <p>Loading safety tips...</p>
        )}
      </ul>
    </div>
  );
}

export default Safety;
