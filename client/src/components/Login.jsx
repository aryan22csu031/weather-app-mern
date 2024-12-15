/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { username, password });
      localStorage.setItem("token", response.data.token);
      onLogin();
      navigate("/weather");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
