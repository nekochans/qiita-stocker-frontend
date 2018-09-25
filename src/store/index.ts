import Vue from "vue";
import Vuex from "vuex";
import { CounterModule } from "./modules/counter";
import { WeatherModule } from "./modules/weather";
import { QiitaModule } from "./modules/Qiita";

Vue.use(Vuex);

export interface RootState {
  version: string;
}

export default new Vuex.Store({
  state: {
    version: "1.0.0"
  },
  modules: {
    CounterModule,
    WeatherModule,
    QiitaModule
  }
});
