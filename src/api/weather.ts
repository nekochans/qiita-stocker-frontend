import axios, { AxiosResponse } from "axios";

export const WeatherAPI = {
  fetchWeather: async (): Promise<any> => {
    const response: AxiosResponse<any> = await axios
      .get("http://127.0.0.1:8000/api/weather")
      .catch(error => Promise.reject(error));

    return response;
  }
};
