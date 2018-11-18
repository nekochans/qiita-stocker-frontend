import { shallowMount, mount, config } from "@vue/test-utils";
import CategoryList from "@/components/CategoryList.vue";
import Category from "@/components/Category.vue";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";

config.logModifiedComponents = false;

describe("CategoryList.vue", () => {
  const propsData: { categories: ICategory[] } = {
    categories: [{ categoryId: 1, name: "テストカテゴリ" }]
  };

  describe("methods", () => {
    it("should emit clickUpdateCategory on onClickUpdateCategory()", () => {
      const wrapper = shallowMount(CategoryList, { propsData });
      const editedCategory = "編集されたカテゴリ名";

      const updateCategoryPayload: IUpdateCategoryPayload = {
        stateCategory: propsData.categories[0],
        categoryName: editedCategory
      };

      // @ts-ignore
      wrapper.vm.onClickUpdateCategory(updateCategoryPayload);

      expect(wrapper.emitted("clickUpdateCategory")).toBeTruthy();
      expect(wrapper.emitted("clickUpdateCategory")[0][0]).toEqual(
        updateCategoryPayload
      );
    });
  });

  // mountによる結合テスト
  describe("template", () => {
    it("should call clickUpdateCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategoryList, { propsData });

      wrapper.setMethods({
        onClickUpdateCategory: mock
      });

      const category = wrapper.find(Category);
      const editedCategory = "編集されたカテゴリ名";

      // @ts-ignore
      category.vm.editCategoryName = editedCategory;

      // @ts-ignore
      category.vm.onClickUpdateCategory();

      const updateCategoryPayload: IUpdateCategoryPayload = {
        stateCategory: propsData.categories[0],
        categoryName: editedCategory
      };

      expect(mock).toHaveBeenCalledWith(updateCategoryPayload);
    });
  });
});
