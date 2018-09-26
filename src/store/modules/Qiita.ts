import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { LoginState } from "@/types/login";
import { RootState } from "@/store";
import {
  requestToAuthorizationServer,
  fetchAccessTokens,
  IFetchAccessTokensResponse
} from "@/domain/Qiita";

Vue.use(Vuex);

const state: LoginState = {
  authorizationCode: "",
  accessToken: ""
};

const getters: GetterTree<LoginState, RootState> = {
  authorizationCode: (state): LoginState["authorizationCode"] => {
    return state.authorizationCode;
  },
  accessToken: (state): LoginState["accessToken"] => {
    return state.accessToken;
  }
};

const mutations: MutationTree<LoginState> = {
  saveAuthorizationCode: (state, authorizationCode: string) => {
    state.authorizationCode = authorizationCode;
  },
  saveAccessToken: (state, accessToken: string) => {
    state.accessToken = accessToken;
  }
};

const actions: ActionTree<LoginState, RootState> = {
  login: ({ commit }) => {
    requestToAuthorizationServer();
  },
  fetchAccessTokens: async ({ commit }, query) => {
    if (query.code === undefined) {
      return;
    }

    const authorizationCode: string = query.code;
    commit("saveAuthorizationCode", authorizationCode);

    try {
      const response: IFetchAccessTokensResponse = await fetchAccessTokens(
        authorizationCode
      );
      commit("saveAccessToken", response.token);
    } catch (error) {
      console.log(error);
    }
  }
};

export const QiitaModule: Module<LoginState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
