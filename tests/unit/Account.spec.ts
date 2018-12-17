import { shallowMount, mount, createLocalVue, config } from "@vue/test-utils";
import Vuex from "vuex";
import { IUpdateCategoryPayload, QiitaModule } from "@/store/modules/qiita";
import Account from "@/pages/Account.vue";
import SideMenu from "@/components/SideMenu.vue";
import CategoryList from "@/components/CategoryList.vue";
import { IQiitaState } from "@/types/qiita";
import VueRouter from "vue-router";

config.logModifiedComponents = false;

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe("Account.vue", () => {
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
      categories: []
    };

    actions = {
      saveCategory: jest.fn(),
      updateCategory: jest.fn(),
      fetchCategory: jest.fn()
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
    it('calls store action "saveCategory" on onClickSaveCategory()', () => {
      const wrapper = shallowMount(Account, { store, localVue, router });
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

      const wrapper = shallowMount(Account, { store, localVue, router });
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

    it('calls store action "fetchCategory" on initializeCategory()', () => {
      const wrapper = shallowMount(Account, { store, localVue, router });

      // @ts-ignore
      wrapper.vm.initializeCategory();

      expect(actions.fetchCategory).toHaveBeenCalled();
    });
  });

  // mountによる結合テスト
  describe("template", () => {
    it("should call onClickSaveCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(Account, { store, localVue, router });

      wrapper.setMethods({
        onClickSaveCategory: mock
      });

      const sideMenu = wrapper.find(SideMenu);
      const inputtedCategory = "inputtedCategory";

      // @ts-ignore
      sideMenu.vm.onClickSaveCategory(inputtedCategory);

      expect(mock).toHaveBeenCalledWith(inputtedCategory);
    });
  });

  it("should call onClickUpdateCategory when button is clicked", () => {
    state.categories = [{ categoryId: 1, name: "テストカテゴリ" }];

    const mock = jest.fn();
    const wrapper = mount(Account, { store, localVue, router });

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
});
