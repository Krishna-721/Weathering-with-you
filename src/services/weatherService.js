// services/weatherService.js
import axios from 'axios';

const API_KEY = '1594c8cf7d209e1278859ecef19b1daa';

export async function getCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);  
  return response.data;
}
