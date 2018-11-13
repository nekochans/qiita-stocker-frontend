import { shallowMount, mount, createLocalVue, config } from "@vue/test-utils";
import Vuex from "vuex";
import { QiitaModule } from "@/store/modules/Qiita";
import Account from "@/pages/Account.vue";
import SideMenu from "@/components/SideMenu.vue";
import { ILoginState } from "@/types/login";
import VueRouter from "vue-router";

config.logModifiedComponents = false;

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe("Account.vue", () => {
  let store: any;
  let state: ILoginState;
  let actions: any;

  beforeAll(() => {
    state = {
      authorizationCode: "",
      accessToken: "",
      permanentId: "",
      isLoggedIn: true,
      categories: []
    };

    actions = {
      saveCategory: jest.fn()
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
});
