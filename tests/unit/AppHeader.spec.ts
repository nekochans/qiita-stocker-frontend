import { shallowMount, createLocalVue, config } from "@vue/test-utils";
import Vuex from "vuex";
import { QiitaModule } from "@/store/modules/qiita";
import AppHeader from "@/components/AppHeader.vue";
import { IQiitaState } from "@/types/qiita";
import VueRouter from "vue-router";

config.logModifiedComponents = false;

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe("AppHeader.vue", () => {
  let store: any;
  let state: IQiitaState;

  state = {
    authorizationCode: "",
    accessToken: "",
    qiitaAccountId: "",
    permanentId: "",
    sessionId: "",
    categories: [],
    stocks: [],
    paging: [],
    isCategorizing: false
  };

  it("renders login", () => {
    store = new Vuex.Store({
      modules: {
        QiitaModule: {
          namespaced: true,
          state,
          actions: {},
          getters: QiitaModule.getters
        }
      }
    });

    const wrapper = shallowMount(AppHeader, { store, localVue, router });
    const navbarItem = wrapper.findAll("a").at(2);
    expect(navbarItem.text()).toBe("ログイン");
  });

  it("renders logout", () => {
    state.sessionId = "d690e4de-0a4e-4f14-a5c5-f4303fbd8a08";

    store = new Vuex.Store({
      modules: {
        QiitaModule: {
          namespaced: true,
          state,
          actions: {},
          getters: QiitaModule.getters
        }
      }
    });

    const wrapper = shallowMount(AppHeader, { store, localVue, router });
    const navbarItem = wrapper.findAll("a").at(4);
    expect(navbarItem.text()).toBe("ログアウト");
  });

  it('calls store action "logout" when logoutLink is clicked', () => {
    const actions = {
      logout: jest.fn()
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

    const wrapper = shallowMount(AppHeader, { store, localVue, router });
    const logoutLink = wrapper.findAll("a").at(4);

    logoutLink.trigger("click");
    expect(actions.logout).toHaveBeenCalled();
  });
});
