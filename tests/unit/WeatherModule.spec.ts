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

  describe("actions",() => {
    it("should be able to fetch weather from API", async () => {
      // mock化出来ている事を確認する為、あえて現実ではあり得ない🐱rainy🐶を指定
      const mockResponse: any = {
        data : { weather: "🐶rainy🐱" }
      };

      // 普通に axios.get.mockResolvedValue を呼ぶとTypeScriptでエラーになるので強引にany型にキャスト
      // このテクニックはあまりオススメ出来ないがどうしても型解決出来ない時の最終手段
      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockResponse);

      const commit = jest.fn();

      const wrapper =  (actions: any) => actions.fetchWeather({ commit });
      await wrapper(WeatherModule.actions);

      // commit() が commit("saveWeather", "🐶rainy🐱"); で呼ばれている事を確認
      expect(commit.mock.calls).toEqual([['saveWeather', '🐶rainy🐱']]);
    });
  });
});
