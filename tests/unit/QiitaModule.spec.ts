import { IQiitaState } from "@/types/qiita";
import {
  ICategory,
  ICreateAccountResponse,
  IIssueLoginSessionResponse
} from "@/domain/qiita";
import { QiitaModule } from "@/store/modules/qiita";
import axios from "axios";
import {
  IIssueAccessTokensResponse,
  IFetchAuthenticatedUserResponse,
  IAuthorizationResponse,
  ISaveCategoryResponse,
  IFetchCategoriesResponse,
  IUpdateCategoryResponse,
  IStock,
  IPage
} from "@/domain/qiita";

jest.mock("@/domain/Qiita");
jest.mock("axios");

describe("QiitaModule", () => {
  describe("getters", () => {
    let state: IQiitaState;
    const stocks: IStock[] = [
      {
        id: "1",
        article_id: "c0a2609ae61a72dcc60f",
        title: "title1",
        user_id: "test-user1",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["laravel", "php"]
      },
      {
        id: "2",
        article_id: "c0a2609ae61a72dcc60f",
        title: "title2",
        user_id: "test-user12",
        profile_image_url: "https://test.com/test/image",
        article_created_at: "2018/09/30",
        tags: ["Vue.js", "Vuex", "TypeScript"]
      }
    ];

    beforeEach(() => {
      state = {
        authorizationCode: "34d97d024861f098d2e45fb4d9ed7757f97f5b0f",
        accessToken: "72d79c218c16c65b8076c7de8ef6ec55504ca6a0",
        qiitaAccountId: "test-user",
        permanentId: "1",
        sessionId: "",
        categories: [],
        stocks: stocks,
        paging: [],
        isCategorizing: false
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

    it("should be able to get stocks", () => {
      const wrapper = (getters: any) => getters.stocks(state);
      const stocks: IQiitaState["stocks"] = wrapper(QiitaModule.getters);

      expect(stocks).toEqual(state.stocks);
    });

    it("should be able to get isCategorizing", () => {
      const wrapper = (getters: any) => getters.isCategorizing(state);
      const isCategorizing: IQiitaState["isCategorizing"] = wrapper(
        QiitaModule.getters
      );

      expect(isCategorizing).toEqual(state.isCategorizing);
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
        paging: [],
        isCategorizing: false
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

    it("should be able to save stocks", () => {
      const stocks: IStock[] = [
        {
          id: "1",
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"]
        },
        {
          id: "2",
          article_id: "c0a2609ae61a72dcc60f",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"]
        }
      ];
      const wrapper = (mutations: any) => mutations.saveStocks(state, stocks);
      wrapper(QiitaModule.mutations);

      expect(state.stocks).toEqual(stocks);
    });

    it("should be able to save paging", () => {
      const paging: IPage[] = [
        {
          page: "4",
          perPage: "20",
          relation: "next"
        },
        {
          page: "5",
          perPage: "20",
          relation: "last"
        },
        {
          page: "1",
          perPage: "20",
          relation: "first"
        },
        {
          page: "2",
          perPage: "20",
          relation: "prev"
        }
      ];

      const wrapper = (mutations: any) => mutations.savePaging(state, paging);
      wrapper(QiitaModule.mutations);

      expect(state.paging).toEqual(paging);
    });

    it("should be able to save isCategorizing", () => {
      const wrapper = (mutations: any) => mutations.setIsCategorizing(state);
      wrapper(QiitaModule.mutations);
      expect(state.isCategorizing).toEqual(true);
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

    it("should be able to fetch stocks", async () => {
      const stocks: IStock[] = [
        {
          id: "1",
          article_id: "c0a2609ae61a72dcc60f",
          title: "title1",
          user_id: "test-user1",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["laravel", "php"]
        },
        {
          id: "2",
          article_id: "c0a2609ae61a72dcc60f",
          title: "title2",
          user_id: "test-user12",
          profile_image_url: "https://test.com/test/image",
          article_created_at: "2018/09/30",
          tags: ["Vue.js", "Vuex", "TypeScript"]
        }
      ];

      const paging: IPage[] = [
        {
          page: "4",
          perPage: "20",
          relation: "next"
        },
        {
          page: "5",
          perPage: "20",
          relation: "last"
        },
        {
          page: "1",
          perPage: "20",
          relation: "first"
        },
        {
          page: "2",
          perPage: "20",
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

      const mockAxios: any = axios;
      mockAxios.get.mockResolvedValue(mockResponse);

      const commit = jest.fn();

      const wrapper = (actions: any) => actions.fetchStock({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([
        ["saveStocks", stocks],
        ["savePaging", paging]
      ]);
    });

    it("should be able to set isCategorizing", async () => {
      const commit = jest.fn();
      const wrapper = (actions: any) => actions.setIsCategorizing({ commit });
      await wrapper(QiitaModule.actions);

      expect(commit.mock.calls).toEqual([["setIsCategorizing"]]);
    });
  });
});
