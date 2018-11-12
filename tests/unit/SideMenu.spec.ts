import { shallowMount, mount, config } from "@vue/test-utils";
import SideMenu from "@/components/SideMenu.vue";
import CreateCategory from "@/components/CreateCategory.vue";

config.logModifiedComponents = false;

describe("SideMenu.vue", () => {
  describe("methods", () => {
    it("should emit clickSaveCategory on onClickSaveCategory()", () => {
      const wrapper = shallowMount(SideMenu);
      const inputtedCategory = "inputtedCategory";

      // @ts-ignore
      wrapper.vm.onClickSaveCategory(inputtedCategory);

      expect(wrapper.emitted("clickSaveCategory")).toBeTruthy();
      expect(wrapper.emitted("clickSaveCategory")[0][0]).toEqual(
        inputtedCategory
      );
    });
  });

  // mountによる結合テスト
  describe("template", () => {
    it("should call onClickSaveCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(SideMenu);

      wrapper.setMethods({
        onClickSaveCategory: mock
      });

      const createCategory = wrapper.find(CreateCategory);
      const inputtedCategory = "inputtedCategory";

      // @ts-ignore
      createCategory.vm.category = inputtedCategory;

      // @ts-ignore
      createCategory.vm.onClickSaveCategory();

      expect(mock).toHaveBeenCalledWith(inputtedCategory);
    });
  });
});
