import axios, { AxiosResponse } from "axios";

enum Weather {
  SUNNY = "sunny",
  CLOUDY = "cloudy",
  RAINY = "rainy"
}

interface WeatherResponse {
  weather: Weather;
}

export const WeatherAPI = {
  fetchWeather: async (): Promise<AxiosResponse<WeatherResponse>> => {
    const response = await axios
      .get<WeatherResponse>("http://127.0.0.1:8000/api/weather")
      .catch(error => Promise.reject(error));
    return response;
  }
};
