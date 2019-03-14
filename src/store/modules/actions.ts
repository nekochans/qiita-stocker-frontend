import { ActionTree } from "vuex";
import { IQiitaState } from "@/types/qiita";
import { RootState } from "@/store";
import {
  cancelAccount,
  cancelCategorization,
  categorize,
  createAccount,
  destroyCategory,
  fetchAuthenticatedUser,
  fetchCategories,
  fetchCategorizedStocks,
  fetchStocks,
  IAuthorizationRequest,
  IAuthorizationResponse,
  ICancelAccountRequest,
  ICancelCategorizationRequest,
  ICategorizedStock,
  ICategorizeRequest,
  ICategory,
  ICreateAccountRequest,
  ICreateAccountResponse,
  IDestroyCategoryRequest,
  IFetchAuthenticatedUserRequest,
  IFetchAuthenticatedUserResponse,
  IFetchCategoriesRequest,
  IFetchCategoriesResponse,
  IFetchCategorizedStockRequest,
  IFetchCategorizedStockResponse,
  IFetchStockRequest,
  IFetchStockResponse,
  IIssueAccessTokensRequest,
  IIssueAccessTokensResponse,
  IIssueLoginSessionRequest,
  IIssueLoginSessionResponse,
  ILogoutRequest,
  IPage,
  ISaveCategoryRequest,
  ISaveCategoryResponse,
  issueAccessToken,
  issueLoginSession,
  IUncategorizedStock,
  IUpdateCategoryRequest,
  IUpdateCategoryResponse,
  logout,
  matchState,
  requestToAuthorizationServer,
  saveCategory,
  stateNotMatchedMessage,
  STORAGE_KEY_ACCOUNT_ACTION,
  STORAGE_KEY_AUTH_STATE,
  STORAGE_KEY_SESSION_ID,
  unauthorizedMessage,
  updateCategory
} from "@/domain/qiita";
import { router } from "@/router";
import uuid from "uuid";
import { state } from "./state";
import LocalStorageFactory from "@/factory/repository/LocalStorageFactory";

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

export interface ICategorizePayload {
  category: ICategory;
  stockArticleIds: string[];
}

export interface IfetchCategorizedStockPayload {
  page: IPage;
  categoryId: number;
}

export const actions: ActionTree<IQiitaState, RootState> = {
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
    }
    localStorage.remove(STORAGE_KEY_AUTH_STATE);
    localStorage.remove(STORAGE_KEY_ACCOUNT_ACTION);
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
    }
    localStorage.remove(STORAGE_KEY_AUTH_STATE);
    localStorage.remove(STORAGE_KEY_ACCOUNT_ACTION);
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
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

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
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

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
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

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
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

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
      commit("updateStockCategoryName", {
        categoryId: updateCategoryItem.stateCategory.categoryId,
        name: updateCategoryResponse.name
      });
    } catch (error) {
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  destroyCategory: async ({ commit }, categoryId: number) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const destroyCategoryRequest: IDestroyCategoryRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId,
        categoryId: categoryId
      };

      await destroyCategory(destroyCategoryRequest);
      commit("removeCategory", categoryId);
      commit("removeCategoryFromStock", categoryId);
      if (state.displayCategoryId === categoryId)
        return commit("saveDisplayCategoryId", 0);
    } catch (error) {
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  fetchStock: async (
    { commit },
    page: IPage = { page: state.currentPage, perPage: 20, relation: "" }
  ) => {
    try {
      commit("setIsLoading", true);

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

      let uncategorizedStocks: IUncategorizedStock[] = [];
      for (const fetchStock of fetchStockResponse.stocks) {
        const date: string[] = fetchStock.stock.article_created_at.split(" ");
        fetchStock.stock.article_created_at = date[0];
        const uncategorizedStock: IUncategorizedStock = Object.assign(
          fetchStock.stock,
          { isChecked: false, category: fetchStock.category }
        );
        uncategorizedStocks.push(uncategorizedStock);
      }

      commit("saveStocks", uncategorizedStocks);
      commit("savePaging", fetchStockResponse.paging);
      commit("saveCurrentPage", page.page);
      commit("setIsLoading", false);
    } catch (error) {
      commit("setIsLoading", false);
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  fetchCategorizedStock: async (
    { commit },
    payload: IfetchCategorizedStockPayload
  ) => {
    try {
      commit("setIsLoading", true);

      if (payload.page.page === 0) {
        payload.page = {
          page: 1,
          perPage: 20,
          relation: ""
        };
      }

      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const fetchCategorizedStockRequest: IFetchCategorizedStockRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId,
        categoryId: payload.categoryId,
        page: payload.page.page,
        parPage: payload.page.perPage
      };

      const fetchCategorizedStockResponse: IFetchCategorizedStockResponse = await fetchCategorizedStocks(
        fetchCategorizedStockRequest
      );

      let categorizedStocks: ICategorizedStock[] = [];
      for (const stock of fetchCategorizedStockResponse.stocks) {
        const date: string[] = stock.article_created_at.split(" ");
        stock.article_created_at = date[0];
        const categorizedStock: ICategorizedStock = Object.assign(stock, {
          isChecked: false
        });
        categorizedStocks.push(categorizedStock);
      }

      commit("saveCategorizedStocks", categorizedStocks);
      commit("savePaging", fetchCategorizedStockResponse.paging);
      commit("saveCurrentPage", payload.page.page);
      commit("setIsLoading", false);
    } catch (error) {
      commit("setIsLoading", false);
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  setIsCategorizing: async ({ commit }) => {
    commit("setIsCategorizing");
  },
  setIsCancelingCategorization: async ({ commit }) => {
    commit("setIsCancelingCategorization");
  },
  categorize: async ({ commit }, categorizePayload: ICategorizePayload) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const categorizeRequest: ICategorizeRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId,
        categoryId: categorizePayload.category.categoryId,
        articleIds: categorizePayload.stockArticleIds
      };

      await categorize(categorizeRequest);
      commit("uncheckStock");
      commit("removeCategorizedStocks", categorizePayload.stockArticleIds);
      commit("updateStockCategory", {
        stockArticleIds: categorizePayload.stockArticleIds,
        category: categorizePayload.category
      });
    } catch (error) {
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  cancelCategorization: async ({ commit }, categorizedStockId: number) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const cancelCategorizationRequest: ICancelCategorizationRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId,
        id: categorizedStockId
      };

      await cancelCategorization(cancelCategorizationRequest);
      commit("removeCategorizedStocksById", categorizedStockId);
    } catch (error) {
      if (isUnauthorized(error.response.status)) {
        localStorage.remove(STORAGE_KEY_SESSION_ID);
        commit("saveSessionId", "");
      }

      router.push({
        name: "error",
        params: { errorMessage: error.response.data.message }
      });
      return;
    }
  },
  checkStock: ({ commit }, stock: IUncategorizedStock): void => {
    commit("checkStock", { stock, isChecked: !stock.isChecked });
  },
  checkCategorizedStock: ({ commit }, stock: ICategorizedStock): void => {
    commit("checkCategorizedStock", { stock, isChecked: !stock.isChecked });
  },
  resetData: ({ commit }): void => {
    commit("resetData");
    commit("saveStocks", []);
    commit("saveCategorizedStocks", []);
  },
  saveDisplayCategoryId: ({ commit }, categoryId: number): void => {
    commit("saveDisplayCategoryId", categoryId);
  }
};

const isUnauthorized = (statusCode: number): boolean => {
  return statusCode === 401;
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
