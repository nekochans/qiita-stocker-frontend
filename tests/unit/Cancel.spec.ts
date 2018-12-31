import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Cancel from "../../src/pages/cencel/Cancel.vue";
import { QiitaModule } from "@/store/modules/qiita";

import { IQiitaState } from "@/types/qiita";
import VueRouter from "vue-router";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe("Cancel.vue", () => {
  let store: any;
  let state: IQiitaState;
  let actions: any;

  it('calls store action "cancel" when button is clicked', () => {
    state = {
      authorizationCode: "",
      accessToken: "",
      qiitaAccountId: "",
      permanentId: "",
      sessionId: "d690e4de-0a4e-4f14-a5c5-f4303fbd8a08",
      categories: [],
      stocks: [],
      categorizedStocks: [],
      currentPage: 1,
      paging: [],
      isCategorizing: false,
      isLoading: false
    };

    actions = {
      cancel: jest.fn()
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

    const wrapper = shallowMount(Cancel, { store, localVue, router });
    const button = wrapper.find("button");

    button.trigger("click");
    expect(actions.cancel).toHaveBeenCalled();
  });
});
