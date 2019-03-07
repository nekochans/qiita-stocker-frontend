import { shallowMount } from "@vue/test-utils";
import Loading from "@/components/Loading.vue";

describe("Loading.vue", () => {
  it("should have the correct props", () => {
    const propsData = { isLoading: true };
    const wrapper = shallowMount(Loading, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  it("renders loading", () => {
    const propsData = { isLoading: true };
    const wrapper = shallowMount(Loading, { propsData });

    const loadingMessage = wrapper.find("div");
    expect(loadingMessage.isVisible()).toBe(true);
  });

  it("do not renders loading", () => {
    const propsData = { isLoading: false };
    const wrapper = shallowMount(Loading, { propsData });

    const loadingMessage = wrapper.find("div");
    expect(loadingMessage.isVisible()).toBe(false);
  });
});
