import { shallowMount, mount, config } from "@vue/test-utils";
import SideMenu from "@/components/SideMenu.vue";
import CreateCategory from "@/components/CreateCategory.vue";
import CategoryList from "@/components/CategoryList.vue";
import DefaultMenuList from "@/components/DefaultMenuList.vue";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";
import { ICategory } from "@/domain/qiita";

config.logModifiedComponents = false;

describe("SideMenu.vue", () => {
  const propsData: { categories: ICategory[]; displayCategoryId: number } = {
    categories: [{ categoryId: 1, name: "テストカテゴリ" }],
    displayCategoryId: 2
  };

  describe("methods", () => {
    it("should emit clickCategory on onClickCategory()", () => {
      const wrapper = shallowMount(CategoryList, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCategory();

      expect(wrapper.emitted("clickCategory")).toBeTruthy();
    });

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

    it("should emit clickDestroyCategory on onClickDestroyCategory()", () => {
      const wrapper = shallowMount(SideMenu, { propsData });
      const categoryId = 1;

      // @ts-ignore
      wrapper.vm.onClickDestroyCategory(categoryId);

      expect(wrapper.emitted("clickDestroyCategory")).toBeTruthy();
      expect(wrapper.emitted("clickDestroyCategory")[0][0]).toEqual(categoryId);
    });

    it("should emit clickStocksAll on onClickStocksAll()", () => {
      const wrapper = shallowMount(SideMenu, { propsData });

      // @ts-ignore
      wrapper.vm.onClickStocksAll();

      expect(wrapper.emitted("clickStocksAll")).toBeTruthy();
    });
  });

  // mountによる結合テスト
  describe("template", () => {
    const $route = {
      path: "/stocks/categories",
      params: { id: 1 }
    };
    const $router = {
      push: () => {}
    };

    it("should call onClickCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategoryList, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickCategory: mock
      });

      const categoryList = wrapper.find(CategoryList);

      // @ts-ignore
      categoryList.vm.onClickCategory();

      expect(mock).toHaveBeenCalledWith();
    });

    it("should call onClickSaveCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(SideMenu, {
        propsData,
        mocks: { $route, $router }
      });

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

    it("should call onClickUpdateCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(SideMenu, {
        propsData,
        mocks: { $route, $router }
      });

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

    it("should call onClickDestroyCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(SideMenu, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickDestroyCategory: mock
      });

      const categoryList = wrapper.find(CategoryList);
      const categoryId = 1;

      // @ts-ignore
      categoryList.vm.onClickDestroyCategory(categoryId);

      expect(mock).toHaveBeenCalledWith(categoryId);
    });

    it("should call onClickStocksAll when link is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(SideMenu, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickStocksAll: mock
      });

      const defaultMenuList = wrapper.find(DefaultMenuList);

      // @ts-ignore
      defaultMenuList.vm.handleClick();

      expect(mock).toHaveBeenCalledWith();
    });
  });
});
