import Vue from "vue";
import Vuex, { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IQiitaState } from "@/types/qiita";
import { RootState } from "@/store";
import {
  cancelAccount,
  categorize,
  createAccount,
  fetchAuthenticatedUser,
  fetchCategories,
  fetchStocks,
  IAuthorizationRequest,
  IAuthorizationResponse,
  ICancelAccountRequest,
  ICategorizeRequest,
  ICategory,
  ICreateAccountRequest,
  ICreateAccountResponse,
  IFetchAuthenticatedUserRequest,
  IFetchAuthenticatedUserResponse,
  IFetchCategoriesRequest,
  IFetchCategoriesResponse,
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
  updateCategory,
  IFetchCategorizedStockRequest,
  fetchCategorizedStocks,
  IFetchCategorizedStockResponse,
  ICategorizedStock,
  IDestroyCategoryRequest,
  destroyCategory
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

export interface ICategorizePayload {
  categoryId: number;
  stockArticleIds: string[];
}

export interface IfetchCategorizedStockPayload {
  page: IPage;
  categoryId: number;
}

const state: IQiitaState = {
  authorizationCode: "",
  qiitaAccountId: "",
  accessToken: "",
  permanentId: "",
  sessionId: localStorage.load(STORAGE_KEY_SESSION_ID) || "",
  categories: [],
  stocks: [],
  categorizedStocks: [],
  currentPage: 1,
  paging: [],
  displayCategoryId: 0,
  isCategorizing: false,
  isLoading: true
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
  categorizedStocks: (state): IQiitaState["categorizedStocks"] => {
    return state.categorizedStocks;
  },
  displayCategoryId: (state): IQiitaState["displayCategoryId"] => {
    return state.displayCategoryId;
  },
  isCategorizing: (state): IQiitaState["isCategorizing"] => {
    return state.isCategorizing;
  },
  isLoading: (state): IQiitaState["isLoading"] => {
    return state.isLoading;
  },
  checkedStockArticleIds: (state): string[] => {
    return state.stocks
      .filter(stock => stock.isChecked)
      .map(stock => stock.article_id);
  },
  checkedCategorizedStockArticleIds: (state): string[] => {
    return state.categorizedStocks
      .filter(categorizedStock => categorizedStock.isChecked)
      .map(categorizedStock => categorizedStock.article_id);
  },
  currentPage: (state): IQiitaState["currentPage"] => {
    return state.currentPage;
  },
  firstPage: (state): IPage => {
    const page: IPage | undefined = state.paging.find(page => {
      return page.relation === "first";
    });

    if (page !== undefined) {
      return page;
    } else {
      return { page: 0, perPage: 0, relation: "" };
    }
  },
  prevPage: (state): IPage => {
    const page: IPage | undefined = state.paging.find(page => {
      return page.relation === "prev";
    });

    if (page !== undefined) {
      return page;
    } else {
      return { page: 0, perPage: 0, relation: "" };
    }
  },
  nextPage: (state): IPage => {
    const page: IPage | undefined = state.paging.find(page => {
      return page.relation === "next";
    });

    if (page !== undefined) {
      return page;
    } else {
      return { page: 0, perPage: 0, relation: "" };
    }
  },
  lastPage: (state): IPage => {
    const page: IPage | undefined = state.paging.find(page => {
      return page.relation === "last";
    });

    if (page !== undefined) {
      return page;
    } else {
      return { page: 0, perPage: 0, relation: "" };
    }
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
  removeCategory: (state, categoryId: number) => {
    state.categories = state.categories.filter(
      category => category.categoryId !== categoryId
    );
  },
  saveStocks: (state, stocks: IUncategorizedStock[]) => {
    state.stocks = stocks;
  },
  saveCategorizedStocks: (state, stocks: ICategorizedStock[]) => {
    state.categorizedStocks = stocks;
  },
  removeCategorizedStocks: (state, stockArticleIds: string[]) => {
    state.categorizedStocks = state.categorizedStocks.filter(
      categorizedStock =>
        stockArticleIds.indexOf(categorizedStock.article_id) < 0
    );
  },
  savePaging: (state, paging: IPage[]) => {
    state.paging = paging;
  },
  saveCurrentPage: (state, currentPage: number) => {
    state.currentPage = currentPage;
  },
  saveDisplayCategoryId: (state, categoryID: number) => {
    state.displayCategoryId = categoryID;
  },
  setIsCategorizing: state => {
    state.isCategorizing = !state.isCategorizing;
  },
  restIsCategorizing: state => {
    state.isCategorizing = false;
  },
  setIsLoading: (state, isLoading: boolean) => {
    state.isLoading = isLoading;
  },
  checkStock: (state, { stock, isChecked }) => {
    stock.isChecked = isChecked;
  },
  uncheckStock: state => {
    state.stocks
      .filter(stock => stock.isChecked)
      .map(stock => (stock.isChecked = !stock.isChecked));
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
      for (const stock of fetchStockResponse.stocks) {
        const date: string[] = stock.article_created_at.split(" ");
        stock.article_created_at = date[0];
        const uncategorizedStock: IUncategorizedStock = Object.assign(stock, {
          isChecked: false
        });
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
  categorize: async ({ commit }, categorizePayload: ICategorizePayload) => {
    try {
      const sessionId = localStorage.load(STORAGE_KEY_SESSION_ID);
      const categorizeRequest: ICategorizeRequest = {
        apiUrlBase: apiUrlBase(),
        sessionId: sessionId,
        categoryId: categorizePayload.categoryId,
        articleIds: categorizePayload.stockArticleIds
      };

      await categorize(categorizeRequest);
      commit("uncheckStock");
      commit("removeCategorizedStocks", categorizePayload.stockArticleIds);
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
  resetData: ({ commit }): void => {
    commit("saveDisplayCategoryId", 0);
    commit("restIsCategorizing");
    commit("saveCurrentPage", 1);
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

export const QiitaModule: Module<IQiitaState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
