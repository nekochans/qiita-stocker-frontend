import { shallowMount } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";
import { IPage } from "@/domain/qiita";

describe("Pagination.vue", () => {
  const firstPage: IPage = {
    page: 1,
    perPage: 20,
    relation: "first"
  };
  const prevPage: IPage = {
    page: 2,
    perPage: 20,
    relation: "prev"
  };
  const nextPage: IPage = {
    page: 4,
    perPage: 20,
    relation: "next"
  };
  const lastPage: IPage = {
    page: 5,
    perPage: 20,
    relation: "last"
  };

  const propsData: {
    isLoading: boolean;
    stocksLength: number;
    currentPage: number;
    firstPage: IPage;
    prevPage: IPage;
    nextPage: IPage;
    lastPage: IPage;
  } = {
    isLoading: false,
    stocksLength: 20,
    currentPage: 3,
    firstPage,
    prevPage,
    nextPage,
    lastPage
  };

  it("props", () => {
    const wrapper = shallowMount(Pagination, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickGoToPage on goToPage()", () => {
      const wrapper = shallowMount(Pagination, { propsData });

      // @ts-ignore
      wrapper.vm.goToPage(firstPage);
      expect(wrapper.emitted("clickGoToPage")).toBeTruthy();
      expect(wrapper.emitted("clickGoToPage")[0][0]).toEqual(firstPage);
    });
  });

  describe("template", () => {
    it("should call startEdit when previous is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Pagination, { propsData });

      wrapper.setMethods({
        goToPage: mock
      });

      const previous = wrapper.findAll("a").at(0);
      previous.trigger("click");
      expect(previous.classes()).toContain("pagination-previous");
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith(prevPage);
    });

    it("should call startEdit when next is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Pagination, { propsData });

      wrapper.setMethods({
        goToPage: mock
      });

      const next = wrapper.findAll("a").at(1);
      next.trigger("click");
      expect(next.classes()).toContain("pagination-next");
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith(nextPage);
    });

    it("should call startEdit when first is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Pagination, { propsData });

      wrapper.setMethods({
        goToPage: mock
      });

      const first = wrapper.findAll("a").at(2);
      first.trigger("click");
      expect(first.classes()).toContain("pagination-link");
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith(firstPage);
    });

    it("should call startEdit when prev is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Pagination, { propsData });

      wrapper.setMethods({
        goToPage: mock
      });

      const prev = wrapper.findAll("a").at(3);
      prev.trigger("click");
      expect(prev.classes()).toContain("pagination-link");
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith(prevPage);
    });

    it("should call startEdit when next is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Pagination, { propsData });

      wrapper.setMethods({
        goToPage: mock
      });

      const next = wrapper.findAll("a").at(5);
      next.trigger("click");
      expect(next.classes()).toContain("pagination-link");
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith(nextPage);
    });

    it("should call startEdit when last is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(Pagination, { propsData });

      wrapper.setMethods({
        goToPage: mock
      });

      const last = wrapper.findAll("a").at(6);
      last.trigger("click");
      expect(last.classes()).toContain("pagination-link");
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith(lastPage);
    });

    it("renders pagination", () => {
      const wrapper = shallowMount(Pagination, { propsData });

      const loadingMessage = wrapper.find("nav");
      expect(loadingMessage.isVisible()).toBe(true);
    });

    it("do not renders pagination when loading", () => {
      propsData.isLoading = true;
      propsData.stocksLength = 20;
      const wrapper = shallowMount(Pagination, { propsData });

      const loadingMessage = wrapper.find("nav");
      expect(loadingMessage.isVisible()).toBe(false);
    });

    it("do not renders pagination when stocks length is 0", () => {
      propsData.isLoading = false;
      propsData.stocksLength = 0;
      const wrapper = shallowMount(Pagination, { propsData });

      const loadingMessage = wrapper.find("nav");
      expect(loadingMessage.isVisible()).toBe(false);
    });
  });
});
