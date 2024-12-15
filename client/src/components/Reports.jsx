/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";

function Reports({ onLogout }) {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/report", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-8 bg-gray-50 h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Weather Reports</h1>
        <div>
          <button
            onClick={() => navigate("/weather")}
            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Weather Search
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
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-4 border">Username</th>
            <th className="p-4 border">City</th>
            <th className="p-4 border">Weather</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td className="p-4 border">{report.username}</td>
              <td className="p-4 border">{report.city}</td>
              <td className="p-4 border">{JSON.stringify(report.weather)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
