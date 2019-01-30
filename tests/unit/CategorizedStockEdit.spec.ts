import { config, shallowMount, mount } from "@vue/test-utils";
import CategorizedStockEdit from "@/components/CategorizedStockEdit.vue";
import CategorizeButton from "@/components/CategorizeButton.vue";
import { ICategory } from "@/domain/qiita";

config.logModifiedComponents = false;

describe("CategorizedStockEdit.vue", () => {
  const propsData: {
    isLoading: boolean;
    stocksLength: number;
    isCategorizing: boolean;
    displayCategories: ICategory[];
    checkedStockArticleIds: string[];
  } = {
    isLoading: false,
    stocksLength: 10,
    isCategorizing: false,
    displayCategories: [
      { categoryId: 1, name: "テストカテゴリ1" },
      { categoryId: 2, name: "テストカテゴリ2" }
    ],
    checkedStockArticleIds: ["aabbccddee0000000000"]
  };

  it("props", () => {
    const wrapper = shallowMount(CategorizedStockEdit, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickSetIsCancelingCategorization on setIsCancelingCategorization()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizedStockEdit, { propsData });

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.setIsCancelingCategorization();
      expect(wrapper.emitted("clickSetIsCancelingCategorization")).toBeTruthy();
    });

    it("should emit clickSetIsCategorizing on onSetIsCategorizing()", () => {
      const wrapper = shallowMount(CategorizedStockEdit, { propsData });

      // @ts-ignore
      wrapper.vm.onSetIsCategorizing();
      expect(wrapper.emitted("clickSetIsCategorizing")).toBeTruthy();
    });

    it("should emit clickCategorize on onClickCategorize()", () => {
      const wrapper = shallowMount(CategorizedStockEdit, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCategorize(propsData.displayCategories[0]);
      expect(wrapper.emitted("clickCategorize")).toBeTruthy();
      expect(wrapper.emitted("clickCategorize")[0][0]).toEqual(
        propsData.displayCategories[0]
      );
    });
  });

  describe("template", () => {
    it("should call onSetIsCategorizing when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategorizedStockEdit, {
        propsData
      });

      wrapper.setMethods({
        onSetIsCategorizing: mock
      });

      const categorizeButton = wrapper.find(CategorizeButton);

      // @ts-ignore
      categorizeButton.vm.doneEdit();

      expect(mock).toHaveBeenCalledWith();
    });

    it("should call onClickCategorize when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategorizedStockEdit, {
        propsData
      });

      wrapper.setMethods({
        onClickCategorize: mock
      });

      const categorizeButton = wrapper.find(CategorizeButton);

      // @ts-ignore
      categorizeButton.vm.selectedCategory = propsData.displayCategories[0];

      // @ts-ignore
      categorizeButton.vm.changeCategory(categorizeButton.vm.selectedCategory);

      expect(mock).toHaveBeenCalledWith(propsData.displayCategories[0]);
    });

    it("should call setIsCancelingCategorization when button is clicked", () => {
      propsData.isCategorizing = false;
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizedStockEdit, { propsData });

      wrapper.setMethods({
        setIsCancelingCategorization: mock
      });

      wrapper
        .findAll("button")
        .at(0)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });

    it("renders navbar", () => {
      const wrapper = shallowMount(CategorizedStockEdit, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(true);
    });

    it("do not renders navbar when loading", () => {
      propsData.isLoading = true;
      propsData.stocksLength = 20;
      const wrapper = shallowMount(CategorizedStockEdit, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(false);
    });

    it("do not renders navbar when stocks length is 0", () => {
      propsData.isLoading = false;
      propsData.stocksLength = 0;
      const wrapper = shallowMount(CategorizedStockEdit, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(false);
    });
  });
});
