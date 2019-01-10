import { IQiitaState } from "@/types/qiita";
import {
  ICategorizedStock,
  ICategory,
  ICreateAccountResponse,
  IIssueLoginSessionResponse,
  IUncategorizedStock,
  IFetchedCategorizedStock,
  IIssueAccessTokensResponse,
  IFetchAuthenticatedUserResponse,
  IAuthorizationResponse,
  ISaveCategoryResponse,
  IFetchCategoriesResponse,
  IUpdateCategoryResponse,
  IStock,
  IPage
} from "@/domain/qiita";
import {
  ICategorizePayload,
  QiitaModule,
  IfetchCategorizedStockPayload
} from "@/store/modules/qiita";
import axios from "axios";

jest.mock("@/domain/Qiita");
jest.mock("axios");

describe("QiitaModule", () => {
  describe("getters", () => {
    let state: IQiitaState;
    const stocks: IUncategorizedStock[] = [
      {
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"],
        isChecked: true
      },
      {
        article_id: "c0a2609ae61a72dcc60f",
        title: "title2",
        user_id: "test-user12",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["Vue.js", "Vuex", "TypeScript"],
        isChecked: false
      }
    ];

    const categorizedStocks: ICategorizedStock[] = [
      {
        id: 1,
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"],
        isChecked: true
      },
      {
        id: 2,
        article_id: "c0a2609ae61a72dcc60f",
        title: "title2",
        user_id: "test-user12",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["Vue.js", "Vuex", "TypeScript"],
        isChecked: false
      }
    ];
    const firstPage: IPage = {
      page: 1,
      perPage: 20,
      relation: "first"
    };
    const prevPage: IPage = {
      page: 2,
      perPage: 20,
      relation: "prev"
    };
    const nextPage: IPage = {
      page: 3,
      perPage: 20,
      relation: "next"
    };
    const lastPage: IPage = {
      page: 5,
      perPage: 20,
      relation: "last"
    };

    const categories = [
      { categoryId: 1, name: "category1" },
      { categoryId: 2, name: "category2" }
    ];

    beforeEach(() => {
      state = {
        authorizationCode: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        accessToken: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0",
        qiitaAccountId: "test-user",
        permanentId: "1",
        sessionId: "",
        categories: categories,
        stocks: stocks,
        categorizedStocks: categorizedStocks,
        currentPage: 1,
        paging: [firstPage, prevPage, nextPage, lastPage],
        displayCategoryId: 2,
        isCategorizing: false,
        isLoading: false
      };
    });

    it("should be able to get authorizationCode", () => {
      const wrapper = (getters: any) => getters.authorizationCode(state);
      const authorizationCode: IQiitaState["authorizationCode"] = wrapper(
        QiitaModule.getters
      );

      expect(authorizationCode).toEqual(state.authorizationCode);
    });

    it("should be able to get accessToken", () => {
      const wrapper = (getters: any) => getters.accessToken(state);
      const accessToken: IQiitaState["accessToken"] = wrapper(
        QiitaModule.getters
      );

      expect(accessToken).toEqual(state.accessToken);
    });

    it("should be able to get permanentId", () => {
      const wrapper = (getters: any) => getters.permanentId(state);
      const permanentId: IQiitaState["permanentId"] = wrapper(
        QiitaModule.getters
      );

      expect(permanentId).toEqual(state.permanentId);
    });

    it("should be able to get isLoggedIn", () => {
      const wrapper = (getters: any) => getters.isLoggedIn(state);
      const isLoggedIn: boolean = wrapper(QiitaModule.getters);

      expect(isLoggedIn).toEqual(false);
    });

    it("should be able to get categories", () => {
      const wrapper = (getters: any) => getters.categories(state);
      const categories: IQiitaState["categories"] = wrapper(
        QiitaModule.getters
      );

      expect(categories).toEqual(state.categories);
    });

    it("should be able to get display categories", () => {
      const wrapper = (getters: any) => getters.displayCategories(state);
      const displayCategories: IQiitaState["categories"] = wrapper(
        QiitaModule.getters
      );

      expect(displayCategories).toEqual([state.categories[0]]);
    });

    it("should be able to get stocks", () => {
      const wrapper = (getters: any) => getters.stocks(state);
      const stocks: IQiitaState["stocks"] = wrapper(QiitaModule.getters);

      expect(stocks).toEqual(state.stocks);
    });

    it("should be able to get categorized stocks", () => {
      const wrapper = (getters: any) => getters.categorizedStocks(state);
      const categorizedStocks: IQiitaState["categorizedStocks"] = wrapper(
        QiitaModule.getters
      );

      expect(categorizedStocks).toEqual(state.categorizedStocks);
    });

    it("should be able to get displayCategoryId", () => {
      const wrapper = (getters: any) => getters.displayCategoryId(state);
      const displayCategoryId: IQiitaState["displayCategoryId"] = wrapper(
        QiitaModule.getters
      );

      expect(displayCategoryId).toEqual(state.displayCategoryId);
    });

    it("should be able to get isCategorizing", () => {
      const wrapper = (getters: any) => getters.isCategorizing(state);
      const isCategorizing: IQiitaState["isCategorizing"] = wrapper(
        QiitaModule.getters
      );

      expect(isCategorizing).toEqual(state.isCategorizing);
    });

    it("should be able to get isLoading", () => {
      const wrapper = (getters: any) => getters.isLoading(state);
      const isLoading: IQiitaState["isLoading"] = wrapper(QiitaModule.getters);

      expect(isLoading).toEqual(state.isLoading);
    });

    it("should be able to get checkedStockArticleIds", () => {
      const wrapper = (getters: any) => getters.checkedStockArticleIds(state);
      const checkedStockArticleIds: string[] = wrapper(QiitaModule.getters);

      expect(checkedStockArticleIds).toEqual([state.stocks[0].article_id]);
    });

    it("should be able to get checkedCategorizedStockArticleIds", () => {
      const wrapper = (getters: any) =>
        getters.checkedCategorizedStockArticleIds(state);
      const checkedCategorizedStockArticleIds: string[] = wrapper(
        QiitaModule.getters
      );

      expect(checkedCategorizedStockArticleIds).toEqual([
        state.categorizedStocks[0].article_id
      ]);
    });

    it("should be able to get currentPage", () => {
      const wrapper = (getters: any) => getters.currentPage(state);
      const currentPage: IQiitaState["currentPage"] = wrapper(
        QiitaModule.getters
      );

      expect(currentPage).toEqual(state.currentPage);
    });

    it("should be able to get firstPage", () => {
      const wrapper = (getters: any) => getters.firstPage(state);
      const expectedPage: IPage = wrapper(QiitaModule.getters);

      expect(expectedPage).toEqual(firstPage);
    });

    it("should be able to get prevPage", () => {
      const wrapper = (getters: any) => getters.prevPage(state);
      const expectedPage: IPage = wrapper(QiitaModule.getters);

      expect(expectedPage).toEqual(prevPage);
    });

    it("should be able to get nextPage", () => {
      const wrapper = (getters: any) => getters.nextPage(state);
      const expectedPage: IPage = wrapper(QiitaModule.getters);

      expect(expectedPage).toEqual(nextPage);
    });

    it("should be able to get lastPage", () => {
      const wrapper = (getters: any) => getters.lastPage(state);
      const expectedPage: IPage = wrapper(QiitaModule.getters);

      expect(expectedPage).toEqual(lastPage);
    });
  });

  describe("mutations", () => {
    let state: IQiitaState;

    beforeEach(() => {
      state = {
        authorizationCode: "",
        accessToken: "",
        qiitaAccountId: "",
        permanentId: "",
        sessionId: "",
        categories: [],
        stocks: [],
        categorizedStocks: [],
        currentPage: 1,
        paging: [],
        displayCategoryId: 0,
        isCategorizing: false,
        isLoading: false
      };
    });

    it("should be able to save authorizationCode", () => {
      const wrapper = (mutations: any) =>
        mutations.saveAuthorizationCode(
          state,
          "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"
        );
      wrapper(QiitaModule.mutations);

      expect(state.authorizationCode).toEqual(
        "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"
      );
    });

    it("should be able to save accessToken", () => {
      const wrapper = (mutations: any) =>
        mutations.saveAccessToken(
          state,
          "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
        );
      wrapper(QiitaModule.mutations);

      expect(state.accessToken).toEqual(
        "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
      );
    });

    it("should be able to save qiitaAccountId", () => {
      const wrapper = (mutations: any) =>
        mutations.saveQiitaAccountId(state, "test-user");
      wrapper(QiitaModule.mutations);

      expect(state.qiitaAccountId).toEqual("test-user");
    });

    it("should be able to save permanentId", () => {
      const wrapper = (mutations: any) => mutations.savePermanentId(state, "1");
      wrapper(QiitaModule.mutations);

      expect(state.permanentId).toEqual("1");
    });

    it("should be able to save sessionId", () => {
      const wrapper = (mutations: any) =>
        mutations.saveSessionId(state, "d690e4de-0a4e-4f14-a5c5-f4303fbd8a08");
      wrapper(QiitaModule.mutations);

      expect(state.sessionId).toEqual("d690e4de-0a4e-4f14-a5c5-f4303fbd8a08");
    });

    it("should be able to save categories", () => {
      const categories: ICategory[] = [
        {
          categoryId: 1,
          name: "テストカテゴリー1"
        },
        {
          categoryId: 2,
          name: "テストカテゴリー2"
        },
        {
          categoryId: 3,
          name: "テストカテゴリー3"
        }
      ];
      const wrapper = (mutations: any) =>
        mutations.saveCategory(state, categories);
      wrapper(QiitaModule.mutations);

      expect(state.categories).toEqual(categories);
    });

    it("should be able to add categories", () => {
      const category: ICategory = {
        categoryId: 1,
        name: "テストカテゴリー"
      };
      const wrapper = (mutations: any) =>
        mutations.addCategory(state, category);
      wrapper(QiitaModule.mutations);

      expect(state.categories[0]).toEqual(category);
    });

    it("should be able to update category", () => {
      state.categories = [{ categoryId: 1, name: "テストカテゴリ" }];

      const updateCategory: {
        stateCategory: ICategory;
        categoryName: string;
      } = {
        stateCategory: state.categories[0],
        categoryName: "編集したカテゴリ名"
      };

      const wrapper = (mutations: any) =>
        mutations.updateCategory(state, updateCategory);
      wrapper(QiitaModule.mutations);

      expect(state.categories[0].name).toEqual(updateCategory.categoryName);
    });

    it("should be able to remove category", () => {
      const categories = [
        { categoryId: 1, name: "テストカテゴリ" },
        { categoryId: 2, name: "テストカテゴリ2" },
        { categoryId: 3, name: "テストカテゴリ3" }
      ];
      state.categories = categories;

      const wrapper = (mutations: any) => mutations.removeCategory(state, 2);
      wrapper(QiitaModule.mutations);

      expect(state.categories).toEqual([categories[0], categories[2]]);
    });

    it("should be able to save stocks", () => {
      const stocks: IUncategorizedStock[] = [
        {
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"],
          isChecked: false
        },
        {
          article_id: "c0a2609ae61a72dcc60f",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"],
          isChecked: false
        }
      ];
      const wrapper = (mutations: any) => mutations.saveStocks(state, stocks);
      wrapper(QiitaModule.mutations);

      expect(state.stocks).toEqual(stocks);
    });

    it("should be able to update category to stocks", () => {
      state.stocks = [
        {
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"],
          isChecked: false,
          category: undefined
        },
        {
          article_id: "c0a2609ae61a72dcc60q",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"],
          isChecked: false,
          category: undefined
        }
      ];

      const expectedStocks: IUncategorizedStock[] = [
        {
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"],
          isChecked: false,
          category: { categoryId: 1, name: "categoryName" }
        },
        {
          article_id: "c0a2609ae61a72dcc60q",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"],
          isChecked: false,
          category: undefined
        }
      ];

      const payload = {
        stockArticleIds: ["c0a2609ae61a72dcc60f"],
        category: { categoryId: 1, name: "categoryName" }
      };
      const wrapper = (mutations: any) =>
        mutations.updateStockCategory(state, payload);
      wrapper(QiitaModule.mutations);

      expect(state.stocks).toEqual(expectedStocks);
    });

    it("should be able to save categorized stocks", () => {
      const categorizedStocks: ICategorizedStock[] = [
        {
          id: 1,
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"],
          isChecked: true
        },
        {
          id: 2,
          article_id: "c0a2609ae61a72dcc60f",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"],
          isChecked: false
        }
      ];
      const wrapper = (mutations: any) =>
        mutations.saveCategorizedStocks(state, categorizedStocks);
      wrapper(QiitaModule.mutations);

      expect(state.categorizedStocks).toEqual(categorizedStocks);
    });

    it("should be able to remove categorized stocks", () => {
      const categorizedStocks: ICategorizedStock[] = [
        {
          id: 1,
          article_id: "removeid111111111111",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"],
          isChecked: true
        },
        {
          id: 2,
          article_id: "c0a2609ae61a72dcc60f",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"],
          isChecked: false
        }
      ];
      const articleIds = ["removeid111111111111"];

      state.categorizedStocks = categorizedStocks;
      const wrapper = (mutations: any) =>
        mutations.removeCategorizedStocks(state, articleIds);
      wrapper(QiitaModule.mutations);

      expect(state.categorizedStocks).toEqual([categorizedStocks[1]]);
    });

    it("should be able to save paging", () => {
      const paging: IPage[] = [
        {
          page: 4,
          perPage: 20,
          relation: "next"
        },
        {
          page: 5,
          perPage: 20,
          relation: "last"
        },
        {
          page: 1,
          perPage: 20,
          relation: "first"
        },
        {
          page: 2,
          perPage: 20,
          relation: "prev"
        }
      ];

      const wrapper = (mutations: any) => mutations.savePaging(state, paging);
      wrapper(QiitaModule.mutations);

      expect(state.paging).toEqual(paging);
    });

    it("should be able to save currentPage", () => {
      const wrapper = (mutations: any) => mutations.saveCurrentPage(state, 2);
      wrapper(QiitaModule.mutations);
      expect(state.currentPage).toEqual(2);
    });

    it("should be able to save displayCategoryId", () => {
      const wrapper = (mutations: any) =>
        mutations.saveDisplayCategoryId(state, 3);
      wrapper(QiitaModule.mutations);
      expect(state.displayCategoryId).toEqual(3);
    });

    it("should be able to save isCategorizing", () => {
      const wrapper = (mutations: any) => mutations.setIsCategorizing(state);
      wrapper(QiitaModule.mutations);
      expect(state.isCategorizing).toEqual(true);
    });

    it("should be able to reset isCategorizing", () => {
      const wrapper = (mutations: any) => mutations.restIsCategorizing(state);
      wrapper(QiitaModule.mutations);
      expect(state.isCategorizing).toEqual(false);
    });

    it("should be able to save isLoading", () => {
      const wrapper = (mutations: any) => mutations.setIsLoading(state, true);
      wrapper(QiitaModule.mutations);
      expect(state.isLoading).toEqual(true);
    });

    it("should be able to check Stock", () => {
      const stock: IUncategorizedStock = {
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"],
        isChecked: false
      };

      const wrapper = (mutations: any) =>
        mutations.checkStock(state, { stock, isChecked: true });
      wrapper(QiitaModule.mutations);
      expect(stock.isChecked).toEqual(true);
    });

    it("should be able to check Categorized Stock", () => {
      const stock: ICategorizedStock = {
        id: 1,
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"],
        isChecked: false
      };

      const wrapper = (mutations: any) =>
        mutations.checkStock(state, { stock, isChecked: true });
      wrapper(QiitaModule.mutations);
      expect(stock.isChecked).toEqual(true);
    });
  });

  describe("actions", () => {
    it("should be able to create account", async () => {
      const mockPostResponse: { data: IIssueAccessTokensResponse } = {
        data: {
          client_id: "4f54451e86041b5c0a29419b4058f44b5ea04ae9",
          scopes: ["read_qiita"],
          token: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
        }
      };

      const mockGetResponse: { data: IFetchAuthenticatedUserResponse } = {
        data: {
          id: "test-user",
          permanent_id: "1"
        }
      };

      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockGetResponse);
      mockAxios.post.mockResolvedValue(mockPostResponse);

      const commit = jest.fn();
      const dispatch = jest.fn();

      const params: IAuthorizationResponse = {
        code: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        callbackState: "89bd7d77-b352-45f8-9585-388939d426ad",
        localState: "89bd7d77-b352-45f8-9585-388939d426ad"
      };

      const wrapper = (actions: any) =>
        actions.fetchUser(
          { dispatch, commit },
          { params: params, accountAction: "signUp" }
        );
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["saveAuthorizationCode", "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"],
        ["saveAccessToken", "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"],
        ["savePermanentId", "1"],
        ["saveQiitaAccountId", "test-user"]
      ]);

      expect(dispatch.mock.calls).toEqual([["createAccount"]]);
    });

    it("should be able to save sessionId when create account", async () => {
      const sessionId = "d690e4de-0a4e-4f14-a5c5-f4303fbd8a08";
      const mockResponse: { data: ICreateAccountResponse } = {
        data: {
          accountId: "1",
          _embedded: {
            sessionId: sessionId
          }
        }
      };

      const mockAxios: any = axios;
      mockAxios.post.mockResolvedValue(mockResponse);

      const commit = jest.fn();

      const wrapper = (actions: any) => actions.createAccount({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([["saveSessionId", sessionId]]);
    });

    it("should be able to login", async () => {
      const mockPostResponse: { data: IIssueAccessTokensResponse } = {
        data: {
          client_id: "4f54451e86041b5c0a29419b4058f44b5ea04ae9",
          scopes: ["read_qiita"],
          token: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"
        }
      };

      const mockGetResponse: { data: IFetchAuthenticatedUserResponse } = {
        data: {
          id: "test-user",
          permanent_id: "1"
        }
      };

      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockGetResponse);
      mockAxios.post.mockResolvedValue(mockPostResponse);

      const commit = jest.fn();
      const dispatch = jest.fn();

      const params: IAuthorizationResponse = {
        code: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        callbackState: "89bd7d77-b352-45f8-9585-388939d426ad",
        localState: "89bd7d77-b352-45f8-9585-388939d426ad"
      };

      const wrapper = (actions: any) =>
        actions.fetchUser(
          { dispatch, commit },
          { params: params, accountAction: "login" }
        );
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["saveAuthorizationCode", "34d97d024861f098d2e45fb4d9ed7757f97f5b0f"],
        ["saveAccessToken", "72d79c218c16c65b8076c7de8ef6ec55504ca6a0"],
        ["savePermanentId", "1"],
        ["saveQiitaAccountId", "test-user"]
      ]);

      expect(dispatch.mock.calls).toEqual([["issueLoginSession"]]);
    });

    it("should be able to save sessionId when login", async () => {
      const sessionId = "d690e4de-0a4e-4f14-a5c5-f4303fbd8a08";
      const mockResponse: { data: IIssueLoginSessionResponse } = {
        data: {
          sessionId: sessionId
        }
      };

      const mockAxios: any = axios;
      mockAxios.post.mockResolvedValue(mockResponse);

      const commit = jest.fn();

      const wrapper = (actions: any) => actions.issueLoginSession({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([["saveSessionId", sessionId]]);
    });

    it("should be able to logout", async () => {
      const mockAxios: any = axios;
      mockAxios.delete.mockResolvedValue({});
      const commit = jest.fn();

      const wrapper = (actions: any) => actions.logout({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([["saveSessionId", ""]]);
    });

    it("should be able to cancel", async () => {
      const mockAxios: any = axios;
      mockAxios.delete.mockResolvedValue({});
      const commit = jest.fn();

      const wrapper = (actions: any) => actions.cancel({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([["saveSessionId", ""]]);
    });

    it("should not commit when callbackState don't match localState", async () => {
      const commit = jest.fn();

      const params: IAuthorizationResponse = {
        code: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        callbackState: "callbackState-45f8-9585-388939d426ad",
        localState: "localState-52-45f8-9585-388939d426ad"
      };

      const wrapper = (actions: any) =>
        actions.fetchUser(
          { commit },
          { params: params, accountAction: "signUp" }
        );
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([]);
    });

    it("should be able to save category", async () => {
      const categoryId = 1;
      const categoryName: string = "テストカテゴリー";

      const mockPostResponse: { data: ISaveCategoryResponse } = {
        data: {
          categoryId: categoryId,
          name: categoryName
        }
      };

      const mockAxios: any = axios;
      mockAxios.post.mockResolvedValue(mockPostResponse);

      const commit = jest.fn();

      const wrapper = (actions: any) =>
        actions.saveCategory({ commit }, categoryName);
      await wrapper(QiitaModule.actions);

      const savedCategory: ICategory = {
        categoryId: categoryId,
        name: categoryName
      };

      expect(commit.mock.calls).toEqual([["addCategory", savedCategory]]);
    });

    it("should be able to fetch categories", async () => {
      const categories: IFetchCategoriesResponse[] = [
        {
          categoryId: 1,
          name: "テストカテゴリー1"
        },
        {
          categoryId: 2,
          name: "テストカテゴリー2"
        },
        {
          categoryId: 3,
          name: "テストカテゴリー3"
        }
      ];

      const mockPostResponse: { data: IFetchCategoriesResponse[] } = {
        data: categories
      };

      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockPostResponse);

      const commit = jest.fn();

      const wrapper = (actions: any) => actions.fetchCategory({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([["saveCategory", categories]]);
    });

    it("should be able to update category", async () => {
      const updateCategoryItem: {
        stateCategory: ICategory;
        categoryName: string;
      } = {
        stateCategory: { categoryId: 1, name: "テストカテゴリ" },
        categoryName: "編集したカテゴリ名"
      };

      const mockPostResponse: { data: IUpdateCategoryResponse } = {
        data: {
          categoryId: updateCategoryItem.stateCategory.categoryId,
          name: updateCategoryItem.categoryName
        }
      };

      const mockAxios: any = axios;
      mockAxios.patch.mockResolvedValue(mockPostResponse);

      const commit = jest.fn();

      const wrapper = (actions: any) =>
        actions.updateCategory({ commit }, updateCategoryItem);
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["updateCategory", updateCategoryItem]
      ]);
    });

    it("should be able to remove category", async () => {
      const mockAxios: any = axios;
      mockAxios.delete.mockResolvedValue({});
      const commit = jest.fn();

      const categoryId = 1;
      const wrapper = (actions: any) =>
        actions.destroyCategory({ commit }, categoryId);
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([["removeCategory", categoryId]]);
    });

    it("should be able to fetch stocks", async () => {
      const responseData: { stock: IStock; category?: ICategory }[] = [
        {
          stock: {
            article_id: "c0a2609ae61a72dcc60f",
            title: "title1",
            user_id: "test-user1",
            profile_image_url: "https://test.com/test/image",
            article_created_at: "2018/09/30",
            tags: ["laravel", "php"]
          },
          category: {
            categoryId: 1,
            name: "categoryName"
          }
        },
        {
          stock: {
            article_id: "c0a2609ae61a72dcc60f",
            title: "title2",
            user_id: "test-user12",
            profile_image_url: "https://test.com/test/image",
            article_created_at: "2018/09/30",
            tags: ["Vue.js", "Vuex", "TypeScript"]
          }
        }
      ];

      const expectedStocks: IUncategorizedStock[] = [
        {
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"],
          isChecked: false,
          category: {
            categoryId: 1,
            name: "categoryName"
          }
        },
        {
          article_id: "c0a2609ae61a72dcc60f",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"],
          isChecked: false,
          category: undefined
        }
      ];

      const paging: IPage[] = [
        {
          page: 4,
          perPage: 20,
          relation: "next"
        },
        {
          page: 5,
          perPage: 20,
          relation: "last"
        },
        {
          page: 1,
          perPage: 20,
          relation: "first"
        },
        {
          page: 2,
          perPage: 20,
          relation: "prev"
        }
      ];

      const link =
        '<http://127.0.0.1/api/stocks?page=4&per_page=20>; rel="next",' +
        '<http://127.0.0.1/api/stocks?page=5&per_page=20>; rel="last",' +
        '<http://127.0.0.1/api/stocks?page=1&per_page=20>; rel="first",' +
        '<http://127.0.0.1/api/stocks?page=2&per_page=20>; rel="prev"';

      const mockResponse: { data: any; headers: any } = {
        data: responseData,
        headers: {
          link: link
        }
      };

      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockResponse);

      const commit = jest.fn();

      const wrapper = (actions: any) => actions.fetchStock({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["setIsLoading", true],
        ["saveStocks", expectedStocks],
        ["savePaging", paging],
        ["saveCurrentPage", 1],
        ["setIsLoading", false]
      ]);
    });

    it("should be able to fetch categorized stock", async () => {
      const stocks: IFetchedCategorizedStock[] = [
        {
          id: 1,
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"]
        },
        {
          id: 2,
          article_id: "c0a2609ae61a72dcc60f",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"]
        }
      ];

      const saveStocks: ICategorizedStock[] = [
        {
          id: 1,
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"],
          isChecked: false
        },
        {
          id: 2,
          article_id: "c0a2609ae61a72dcc60f",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"],
          isChecked: false
        }
      ];

      const paging: IPage[] = [
        {
          page: 4,
          perPage: 20,
          relation: "next"
        },
        {
          page: 5,
          perPage: 20,
          relation: "last"
        },
        {
          page: 1,
          perPage: 20,
          relation: "first"
        },
        {
          page: 2,
          perPage: 20,
          relation: "prev"
        }
      ];

      const link =
        '<http://127.0.0.1/api/stocks?page=4&per_page=20>; rel="next",' +
        '<http://127.0.0.1/api/stocks?page=5&per_page=20>; rel="last",' +
        '<http://127.0.0.1/api/stocks?page=1&per_page=20>; rel="first",' +
        '<http://127.0.0.1/api/stocks?page=2&per_page=20>; rel="prev"';

      const mockResponse: { data: any; headers: any } = {
        data: stocks,
        headers: {
          link: link
        }
      };

      const payload: IfetchCategorizedStockPayload = {
        page: { page: 3, perPage: 20, relation: "" },
        categoryId: 1
      };

      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockResponse);

      const commit = jest.fn();

      const wrapper = (actions: any) =>
        actions.fetchCategorizedStock({ commit }, payload);
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["setIsLoading", true],
        ["saveCategorizedStocks", saveStocks],
        ["savePaging", paging],
        ["saveCurrentPage", 3],
        ["setIsLoading", false]
      ]);
    });

    it("should be able to categorize", async () => {
      const commit = jest.fn();
      const wrapper = (actions: any) => actions.setIsCategorizing({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([["setIsCategorizing"]]);
    });

    it("should be able to uncheck Stock", async () => {
      const categorizePayload: ICategorizePayload = {
        category: { categoryId: 1, name: "category" },
        stockArticleIds: ["c0a2609ae61a72dcc60f", "c0a2609ae61a72dcc60a"]
      };

      const commit = jest.fn();
      const wrapper = (actions: any) =>
        actions.categorize({ commit }, categorizePayload);
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["uncheckStock"],
        ["removeCategorizedStocks", categorizePayload.stockArticleIds],
        [
          "updateStockCategory",
          {
            stockArticleIds: categorizePayload.stockArticleIds,
            category: categorizePayload.category
          }
        ]
      ]);
    });

    it("should be able to check Stock", async () => {
      const stock: IUncategorizedStock = {
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"],
        isChecked: true
      };

      const commit = jest.fn();
      const wrapper = (actions: any) => actions.checkStock({ commit }, stock);
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["checkStock", { stock, isChecked: !stock.isChecked }]
      ]);
    });

    it("should be able to check Categorized Stock", async () => {
      const stock: ICategorizedStock = {
        id: 1,
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"],
        isChecked: true
      };

      const commit = jest.fn();
      const wrapper = (actions: any) =>
        actions.checkCategorizedStock({ commit }, stock);
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["checkCategorizedStock", { stock, isChecked: !stock.isChecked }]
      ]);
    });

    it("should be able to reset data", async () => {
      const commit = jest.fn();
      const wrapper = (actions: any) => actions.resetData({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["saveDisplayCategoryId", 0],
        ["restIsCategorizing"],
        ["saveCurrentPage", 1],
        ["saveStocks", []],
        ["saveCategorizedStocks", []]
      ]);
    });

    it("should be able to save displayCategoryId", async () => {
      const categoryId = 4;
      const commit = jest.fn();
      const wrapper = (actions: any) =>
        actions.saveDisplayCategoryId({ commit }, categoryId);
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["saveDisplayCategoryId", categoryId]
      ]);
    });
  });
});
