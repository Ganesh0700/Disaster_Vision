import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">🌪 Cyclone Dashboard</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/forecast" className="hover:underline">Forecast</Link>
        <Link to="/safety" className="hover:underline">Safety</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/team">Team</Link>
      </div>
    </nav>
  );
}

export default Navbar;
