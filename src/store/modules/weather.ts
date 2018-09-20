import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { WeatherState } from "@/types/weather";
import { RootState } from "@/store";
import { WeatherAPI } from "@/api/weather";

Vue.use(Vuex);

const state: WeatherState = {
  weather: ""
};

const getters: GetterTree<WeatherState, RootState> = {
  weather: (state): WeatherState["weather"] => {
    return state.weather;
  }
};

const mutations: MutationTree<WeatherState> = {
  saveWeather: (state, wether: string) => {
    state.weather = wether;
  }
};

const actions: ActionTree<WeatherState, RootState> = {
  fetchWeather: async ({ commit }) => {
    try {
      const weatherResponse = await WeatherAPI.fetchWeather();
      commit("saveWeather", weatherResponse.data.weather);
    } catch (error) {
      console.log(error);
    }
  }
};

export const WeatherModule: Module<WeatherState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
