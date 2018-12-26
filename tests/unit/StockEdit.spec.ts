import { shallowMount } from "@vue/test-utils";
import StockEdit from "@/components/StockEdit.vue";
import { ICategory } from "@/domain/qiita";

describe("StockEdit.vue", () => {
  const propsData: { isCategorizing: boolean; categories: ICategory[] } = {
    isCategorizing: false,
    categories: [
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
      const selectedCategoryId = 1;

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.selectedCategoryId = selectedCategoryId;

      // @ts-ignore
      wrapper.vm.changeCategory();
      expect(mock).toBeTruthy();
      expect(wrapper.emitted("clickCategorize")).toBeTruthy();
      expect(wrapper.emitted("clickCategorize")[0][0]).toEqual(
        selectedCategoryId
      );
    });

    it("should not emit clickCategorize on changeCategory()", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(StockEdit, { propsData });

      wrapper.setMethods({ doneEdit: mock });

      // @ts-ignore
      wrapper.vm.selectedCategoryId = 0;

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
      const propsData: { isCategorizing: boolean; categories: ICategory[] } = {
        isCategorizing: true,
        categories: [
          { categoryId: 1, name: "テストカテゴリ1" },
          { categoryId: 2, name: "テストカテゴリ2" }
        ]
      };

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
      const propsData: { isCategorizing: boolean; categories: ICategory[] } = {
        isCategorizing: true,
        categories: [
          { categoryId: 1, name: "テストカテゴリ1" },
          { categoryId: 2, name: "テストカテゴリ2" }
        ]
      };

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
  });
});
