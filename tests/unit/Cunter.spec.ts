import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Counter from "@/pages/Counter.vue";
import { CounterModule } from "@/store/modules/counter";
import { CounterState } from "@/types/counter";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Counter.vue", () => {
  let store: any;
  let state: CounterState;
  let actions: any;

  beforeEach(() => {
    state = {
      counter: 1
    };

    actions = {
      increment: jest.fn(),
      decrement: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        CounterModule: {
          namespaced: true,
          state,
          actions,
          getters: CounterModule.getters
        }
      }
    });
  });

  it('renders "state.counter" in first p tag', () => {
    const wrapper = shallowMount(Counter, { store, localVue });
    const p = wrapper.find("p");
    expect(p.text()).toBe(state.counter.toString());
  });

  it('calls store action "increment" when increment button is clicked', () => {
    const wrapper = shallowMount(Counter, { store, localVue });
    const button = wrapper.findAll("button").at(0);
    button.trigger("click");
    expect(actions.increment).toHaveBeenCalled();
  });

  it('calls store action "decrement" when decrement button is clicked', () => {
    const wrapper = shallowMount(Counter, { store, localVue });
    const button = wrapper.findAll("button").at(1);

    button.trigger("click");
    expect(actions.decrement).toHaveBeenCalled();
  });
});
