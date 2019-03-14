import { shallowMount } from "@vue/test-utils";
import Error from "@/pages/Error.vue";

describe("Cancel.vue", () => {
  const propsData = {
    errorMessage: "単体テストのエラーメッセージ。"
  };

  it("should have the correct props", () => {
    const wrapper = shallowMount(Error, { propsData, stubs: ["router-link"] });
    expect(wrapper.props()).toEqual(propsData);
  });

  it("renders the correct error message", () => {
    const wrapper = shallowMount(Error, { propsData, stubs: ["router-link"] });
    expect(wrapper.find("h2").text()).toBe(propsData.errorMessage);
  });
});
