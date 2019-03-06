import { shallowMount, mount, config } from "@vue/test-utils";
import CategorizedStockList from "@/components/CategorizedStockList.vue";
import CategorizedStock from "@/components/CategorizedStock.vue";
import { ICategorizedStock } from "@/domain/qiita";

config.logModifiedComponents = false;

describe("CategorizedStockList.vue", () => {
  const stocks: ICategorizedStock[] = [
    {
      id: 1,
      article_id: "c0a2609ae61a72dcc60f",
      title: "title1",
      user_id: "test-user1",
      profile_image_url: "https://test.com/test/image",
      article_created_at: "2018/09/30",
      tags: ["laravel", "php"],
      isChecked: true
    },
    {
      id: 2,
      article_id: "c0a2609ae61a72dcc60a",
      title: "title2",
      user_id: "test-user12",
      profile_image_url: "https://test.com/test/image",
      article_created_at: "2018/09/30",
      tags: ["Vue.js", "Vuex", "TypeScript"],
      isChecked: false
    }
  ];

  const propsData: {
    stocks: ICategorizedStock[];
    isCategorizing: boolean;
    isCancelingCategorization: boolean;
    isLoading: boolean;
  } = {
    stocks,
    isCategorizing: false,
    isCancelingCategorization: false,
    isLoading: false
  };

  it("props", () => {
    const wrapper = shallowMount(CategorizedStockList, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickCheckStock on onClickCheckStock()", () => {
      const wrapper = shallowMount(CategorizedStockList, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCheckStock(stocks[0]);

      expect(wrapper.emitted("clickCheckStock")).toBeTruthy();
      expect(wrapper.emitted("clickCheckStock")[0][0]).toEqual(stocks[0]);
    });

    it("should emit clickCancelCategorization on onClickCancelCategorization()", () => {
      const wrapper = shallowMount(CategorizedStockList, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCancelCategorization(stocks[0].id);

      expect(wrapper.emitted("clickCancelCategorization")).toBeTruthy();
      expect(wrapper.emitted("clickCancelCategorization")[0][0]).toEqual(
        stocks[0].id
      );
    });
  });

  describe("template", () => {
    it("should call onClickCheckStock when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategorizedStockList, { propsData });

      wrapper.setMethods({
        onClickCheckStock: mock
      });

      const categorizedStock = wrapper.find(CategorizedStock);

      // @ts-ignore
      categorizedStock.vm.onClickCheckStock();

      expect(mock).toHaveBeenCalledWith(stocks[0]);
    });

    it("should call clickCancelCategorization when icon is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategorizedStockList, { propsData });

      wrapper.setMethods({
        onClickCancelCategorization: mock
      });

      const categorizedStock = wrapper.find(CategorizedStock);

      // @ts-ignore
      categorizedStock.vm.onClickCancelCategorization();

      expect(mock).toHaveBeenCalledWith(stocks[0].id);
    });

    it("renders list", () => {
      const wrapper = shallowMount(CategorizedStockList, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(true);
    });

    it("do not renders list", () => {
      propsData.isLoading = true;
      const wrapper = shallowMount(CategorizedStockList, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(false);
    });
  });
});
