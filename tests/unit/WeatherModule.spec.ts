import { WeatherState } from "@/types/weather";
import { WeatherModule } from "@/store/modules/weather";
import axios from "axios";
jest.mock("axios");

describe("WeatherModule", () => {
  describe("getters", () => {
    it("should be able to get wether", () => {
      const state: WeatherState = {
        weather: "sunny"
      };

      const wrapper = (getters: any) => getters.weather(state);
      const weather: WeatherState = wrapper(WeatherModule.getters);

      expect(weather).toEqual(state.weather);
    });
  });

  describe("mutations", () => {
    it("should be able to save weather", () => {
      const state: WeatherState = {
        weather: "sunny"
      };

      const wrapper = (mutations: any) =>
        mutations.saveWeather(state, "cloudy");
      wrapper(WeatherModule.mutations);

      expect(state.weather).toEqual("cloudy");
    });
  });
});
