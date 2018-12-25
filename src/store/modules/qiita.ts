import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { IQiitaState } from "@/types/qiita";
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
  fetchCategories,
  IFetchCategoriesRequest,
  IFetchCategoriesResponse,
  unauthorizedMessage,
  ICategory,
  updateCategory,
  IUpdateCategoryRequest,
  IUpdateCategoryResponse,
  IFetchStockRequest,
  IFetchStockResponse,
  fetchStocks,
  IStock,
  IPage,
  ILogoutRequest,
  logout
} from "@/domain/qiita";
import uuid from "uuid";
import { router } from "@/router";
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

export interface IUpdateCategoryPayload {
  stateCategory: ICategory;
  categoryName: string;
}

const state: IQiitaState = {
  authorizationCode: "",
  qiitaAccountId: "",
  accessToken: "",
  permanentId: "",
  sessionId: localStorage.load(STORAGE_KEY_SESSION_ID) || "",
  categories: [],
  stocks: [],
  paging: [],
  isCategorizing: false
};

const getters: GetterTree<IQiitaState, RootState> = {
  authorizationCode: (state): IQiitaState["authorizationCode"] => {
    return state.authorizationCode;
  },
  accessToken: (state): IQiitaState["accessToken"] => {
    return state.accessToken;
  },
  permanentId: (state): IQiitaState["permanentId"] => {
    return state.permanentId;
  },
  isLoggedIn: (state): boolean => {
    return !!state.sessionId;
  },
  categories: (state): IQiitaState["categories"] => {
    return state.categories;
  },
  stocks: (state): IQiitaState["stocks"] => {
    return state.stocks;
  },
  isCategorizing: (state): IQiitaState["isCategorizing"] => {
    return state.isCategorizing;
  }
};

const mutations: MutationTree<IQiitaState> = {
  saveAuthorizationCode: (state, authorizationCode: string) => {
    state.authorizationCode = authorizationCode;
  },
  saveAccessToken: (state, accessToken: string) => {
    state.accessToken = accessToken;
  },
  saveQiitaAccountId: (state, qiitaAccountId: string) => {
    state.qiitaAccountId = qiitaAccountId;
  },
  savePermanentId: (state, permanentId: string) => {
    state.permanentId = permanentId;
  },
  saveSessionId: (state, sessionId: string) => {
    state.sessionId = sessionId;
  },
  saveCategory: (state, categories: ICategory[]) => {
    state.categories = categories;
  },
  addCategory: (state, category: ICategory) => {
    state.categories.push(category);
  },
  updateCategory: (
    state,
    updateCategory: { stateCategory: ICategory; categoryName: string }
  ) => {
    updateCategory.stateCategory.name = updateCategory.categoryName;
  },
  saveStocks: (state, stocks: IStock[]) => {
    state.stocks = stocks;
  },
  savePaging: (state, paging: IPage[]) => {
    state.paging = paging;
  },
  setIsCategorizing: state => {
    state.isCategorizing = !state.isCategorizing;
  }
};

const actions: ActionTree<IQiitaState, RootState> = {
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
      commit("saveQiitaAccountId", authenticatedUser.id);

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
        qiitaAccountId: state.qiitaAccountId,
        permanentId: state.permanentId,
        accessToken: state.accessToken
      };

      const createAccountResponse: ICreateAccountResponse = await createAccount(
        createAccountRequest
      );

      commit("saveSessionId", createAccountResponse._embedded.sessionId);

      localStorage.save(
        STORAGE_KEY_SESSION_ID,
        createAccountResponse._embedded.sessionId
      );

      router.push({
        name: "stocks"
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
        qiitaAccountId: state.qiitaAccountId,
        permanentId: state.permanentId,
        accessToken: state.accessToken
      };

      const issueAccessTokensResponse: IIssueLoginSessionResponse = await issueLoginSession(
        issueLoginSessionRequest
      );

      commit("saveSessionId", issueAccessTokensResponse.sessionId);

      localStorage.save(
        STORAGE_KEY_SESSION_ID,
        issueAccessTokensResponse.sessionId
      );

      router.push({
        name: "stocks"
      });
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  logout: async ({ commit }) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const logoutRequest: ILogoutRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId
      };

      await logout(logoutRequest);

      localStorage.remove(STORAGE_KEY_SESSION_ID);
      commit("saveSessionId", "");

      router.push({
        name: "home"
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
      commit("saveSessionId", "");

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
        categoryId: saveCategoryResponse.categoryId,
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
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const fetchCategoriesRequest: IFetchCategoriesRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId
      };

      const categories: IFetchCategoriesResponse[] = await fetchCategories(
        fetchCategoriesRequest
      );

      commit("saveCategory", categories);
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  updateCategory: async (
    { commit },
    updateCategoryItem: IUpdateCategoryPayload
  ) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const updateCategoryRequest: IUpdateCategoryRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId,
        categoryId: updateCategoryItem.stateCategory.categoryId,
        name: updateCategoryItem.categoryName
      };

      const updateCategoryResponse: IUpdateCategoryResponse = await updateCategory(
        updateCategoryRequest
      );

      commit("updateCategory", {
        stateCategory: updateCategoryItem.stateCategory,
        categoryName: updateCategoryResponse.name
      });
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  fetchStock: async (
    { commit },
    page: IPage = { page: "1", perPage: "20", relation: "" }
  ) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const fetchStockRequest: IFetchStockRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId,
        page: page.page,
        parPage: page.perPage
      };

      const fetchStockResponse: IFetchStockResponse = await fetchStocks(
        fetchStockRequest
      );

      for (const stock of fetchStockResponse.stocks) {
        const date: string[] = stock.article_created_at.split(" ");
        stock.article_created_at = date[0];
      }

      commit("saveStocks", fetchStockResponse.stocks);
      commit("savePaging", fetchStockResponse.paging);
    } catch (error) {
      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  setIsCategorizing: async ({ commit }) => {
    commit("setIsCategorizing");
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

export const QiitaModule: Module<IQiitaState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
