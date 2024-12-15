/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";

function WeatherSearch({ onLogout }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://api.weatherstack.com/current?access_key=58094614d54f52c5891205d862dbddaf&query=${city}`
      );
      console.log(response);
      
      setWeather(response.data.current);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Weather Search</h1>
        <div>
          <button
            onClick={() => navigate("/reports")}
            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reports
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              onLogout();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
      {weather && (
        <div className="flex flex-col mt-4 p-4 bg-white shadow-md rounded items-center">
          <p><img src={weather.weather_icons[0]} alt="" /></p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.wind_speed} km/h</p>
          <p>Wind Direction: {weather.wind_dir}</p>
          <p>Current Time: {weather.observation_time}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherSearch;
