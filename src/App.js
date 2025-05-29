import React, { useState, useEffect } from "react";
import { getCurrentWeather } from "./services/weatherService";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {   //useEffect to fetch weather data when the city changes
    //useEffct general purpose is to perform side effects in function components
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCurrentWeather(city);  
        if (!data || data.cod !== 200) {
          throw new Error("City not found or API error");
        }
        setWeather(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setWeather(null);
      }
      setLoading(false);
    }

    fetchData();
  }, [city]);

  const currentData = weather && {
    labels: ["Current Temperature", "Feels Like", "Min Temp", "Max Temp"],
    datasets: [
      {
        label: "Weather (°C)",
        data: [
          weather.main.temp,
          weather.main.feels_like,
          weather.main.temp_min,
          weather.main.temp_max
        ],
        backgroundColor: ["#36a2eb", "#ffcd56", "#ff6384", "#4bc0c0"],
      }
    ]
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1 className="title">☀️ Weather Dashboard</h1>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
        {loading && <p className="info">Loading weather data...</p>}
        {error && <p className="error">{error}</p>}

        {weather && !loading && (
          <div className="chart-section">
            <h2>Current Weather in {city}</h2>
            <Bar data={currentData} options={{ responsive: true }} /> 
          </div>
        )}
      </div>
    </div>
  );
}

export default App;