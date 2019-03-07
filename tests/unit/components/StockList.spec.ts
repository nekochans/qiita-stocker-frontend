import { shallowMount, mount, config } from "@vue/test-utils";
import StockList from "@/components/StockList.vue";
import Stock from "@/components/Stock.vue";
import { IUncategorizedStock } from "@/domain/qiita";

config.logModifiedComponents = false;

describe("StockList.vue", () => {
  const stocks: IUncategorizedStock[] = [
    {
      article_id: "c0a2609ae61a72dcc60f",
      title: "title1",
      user_id: "test-user1",
      profile_image_url: "https://test.com/test/image",
      article_created_at: "2018/09/30",
      tags: ["laravel", "php"],
      isChecked: true
    },
    {
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
    stocks: IUncategorizedStock[];
    isCategorizing: boolean;
    isLoading: boolean;
  } = {
    stocks,
    isCategorizing: false,
    isLoading: false
  };

  it("props", () => {
    const wrapper = shallowMount(StockList, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickCheckStock on onClickCheckStock()", () => {
      const wrapper = shallowMount(StockList, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCheckStock(stocks[0]);

      expect(wrapper.emitted("clickCheckStock")).toBeTruthy();
      expect(wrapper.emitted("clickCheckStock")[0][0]).toEqual(stocks[0]);
    });
  });

  describe("template", () => {
    it("should call onClickCheckStock when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockList, { propsData });

      wrapper.setMethods({
        onClickCheckStock: mock
      });

      const stock = wrapper.find(Stock);

      // @ts-ignore
      stock.vm.onClickCheckStock();

      expect(mock).toHaveBeenCalledWith(stocks[0]);
    });

    it("renders list", () => {
      const wrapper = shallowMount(StockList, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(true);
    });

    it("do not renders list", () => {
      propsData.isLoading = true;
      const wrapper = shallowMount(StockList, { propsData });

      const loadingMessage = wrapper.find("div");
      expect(loadingMessage.isVisible()).toBe(false);
    });
  });
});
