import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { LoginState } from "@/types/login";
import { RootState } from "@/store";
import {
  requestToAuthorizationServer,
  issueAccessToken,
  IIssueAccessTokensResponse,
  IIssueAccessTokensRequest
} from "@/domain/Qiita";

Vue.use(Vuex);

const clientId: any = process.env.VUE_APP_QIITA_CLIENT_ID;
const clientSecret: any = process.env.VUE_APP_QIITA_CLIENT_SECRET;

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
    requestToAuthorizationServer(clientId);
  },
  issueAccessToken: async ({ commit }, query) => {
    if (query.code === undefined) {
      return;
    }

    const authorizationCode: string = query.code;
    commit("saveAuthorizationCode", authorizationCode);

    const request: IIssueAccessTokensRequest = {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode
    };

    try {
      const response: IIssueAccessTokensResponse = await issueAccessToken(
        request
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
