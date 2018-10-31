import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Weather from "@/pages/Weather.vue";
import { WeatherModule } from "@/store/modules/weather";
import { WeatherState } from "@/types/weather";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("MyComponent.vue", () => {
  let store: any;
  let state: WeatherState;
  let actions: any;

  beforeEach(() => {
    state = {
      weather: "sunny"
    };

    actions = {
      fetchWeather: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        WeatherModule: {
          namespaced: true,
          state,
          actions,
          getters: WeatherModule.getters
        }
      }
    });
  });

  it('renders "state.weather" in first p tag', () => {
    const wrapper = shallowMount(Weather, { store, localVue });
    const p = wrapper.find("p");
    expect(p.text()).toBe(state.weather);
  });

  it('calls store action "fetchWeather" when created', () => {
    shallowMount(Weather, { store, localVue });
    expect(actions.fetchWeather).toHaveBeenCalled();
  });
});
