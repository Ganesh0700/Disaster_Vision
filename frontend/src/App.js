import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatbotFab from "./components/ChatbotFab";
import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import Safety from "./pages/Safety";
import Profile from "./pages/Profile";
import Team from "./pages/Team";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      
      {/* ✅ Floating Chatbot har page par dikhne ke liye */}
      <ChatbotFab />
    </Router>
  );
}

export default App;
