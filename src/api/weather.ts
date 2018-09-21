import axios, { AxiosResponse } from "axios";

const apiUrlBase = process.env.VUE_APP_API_URL_BASE;

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
      .get<WeatherResponse>(`${apiUrlBase}/api/weather`)
      .catch(error => Promise.reject(error));
    return response;
  }
};
