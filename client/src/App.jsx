import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WeatherSearch from "./components/WeatherSearch";
import Reports from "./components/Reports";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/weather" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/weather"
            element={
              isAuthenticated ? (
                <WeatherSearch onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/reports"
            element={
              isAuthenticated ? (
                <Reports onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
