import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SignUp from "../../src/pages/SignUp.vue";
import { QiitaModule } from "@/store/modules/Qiita";

import { ILoginState } from "@/types/login";
import VueRouter from "vue-router";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe("SignUp.vue", () => {
  let store: any;
  let state: ILoginState;
  let actions: any;

  it('calls store action "signUp" when button is clicked', () => {
    state = {
      authorizationCode: "",
      accessToken: "",
      permanentId: "",
      isLoggedIn: false,
      categories: []
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

    const wrapper = shallowMount(SignUp, { store, localVue, router });
    const button = wrapper.find("button");

    button.trigger("click");
    expect(actions.signUp).toHaveBeenCalled();
  });
});
