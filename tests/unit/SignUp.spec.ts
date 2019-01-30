import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SignUp from "../../src/pages/SignUp.vue";
import { QiitaModule } from "@/store/modules/qiita";

import { IQiitaState } from "@/types/qiita";
import VueRouter from "vue-router";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe("SignUp.vue", () => {
  let store: any;
  let state: IQiitaState;
  let actions: any;

  beforeAll(() => {
    state = {
      authorizationCode: "",
      accessToken: "",
      qiitaAccountId: "",
      permanentId: "",
      sessionId: "-0a4e-4f14-a5c5-f4303fbd8a08",
      categories: [],
      stocks: [],
      categorizedStocks: [],
      currentPage: 1,
      paging: [],
      displayCategoryId: 0,
      isCategorizing: false,
      isCancelingCategorization: false,
      isLoading: false
    };

    actions = {
      signUp: jest.fn()
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

  it('not calls store action "signUp" when button is clicked', () => {
    const wrapper = shallowMount(SignUp, { store, localVue, router });
    const button = wrapper.find("button");

    button.trigger("click");
    expect(actions.signUp).not.toHaveBeenCalled();
  });

  it('calls store action "signUp" when button is clicked', () => {
    const wrapper = shallowMount(SignUp, { store, localVue, router });
    const button = wrapper.find("button");

    // @ts-ignore
    wrapper.vm.isChecked = true;
    button.trigger("click");
    expect(actions.signUp).toHaveBeenCalled();
  });
});
