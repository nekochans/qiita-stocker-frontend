import { shallowMount, mount, createLocalVue, config } from "@vue/test-utils";
import Vuex from "vuex";
import { QiitaModule } from "@/store/modules/qiita";
import {IUpdateCategoryPayload, ICategorizePayload} from "@/store/modules/actions";
import StockCategories from "@/pages/StockCategories.vue";
import SideMenu from "@/components/SideMenu.vue";
import CategorizedStockEdit from "@/components/CategorizedStockEdit.vue";
import CategorizedStockList from "@/components/CategorizedStockList.vue";
import CategoryList from "@/components/CategoryList.vue";
import Pagination from "@/components/Pagination.vue";
import { IQiitaState } from "@/types/qiita";
import VueRouter from "vue-router";
import { ICategorizedStock, IPage, IUncategorizedStock } from "@/domain/qiita";

config.logModifiedComponents = false;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const routes = [
  {
    path: "/stocks/categories/:id",
    params: { id: "1" }
  }
];

const router = new VueRouter({ routes });
router.push({ path: "/stocks/categories/1" });

describe("StockCategories.vue", () => {
  let store: any;
  let state: IQiitaState;
  let actions: any;

  beforeAll(() => {
    state = {
      authorizationCode: "",
      accessToken: "",
      qiitaAccountId: "",
      permanentId: "",
      sessionId: "d690e4de-0a4e-4f14-a5c5-f4303fbd8a08",
      categories: [],
      stocks: [],
      categorizedStocks: [
        {
          id: 1,
          article_id: "11111111111111111111",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"],
          isChecked: true
        },
        {
          id: 2,
          article_id: "22222222222222222222",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"],
          isChecked: false
        }
      ],
      currentPage: 1,
      paging: [],
      displayCategoryId: 0,
      isCategorizing: false,
      isCancelingCategorization: false,
      isLoading: false
    };

    actions = {
      saveCategory: jest.fn(),
      updateCategory: jest.fn(),
      fetchCategory: jest.fn(),
      fetchCategorizedStock: jest.fn(),
      setIsCategorizing: jest.fn(),
      setIsCancelingCategorization: jest.fn(),
      categorize: jest.fn(),
      checkCategorizedStock: jest.fn(),
      resetData: jest.fn(),
      destroyCategory: jest.fn(),
      saveDisplayCategoryId: jest.fn(),
      cancelCategorization: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        QiitaModule: {
          namespaced: true,
          state,
          actions,
          getters: QiitaModule.getters
        }
      }
    });
  });

  describe("methods", () => {
    it('calls store action "resetData" on onClickCategory()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });

      // @ts-ignore
      wrapper.vm.onClickCategory();

      expect(actions.resetData).toHaveBeenCalled();
    });

    it('calls store action "saveCategory" on onClickSaveCategory()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });
      const inputtedCategory = "inputtedCategory";

      // @ts-ignore
      wrapper.vm.onClickSaveCategory(inputtedCategory);

      expect(actions.saveCategory).toHaveBeenCalledWith(
        expect.anything(),
        inputtedCategory,
        undefined
      );
    });

    it('calls store action "updateCategory" on onClickUpdateCategory()', () => {
      state.categories = [{ categoryId: 1, name: "テストカテゴリ" }];

      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });
      const editedCategory = "編集されたカテゴリ名";

      const updateCategoryPayload: IUpdateCategoryPayload = {
        stateCategory: state.categories[0],
        categoryName: editedCategory
      };

      // @ts-ignore
      wrapper.vm.onClickUpdateCategory(updateCategoryPayload);

      expect(actions.updateCategory).toHaveBeenCalledWith(
        expect.anything(),
        updateCategoryPayload,
        undefined
      );
    });

    it('calls store action "destroyCategory" on onClickDestroyCategory()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });
      const categoryId = 1;

      // @ts-ignore
      wrapper.vm.onClickDestroyCategory(categoryId);

      expect(actions.destroyCategory).toHaveBeenCalledWith(
        expect.anything(),
        categoryId,
        undefined
      );
    });

    it('calls store action "categorize" on onClickCategorize()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });
      const category = { categoryId: 1, name: "category" };

      // @ts-ignore
      wrapper.vm.onClickCategorize(category);

      const categorizePayload: ICategorizePayload = {
        category,
        stockArticleIds: ["11111111111111111111"]
      };

      expect(actions.categorize).toHaveBeenCalledWith(
        expect.anything(),
        categorizePayload,
        undefined
      );
    });

    it('calls store action "cancelCategorization" on onClickCancelCategorization()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });
      const categorizedStockId = 1;

      // @ts-ignore
      wrapper.vm.onClickCancelCategorization(categorizedStockId);

      expect(actions.cancelCategorization).toHaveBeenCalledWith(
        expect.anything(),
        categorizedStockId,
        undefined
      );
    });

    it('calls store action "checkStock" on onClickCheckStock()', () => {
      const stock: ICategorizedStock = {
        id: 1,
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"],
        isChecked: true
      };

      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });

      // @ts-ignore
      wrapper.vm.onClickCheckStock(stock);

      expect(actions.checkCategorizedStock).toHaveBeenCalledWith(
        expect.anything(),
        stock,
        undefined
      );
    });

    it('calls store action "fetchCategorizedStock" on fetchOtherPageStock()', () => {
      const page: IPage = {
        page: 4,
        perPage: 20,
        relation: "next"
      };

      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });

      // @ts-ignore
      wrapper.vm.fetchOtherPageStock(page);

      const fetchCategorizedStockPayload = {
        categoryId: 1,
        page: page
      };

      expect(actions.fetchCategorizedStock).toHaveBeenCalledWith(
        expect.anything(),
        fetchCategorizedStockPayload,
        undefined
      );
    });

    it('calls store action "setIsCategorizing" on onSetIsCategorizing()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });

      // @ts-ignore
      wrapper.vm.onSetIsCategorizing();

      expect(actions.setIsCategorizing).toHaveBeenCalled();
    });

    it('calls store action "setIsCancelingCategorization" on onSetIsCancelingCategorization()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });

      // @ts-ignore
      wrapper.vm.onSetIsCancelingCategorization();

      expect(actions.setIsCancelingCategorization).toHaveBeenCalled();
    });

    it('calls store action "resetData" on onClickStocksAll()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });

      // @ts-ignore
      wrapper.vm.onClickStocksAll();

      expect(actions.resetData).toHaveBeenCalledWith(
        expect.anything(),
        undefined,
        undefined
      );
    });

    it('calls store action "fetchCategorizedStock" on initializeStock()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });

      // @ts-ignore
      wrapper.vm.initializeStock();

      const categoryId = 1;
      const fetchCategorizedStockPayload = {
        categoryId: categoryId,
        page: { page: 0, perPage: 0, relation: "" }
      };

      expect(actions.fetchCategorizedStock).toHaveBeenCalled();
      expect(actions.fetchCategorizedStock).toHaveBeenCalledWith(
        expect.anything(),
        fetchCategorizedStockPayload,
        undefined
      );

      expect(actions.fetchCategorizedStock).toHaveBeenCalled();
      expect(actions.saveDisplayCategoryId).toHaveBeenCalledWith(
        expect.anything(),
        categoryId,
        undefined
      );
    });

    it('calls store action "fetchCategory" on initializeCategory()', () => {
      const wrapper = shallowMount(StockCategories, {
        store,
        localVue,
        router
      });

      // @ts-ignore
      wrapper.vm.initializeCategory();

      expect(actions.fetchCategory).toHaveBeenCalled();
    });
  });

  // mountによる結合テスト
  describe("template", () => {
    it("should call onClickCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        onClickCategory: mock
      });

      const sideMenu = wrapper.find(SideMenu);

      // @ts-ignore
      sideMenu.vm.onClickCategory();

      expect(mock).toHaveBeenCalledWith();
    });

    it("should call onClickSaveCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        onClickSaveCategory: mock
      });

      const sideMenu = wrapper.find(SideMenu);
      const inputtedCategory = "inputtedCategory";

      // @ts-ignore
      sideMenu.vm.onClickSaveCategory(inputtedCategory);

      expect(mock).toHaveBeenCalledWith(inputtedCategory);
    });

    it("should call onClickUpdateCategory when button is clicked", () => {
      state.categories = [{ categoryId: 1, name: "テストカテゴリ" }];

      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        onClickUpdateCategory: mock
      });

      const categoryList = wrapper.find(CategoryList);
      const editedCategory = "編集されたカテゴリ名";

      const updateCategoryPayload: IUpdateCategoryPayload = {
        stateCategory: state.categories[0],
        categoryName: editedCategory
      };

      // @ts-ignore
      categoryList.vm.onClickUpdateCategory(updateCategoryPayload);

      expect(mock).toHaveBeenCalledWith(updateCategoryPayload);
    });

    it("should call onClickDestroyCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        onClickDestroyCategory: mock
      });

      const categoryList = wrapper.find(CategoryList);
      const categoryId = 1;

      // @ts-ignore
      categoryList.vm.onClickDestroyCategory(categoryId);

      expect(mock).toHaveBeenCalledWith(categoryId);
    });

    it("should call onSetIsCategorizing when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        onSetIsCategorizing: mock
      });

      const categorizedStockEdit = wrapper.find(CategorizedStockEdit);

      // @ts-ignore
      categorizedStockEdit.vm.onSetIsCategorizing();

      expect(mock).toHaveBeenCalled();
    });

    it("should call onSetIsCancelingCategorization when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        onSetIsCancelingCategorization: mock
      });

      const categorizedStockEdit = wrapper.find(CategorizedStockEdit);

      // @ts-ignore
      categorizedStockEdit.vm.setIsCancelingCategorization();

      expect(mock).toHaveBeenCalled();
    });

    it("should call onClickCategorize when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });
      const category = { categoryId: 1, name: "category" };

      wrapper.setMethods({
        onClickCategorize: mock
      });

      const categorizedStockEdit = wrapper.find(CategorizedStockEdit);

      // @ts-ignore
      categorizedStockEdit.vm.onClickCategorize(category);

      expect(mock).toHaveBeenCalledWith(category);
    });

    it("should call onClickCancelCategorization when icon is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });
      const categorizedStockId = 1;

      wrapper.setMethods({
        onClickCancelCategorization: mock
      });

      const categorizedStockList = wrapper.find(CategorizedStockList);

      // @ts-ignore
      categorizedStockList.vm.onClickCancelCategorization(categorizedStockId);

      expect(mock).toHaveBeenCalledWith(categorizedStockId);
    });

    it("should call onClickCheckStock when checkBox is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        onClickCheckStock: mock
      });

      const categorizedStockList = wrapper.find(CategorizedStockList);
      const stock: IUncategorizedStock = {
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"],
        isChecked: true
      };

      // @ts-ignore
      categorizedStockList.vm.onClickCheckStock(stock);

      expect(mock).toHaveBeenCalledWith(stock);
    });

    it("should call fetchOtherPageStock when pagination is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        fetchOtherPageStock: mock
      });

      const pagination = wrapper.find(Pagination);
      const page: IPage = {
        page: 4,
        perPage: 20,
        relation: "next"
      };

      // @ts-ignore
      pagination.vm.goToPage(page);

      expect(mock).toHaveBeenCalledWith(page);
    });

    it("should call onClickStocksAll when link is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(StockCategories, { store, localVue, router });

      wrapper.setMethods({
        onClickStocksAll: mock
      });

      const sideMenu = wrapper.find(SideMenu);

      // @ts-ignore
      sideMenu.vm.onClickStocksAll();

      expect(mock).toHaveBeenCalledWith();
    });
  });
});
