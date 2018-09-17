import { CounterState } from "@/types/counter";
import { CounterModule } from "@/store/modules/counter";

describe("CounterModule", () => {
  describe("getters", () => {
    it("should be able to get counter", () => {
      const state: CounterState = {
        counter: 1
      };

      const wrapper = (getters: any) => getters.counter(state);

      const counter: CounterState = wrapper(CounterModule.getters);
      expect(counter).toEqual(state.counter);
    });
  });

  describe("mutations", () => {
    let state: CounterState;

    beforeEach(() => {
      state = {
        counter: 1
      };
    });

    it("should be able to increment counter", () => {
      const wrapper = (mutations: any) => mutations.increment(state);
      wrapper(CounterModule.mutations);

      expect(state.counter).toEqual(2);
    });

    it("should be able to decrement counter", () => {
      const wrapper = (mutations: any) => mutations.decrement(state);
      wrapper(CounterModule.mutations);

      expect(state.counter).toEqual(0);
    });
  });
});
