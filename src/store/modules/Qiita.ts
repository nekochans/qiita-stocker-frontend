import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { LoginState } from "@/types/login";
import { RootState } from "@/store";
import {
  requestToAuthorizationServer,
  issueAccessToken,
  IIssueAccessTokensResponse,
  IIssueAccessTokensRequest,
  fetchAuthenticatedUser,
  IFetchAuthenticatedUserResponse,
  IFetchAuthenticatedUserRequest
} from "@/domain/Qiita";

Vue.use(Vuex);

const clientId: any = process.env.VUE_APP_QIITA_CLIENT_ID;
const clientSecret: any = process.env.VUE_APP_QIITA_CLIENT_SECRET;

const state: LoginState = {
  authorizationCode: "",
  accessToken: "",
  permanentId: ""
};

const getters: GetterTree<LoginState, RootState> = {
  authorizationCode: (state): LoginState["authorizationCode"] => {
    return state.authorizationCode;
  },
  accessToken: (state): LoginState["accessToken"] => {
    return state.accessToken;
  },
  permanentId: (state): LoginState["permanentId"] => {
    return state.permanentId;
  }
};

const mutations: MutationTree<LoginState> = {
  saveAuthorizationCode: (state, authorizationCode: string) => {
    state.authorizationCode = authorizationCode;
  },
  saveAccessToken: (state, accessToken: string) => {
    state.accessToken = accessToken;
  },
  savePermanentId: (state, permanentId: string) => {
    state.permanentId = permanentId;
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

    const issueAccessTokensRequest: IIssueAccessTokensRequest = {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode
    };

    try {
      const response: IIssueAccessTokensResponse = await issueAccessToken(
        issueAccessTokensRequest
      );
      commit("saveAccessToken", response.token);

      const fetchAuthenticatedUserRequest: IFetchAuthenticatedUserRequest = {
        accessToken: response.token
      };

      const authenticatedUser: IFetchAuthenticatedUserResponse = await fetchAuthenticatedUser(
        fetchAuthenticatedUserRequest
      );

      commit("savePermanentId", authenticatedUser.permanent_id);
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
