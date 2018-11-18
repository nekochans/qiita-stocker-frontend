import { shallowMount, mount, config } from "@vue/test-utils";
import SideMenu from "@/components/SideMenu.vue";
import CreateCategory from "@/components/CreateCategory.vue";
import CategoryList from "@/components/CategoryList.vue";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";
import { ICategory } from "@/domain/qiita";

config.logModifiedComponents = false;

describe("SideMenu.vue", () => {
  const propsData: { categories: ICategory[] } = {
    categories: [{ categoryId: 1, name: "テストカテゴリ" }]
  };

  describe("methods", () => {
    it("should emit clickSaveCategory on onClickSaveCategory()", () => {
      const wrapper = shallowMount(SideMenu, { propsData });
      const inputtedCategory = "inputtedCategory";

      // @ts-ignore
      wrapper.vm.onClickSaveCategory(inputtedCategory);

      expect(wrapper.emitted("clickSaveCategory")).toBeTruthy();
      expect(wrapper.emitted("clickSaveCategory")[0][0]).toEqual(
        inputtedCategory
      );
    });

    it("should emit clickUpdateCategory on onClickUpdateCategory()", () => {
      const wrapper = shallowMount(SideMenu, { propsData });
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
    it("should call onClickSaveCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(SideMenu, { propsData });

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

  it("should call onClickUpdateCategory when button is clicked", () => {
    const mock = jest.fn();
    const wrapper = mount(SideMenu, { propsData });

    wrapper.setMethods({
      onClickUpdateCategory: mock
    });

    const categoryList = wrapper.find(CategoryList);
    const editedCategory = "編集されたカテゴリ名";

    const updateCategoryPayload: IUpdateCategoryPayload = {
      stateCategory: propsData.categories[0],
      categoryName: editedCategory
    };

    // @ts-ignore
    categoryList.vm.onClickUpdateCategory(updateCategoryPayload);

    expect(mock).toHaveBeenCalledWith(updateCategoryPayload);
  });
});
