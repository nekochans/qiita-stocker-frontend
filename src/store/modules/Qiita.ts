import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { LoginState } from "@/types/login";
import { RootState } from "@/store";
import { requestToAuthorizationServer } from "@/domain/Qiita";

Vue.use(Vuex);

const state: LoginState = {
  authorizationCode: ""
};

const getters: GetterTree<LoginState, RootState> = {
  authorizationCode: (state): LoginState["authorizationCode"] => {
    return state.authorizationCode;
  }
};

const mutations: MutationTree<LoginState> = {
  saveAuthorizationCode: (state, authorizationCode: string) => {
    state.authorizationCode = authorizationCode;
  }
};

const actions: ActionTree<LoginState, RootState> = {
  login: ({ commit }) => {
    requestToAuthorizationServer();
  },
  // 今後の対応で認証コードからアクセストークンを取得するため、メソッド名は fetchAccessTokens とする
  fetchAccessTokens: async ({ commit }, query) => {
    if (query.code === undefined) {
      return;
    }

    const authorizationCode: string = query.code;
    commit("saveAuthorizationCode", authorizationCode);
  }
};

export const QiitaModule: Module<LoginState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
