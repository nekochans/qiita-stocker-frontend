import { shallowMount } from "@vue/test-utils";
import DefaultMenuList from "@/components/DefaultMenuList.vue";

const $router = {
  push: () => {}
};

describe("DefaultMenuList.vue", () => {
  const propsData: { displayCategoryId: number } = {
    displayCategoryId: 0
  };

  it("props", () => {
    const wrapper = shallowMount(DefaultMenuList, {
      propsData,
      mocks: { $router }
    });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickStocksAll on handleClick()", () => {
      const wrapper = shallowMount(DefaultMenuList, {
        propsData,
        mocks: { $router }
      });

      // @ts-ignore
      wrapper.vm.handleClick();
      expect(wrapper.emitted("clickStocksAll")).toBeTruthy();
    });
  });

  describe("template", () => {
    it("should call handleClick when link is clicked", () => {
      const mock = jest.fn();

      const wrapper = shallowMount(DefaultMenuList, {
        propsData,
        mocks: { $router }
      });
      wrapper.setMethods({
        handleClick: mock
      });

      wrapper.find("a").trigger("click");

      expect(mock).toHaveBeenCalled();
    });
  });
});
