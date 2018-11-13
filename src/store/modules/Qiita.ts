import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { ILoginState, ICategory } from "@/types/login";
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
  STORAGE_KEY_SESSION_ID,
  createAccount,
  ICreateAccountRequest,
  ICreateAccountResponse,
  IIssueLoginSessionRequest,
  IIssueLoginSessionResponse,
  issueLoginSession,
  ICancelAccountRequest,
  cancelAccount,
  saveCategory,
  ISaveCategoryRequest,
  ISaveCategoryResponse,
  unauthorizedMessage
} from "@/domain/Qiita";
import uuid from "uuid";
import router from "@/router";
import LocalStorageFactory from "@/factory/repository/LocalStorageFactory";

Vue.use(Vuex);

const localStorage = LocalStorageFactory.create();

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

interface IFetchUserPayload {
  params: IAuthorizationResponse;
  accountAction: "signUp" | "login";
}

const state: ILoginState = {
  authorizationCode: "",
  accessToken: "",
  permanentId: "",
  isLoggedIn: true,
  categories: []
};

const getters: GetterTree<ILoginState, RootState> = {
  authorizationCode: (state): ILoginState["authorizationCode"] => {
    return state.authorizationCode;
  },
  accessToken: (state): ILoginState["accessToken"] => {
    return state.accessToken;
  },
  permanentId: (state): ILoginState["permanentId"] => {
    return state.permanentId;
  },
  isLoggedIn: (state): ILoginState["isLoggedIn"] => {
    return state.isLoggedIn;
  },
  categories: (state): ILoginState["categories"] => {
    return state.categories;
  }
};

const mutations: MutationTree<ILoginState> = {
  saveAuthorizationCode: (state, authorizationCode: string) => {
    state.authorizationCode = authorizationCode;
  },
  saveAccessToken: (state, accessToken: string) => {
    state.accessToken = accessToken;
  },
  savePermanentId: (state, permanentId: string) => {
    state.permanentId = permanentId;
  },
  saveCategory: (state, categories: ICategory[]) => {
    state.categories = categories;
  },
  addCategory: (state, category: ICategory) => {
    state.categories.push(category);
  }
};

const actions: ActionTree<ILoginState, RootState> = {
  signUp: ({ commit }) => {
    localStorage.save(STORAGE_KEY_ACCOUNT_ACTION, "signUp");
    requestToAuthorizationServer(createAuthRequestParam());
  },
  login: ({ commit }) => {
    localStorage.save(STORAGE_KEY_ACCOUNT_ACTION, "login");
    requestToAuthorizationServer(createAuthRequestParam());
  },
  fetchUser: async (
    { dispatch, commit },
    { params, accountAction }: IFetchUserPayload
  ) => {
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

      switch (accountAction) {
        case "signUp":
          dispatch("createAccount");
          break;
        case "login":
          dispatch("issueLoginSession");
          break;
        default:
          router.push({
            name: "error",
            params: {
              errorMessage: unauthorizedMessage()
            }
          });
      }
    } catch (error) {
      router.push({
        name: "error",
        params: {
          errorMessage: unauthorizedMessage()
        }
      });
      return;
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

      // TODO 発行されたアカウントIDをstateに保存するのか検討
      console.log(createAccountResponse.accountId);
      localStorage.save(
        STORAGE_KEY_SESSION_ID,
        createAccountResponse._embedded.sessionId
      );

      router.push({
        name: "account"
      });
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

      localStorage.save(
        STORAGE_KEY_SESSION_ID,
        issueAccessTokensResponse.sessionId
      );

      router.push({
        name: "account"
      });
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  cancel: async ({ commit }) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const cancelAccountRequest: ICancelAccountRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId
      };

      await cancelAccount(cancelAccountRequest);

      localStorage.remove(STORAGE_KEY_SESSION_ID);

      router.push({
        name: "cancelComplete"
      });
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  saveCategory: async ({ commit }, category: string) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const saveCategoryRequest: ISaveCategoryRequest = {
        apiUrlBase: apiUrlBase(),
        name: category,
        sessionId: sessionId
      };

      const saveCategoryResponse: ISaveCategoryResponse = await saveCategory(
        saveCategoryRequest
      );

      const savedCategory: ICategory = {
        id: saveCategoryResponse.categoryId,
        name: saveCategoryResponse.name
      };

      commit("addCategory", savedCategory);
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  fetchCategory: async ({ commit }) => {
    try {
      // TODO カテゴリ取得APIからカテゴリ一覧を取得する

      // 仮実装として仮のカテゴリ一覧を用意
      const categories: ICategory[] = [
        {
          id: "1",
          name: "設計"
        },
        {
          id: "2",
          name: "テスト"
        },
        {
          id: "3",
          name: "ドメイン駆動設計"
        }
      ];

      commit("saveCategory", categories);
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
  localStorage.save(STORAGE_KEY_AUTH_STATE, state);

  const authorizationRequest: IAuthorizationRequest = {
    clientId: clientId(),
    state: state
  };

  return authorizationRequest;
};

export const QiitaModule: Module<ILoginState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
