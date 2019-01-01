import { shallowMount } from "@vue/test-utils";
import Category from "@/components/Category.vue";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";

describe("Category.vue", () => {
  const $route = {
    path: "/stocks/categories",
    params: { id: 1 }
  };

  const $router = {
    push: () => {}
  };

  const propsData: { category: ICategory } = {
    category: { categoryId: 1, name: "テストカテゴリ" }
  };

  it("props", () => {
    const wrapper = shallowMount(Category, {
      propsData,
      mocks: { $route, $router }
    });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickUpdateCategory on onClickUpdateCategory()", () => {
      const wrapper = shallowMount(Category, {
        propsData,
        mocks: { $route, $router }
      });
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

    it("should not emit clickUpdateCategory on onClickUpdateCategory()", () => {
      const wrapper = shallowMount(Category, {
        propsData,
        mocks: { $route, $router }
      });
      const editedCategory = " ";

      // @ts-ignore
      wrapper.vm.editCategoryName = editedCategory;

      // @ts-ignore
      wrapper.vm.onClickUpdateCategory();

      expect(wrapper.emitted("clickUpdateCategory")).toBeFalsy();
    });

    it("should emit clickDestroyCategory on onClickDestroyCategory()", () => {
      const wrapper = shallowMount(Category, {
        propsData,
        mocks: { $route, $router }
      });

      // @ts-ignore
      wrapper.vm.onClickDestroyCategory();

      expect(wrapper.emitted("clickDestroyCategory")).toBeTruthy();
      expect(wrapper.emitted("clickDestroyCategory")[0][0]).toEqual(
        propsData.category.categoryId
      );
    });

    it("should emit clickCategory on onClickCategory()", () => {
      const wrapper = shallowMount(Category, {
        propsData,
        mocks: { $route, $router }
      });

      // @ts-ignore
      wrapper.vm.onClickCategory();

      expect(wrapper.emitted("clickCategory")).toBeTruthy();
    });

    it("should not emit clickCategory on onClickCategory()", () => {
      const wrapper = shallowMount(Category, {
        propsData,
        mocks: { $route, $router }
      });

      // @ts-ignore
      wrapper.vm.isSelecting = true;

      // @ts-ignore
      wrapper.vm.onClickCategory();

      expect(wrapper.emitted("clickCategory")).toBeFalsy();
    });
  });

  describe("template", () => {
    it("should call onClickUpdateCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Category, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickUpdateCategory: mock
      });

      wrapper.find("button").trigger("click");

      expect(mock).toHaveBeenCalled();
    });

    it("should call onClickDestroyCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Category, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickDestroyCategory: mock
      });

      wrapper
        .findAll("a")
        .at(1)
        .trigger("click");

      expect(mock).toHaveBeenCalled();
    });

    it("should call onClickCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Category, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickCategory: mock
      });

      wrapper.find("a").trigger("click");

      expect(mock).toHaveBeenCalled();
    });
  });
});
