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
  STORAGE_KEY_ACCOUNT_ACTION,
  createAccount,
  ICreateAccountRequest,
  ICreateAccountResponse,
  IIssueLoginSessionRequest,
  IIssueLoginSessionResponse,
  issueLoginSession
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
    window.localStorage.setItem(STORAGE_KEY_ACCOUNT_ACTION, "signUp");
    requestToAuthorizationServer(createAuthRequestParam());
  },
  login: ({ commit }) => {
    window.localStorage.setItem(STORAGE_KEY_ACCOUNT_ACTION, "login");
    requestToAuthorizationServer(createAuthRequestParam());
  },
  fetchUser: async ({ commit }, params: IAuthorizationResponse) => {
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
    } catch (error) {
      // TODO エラー処理を追加する
      console.log(error);
    }
  },
  createAccount: async ({ commit }) => {
    try {
      const createAccountRequest: ICreateAccountRequest = {
        apiUrlBase: apiUrlBase(),
        permanentId: state.permanentId,
        accessToken: state.accessToken
      };

      const createAccountResponse: ICreateAccountResponse = await createAccount(
        createAccountRequest
      );

      console.log(createAccountResponse.accountId);
      console.log(createAccountResponse._embedded.sessionId);
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  issueLoginSession: async ({ commit }) => {
    try {
      const issueLoginSessionRequest: IIssueLoginSessionRequest = {
        apiUrlBase: apiUrlBase(),
        permanentId: state.permanentId,
        accessToken: state.accessToken
      };

      const issueAccessTokensResponse: IIssueLoginSessionResponse = await issueLoginSession(
        issueLoginSessionRequest
      );

      console.log(issueAccessTokensResponse.sessionId);
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  }
};

const createAuthRequestParam = (): IAuthorizationRequest => {
  const state = uuid.v4();
  window.localStorage.setItem(STORAGE_KEY_AUTH_STATE, state);

  const authorizationRequest: IAuthorizationRequest = {
    clientId: clientId(),
    state: state
  };

  return authorizationRequest;
};

export const QiitaModule: Module<LoginState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
