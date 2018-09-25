import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "../../src/components/Login.vue";
import { LoginState } from "@/types/login";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Login.vue", () => {
  let store: any;
  let state: LoginState;
  let actions: any;

  it('calls store action "login" when button is clicked', () => {
    state = {
      authorizationCode: ""
    };

    actions = {
      login: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        LoginModule: {
          namespaced: true,
          state,
          actions
        }
      }
    });

    const wrapper = shallowMount(Login, { store, localVue });
    const button = wrapper.find("button");

    button.trigger("click");
    expect(actions.login).toHaveBeenCalled();
  });
});
