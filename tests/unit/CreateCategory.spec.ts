import { shallowMount } from "@vue/test-utils";
import CreateCategory from "@/components/CreateCategory.vue";

describe("CreateCategory.vue", () => {
  describe("methods", () => {
    it("should emit clickSaveCategory on onClickSaveCategory()", () => {
      const wrapper = shallowMount(CreateCategory);
      const inputtedCategory = "inputtedCategory";

      // @ts-ignore
      wrapper.vm.category = inputtedCategory;

      // @ts-ignore
      wrapper.vm.onClickSaveCategory();

      expect(wrapper.emitted("clickSaveCategory")).toBeTruthy();
      expect(wrapper.emitted("clickSaveCategory")[0][0]).toEqual(
        inputtedCategory
      );
    });
  });

  describe("template", () => {
    it("should call onClickSaveCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CreateCategory);

      wrapper.setMethods({
        onClickSaveCategory: mock
      });

      wrapper
        .findAll("button")
        .at(1)
        .trigger("click");

      expect(mock).toHaveBeenCalled();
    });
  });
});
