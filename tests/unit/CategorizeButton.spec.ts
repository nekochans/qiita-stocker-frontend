import { shallowMount } from "@vue/test-utils";
import CategorizeButton from "@/components/CategorizeButton.vue";
import { ICategory } from "@/domain/qiita";

describe("CategorizeButton.vue", () => {
  const propsData: {
    isCategorizing: boolean;
    isCancelingCategorization: boolean;
    displayCategories: ICategory[];
    checkedStockArticleIds: string[];
  } = {
    isCategorizing: false,
    isCancelingCategorization: false,
    displayCategories: [
      { categoryId: 1, name: "テストカテゴリ1" },
      { categoryId: 2, name: "テストカテゴリ2" }
    ],
    checkedStockArticleIds: ["aabbccddee0000000000"]
  };

  it("props", () => {
    const wrapper = shallowMount(CategorizeButton, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickSetIsCategorizing on startEdit()", () => {
      const wrapper = shallowMount(CategorizeButton, { propsData });

      // @ts-ignore
      wrapper.vm.doneEdit();
      expect(wrapper.emitted("clickSetIsCategorizing")).toBeTruthy();
    });

    it("should call doneEdit on startEdit()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizeButton, { propsData });

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.startEdit();
      expect(mock).toBeTruthy();
    });

    it("should call doneEdit on cancel()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizeButton, { propsData });

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.cancel();
      expect(mock).toBeTruthy();
    });

    it("should emit clickCategorize on changeCategory()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizeButton, { propsData });
      const selectedCategory = propsData.displayCategories[0];

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.selectedCategory = selectedCategory;

      // @ts-ignore
      wrapper.vm.changeCategory();
      expect(mock).toBeTruthy();
      expect(wrapper.emitted("clickCategorize")).toBeTruthy();
      expect(wrapper.emitted("clickCategorize")[0][0]).toEqual(
        selectedCategory
      );
    });

    it("should not emit clickCategorize on changeCategory() when category is not selected", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizeButton, { propsData });

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.selectedCategory = { categoryId: 0, name: "" };

      // @ts-ignore
      wrapper.vm.changeCategory();
      expect(wrapper.emitted("clickCategorize")).toBeFalsy();
    });

    it("should not emit clickCategorize on changeCategory() when stock is not checked", () => {
      propsData.checkedStockArticleIds = [];
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizeButton, { propsData });

      // @ts-ignore
      wrapper.vm.selectedCategory = propsData.displayCategories[0];

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.changeCategory();
      expect(wrapper.emitted("clickCategorize")).toBeFalsy();
    });
  });

  describe("template", () => {
    it("should call startEdit when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizeButton, { propsData });

      wrapper.setMethods({
        startEdit: mock
      });

      wrapper.find("button").trigger("click");
      expect(mock).toHaveBeenCalled();
    });

    it("should call changeCategory when button is clicked", () => {
      propsData.isCategorizing = true;
      propsData.displayCategories = [
        { categoryId: 1, name: "テストカテゴリ1" },
        { categoryId: 2, name: "テストカテゴリ2" }
      ];
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizeButton, { propsData });

      wrapper.setMethods({
        changeCategory: mock
      });

      wrapper
        .findAll("button")
        .at(0)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });

    it("should call cancel when button is clicked", () => {
      propsData.isCategorizing = true;
      propsData.displayCategories = [
        { categoryId: 1, name: "テストカテゴリ1" },
        { categoryId: 2, name: "テストカテゴリ2" }
      ];

      const mock = jest.fn();
      const wrapper = shallowMount(CategorizeButton, { propsData });

      wrapper.setMethods({
        cancel: mock
      });

      wrapper
        .findAll("button")
        .at(1)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });
  });
});
