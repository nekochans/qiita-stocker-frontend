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
  IFetchAuthenticatedUserRequest,
  IAuthorizationResponse,
  IAuthorizationRequest,
  stateNotMatchedMessage,
  matchState,
  STORAGE_KEY_AUTH_STATE,
  createAccount,
  ICreateAccountRequest,
  ICreateAccountResponse
} from "@/domain/Qiita";
import uuid from "uuid";
import router from "@/router";

Vue.use(Vuex);

const clientId = (): string => {
  return process.env.VUE_APP_QIITA_CLIENT_ID === undefined
    ? ""
    : process.env.VUE_APP_QIITA_CLIENT_ID;
};

const clientSecret = (): string => {
  return process.env.VUE_APP_QIITA_CLIENT_SECRET === undefined
    ? ""
    : process.env.VUE_APP_QIITA_CLIENT_SECRET;
};
const apiUrlBase = (): string => {
  return process.env.VUE_APP_API_URL_BASE === undefined
    ? ""
    : process.env.VUE_APP_API_URL_BASE;
};

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
  signUp: ({ commit }) => {
    const state = uuid.v4();

    window.localStorage.setItem(STORAGE_KEY_AUTH_STATE, state);

    const authorizationRequest: IAuthorizationRequest = {
      clientId: clientId(),
      state: state
    };

    requestToAuthorizationServer(authorizationRequest);
  },
  createAccount: async ({ commit }, params: IAuthorizationResponse) => {
    if (params.code === undefined) {
      return;
    }

    if (
      params.localState === undefined ||
      !matchState(params.callbackState, params.localState)
    ) {
      router.push({
        name: "error",
        params: { errorMessage: stateNotMatchedMessage() }
      });
      return;
    }

    const authorizationCode: string = params.code;
    commit("saveAuthorizationCode", authorizationCode);

    const issueAccessTokensRequest: IIssueAccessTokensRequest = {
      client_id: clientId(),
      client_secret: clientSecret(),
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

      const createAccountRequest: ICreateAccountRequest = {
        apiUrlBase: apiUrlBase(),
        permanentId: authenticatedUser.permanent_id,
        accessToken: response.token
      };

      const createAccountResponse: ICreateAccountResponse = await createAccount(
        createAccountRequest
      );

      console.log(createAccountResponse.accountId);
      console.log(createAccountResponse._embedded.sessionId);
    } catch (error) {
      console.log(error);
    }
  },
  login: ({ commit }) => {
    // TODO ログインAPIを呼び出す処理を追加する
  }
};

export const QiitaModule: Module<LoginState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
