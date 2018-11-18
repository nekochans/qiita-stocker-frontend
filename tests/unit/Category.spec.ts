import { shallowMount } from "@vue/test-utils";
import Category from "@/components/Category.vue";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";

describe("Category.vue", () => {
  const propsData: { category: ICategory } = {
    category: { categoryId: 1, name: "テストカテゴリ" }
  };

  it("props", () => {
    const wrapper = shallowMount(Category, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickSaveCategory on onClickUpdateCategory()", () => {
      const wrapper = shallowMount(Category, { propsData });
      const editedCategory = "編集されたカテゴリ名";

      // @ts-ignore
      wrapper.vm.editCategoryName = editedCategory;

      const updateCategoryPayload: IUpdateCategoryPayload = {
        stateCategory: propsData.category,
        categoryName: editedCategory
      };

      // @ts-ignore
      wrapper.vm.onClickUpdateCategory();

      expect(wrapper.emitted("clickUpdateCategory")).toBeTruthy();
      expect(wrapper.emitted("clickUpdateCategory")[0][0]).toEqual(
        updateCategoryPayload
      );
    });

    it("should not emit clickSaveCategory on onClickUpdateCategory()", () => {
      const wrapper = shallowMount(Category, { propsData });
      const editedCategory = " ";

      // @ts-ignore
      wrapper.vm.editCategoryName = editedCategory;

      // @ts-ignore
      wrapper.vm.onClickUpdateCategory();

      expect(wrapper.emitted("clickUpdateCategory")).toBeFalsy();
    });
  });

  describe("template", () => {
    it("should call onClickUpdateCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Category, { propsData });

      wrapper.setMethods({
        onClickUpdateCategory: mock
      });

      wrapper.find("button").trigger("click");

      expect(mock).toHaveBeenCalled();
    });
  });
});
