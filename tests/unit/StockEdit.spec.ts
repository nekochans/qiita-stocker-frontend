import { shallowMount } from "@vue/test-utils";
import StockEdit from "@/components/StockEdit.vue";
import { ICategory } from "@/domain/qiita";

describe("StockEdit.vue", () => {
  const propsData: {
    isLoading: boolean;
    stocksLength: number;
    isCategorizing: boolean;
    displayCategories: ICategory[];
  } = {
    isLoading: false,
    stocksLength: 10,
    isCategorizing: false,
    displayCategories: [
      { categoryId: 1, name: "テストカテゴリ1" },
      { categoryId: 2, name: "テストカテゴリ2" }
    ]
  };

  it("props", () => {
    const wrapper = shallowMount(StockEdit, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickSetIsCategorizing on startEdit()", () => {
      const wrapper = shallowMount(StockEdit, { propsData });

      // @ts-ignore
      wrapper.vm.doneEdit();
      expect(wrapper.emitted("clickSetIsCategorizing")).toBeTruthy();
    });

    it("should call doneEdit on startEdit()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(StockEdit, { propsData });

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.startEdit();
      expect(mock).toBeTruthy();
    });

    it("should call doneEdit on cancel()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(StockEdit, { propsData });

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.cancel();
      expect(mock).toBeTruthy();
    });

    it("should emit clickCategorize on changeCategory()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(StockEdit, { propsData });
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

    it("should not emit clickCategorize on changeCategory()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(StockEdit, { propsData });

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.selectedCategory = { categoryId: 0, name: "" };

      // @ts-ignore
      wrapper.vm.changeCategory();
      expect(wrapper.emitted("clickCategorize")).toBeFalsy();
    });
  });

  describe("template", () => {
    it("should call startEdit when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(StockEdit, { propsData });

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
      const wrapper = shallowMount(StockEdit, { propsData });

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
      const wrapper = shallowMount(StockEdit, { propsData });

      wrapper.setMethods({
        cancel: mock
      });

      wrapper
        .findAll("button")
        .at(1)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });

    it("renders navbar", () => {
      const wrapper = shallowMount(StockEdit, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(true);
    });

    it("do not renders navbar when loading", () => {
      propsData.isLoading = true;
      propsData.stocksLength = 20;
      const wrapper = shallowMount(StockEdit, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(false);
    });

    it("do not renders navbar when stocks length is 0", () => {
      propsData.isLoading = false;
      propsData.stocksLength = 0;
      const wrapper = shallowMount(StockEdit, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(false);
    });
  });
});
