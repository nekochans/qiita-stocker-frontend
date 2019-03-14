import {
  IAuthorizationResponse,
  ICategorizedStock,
  ICategory,
  ICreateAccountResponse,
  IFetchAuthenticatedUserResponse,
  IFetchCategoriesResponse,
  IFetchedCategorizedStock,
  IIssueAccessTokensResponse,
  IIssueLoginSessionResponse,
  IPage,
  ISaveCategoryResponse,
  IStock,
  IUncategorizedStock,
  IUpdateCategoryResponse
} from "@/domain/qiita";
import axios from "axios";
import { QiitaModule } from "@/store/modules/qiita";
import {
  ICategorizePayload,
  IfetchCategorizedStockPayload
} from "@/store/modules/actions";

jest.mock("axios");

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
      ["updateCategory", updateCategoryItem],
      [
        "updateStockCategoryName",
        {
          categoryId: updateCategoryItem.stateCategory.categoryId,
          name: updateCategoryItem.categoryName
        }
      ]
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

    expect(commit.mock.calls).toEqual([
      ["removeCategory", categoryId],
      ["removeCategoryFromStock", categoryId]
    ]);
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

  it("should be able to set isCategorizing", async () => {
    const commit = jest.fn();
    const wrapper = (actions: any) => actions.setIsCategorizing({ commit });
    await wrapper(QiitaModule.actions);

    expect(commit.mock.calls).toEqual([["setIsCategorizing"]]);
  });

  it("should be able to set isCancelingCategorization", async () => {
    const commit = jest.fn();
    const wrapper = (actions: any) =>
      actions.setIsCancelingCategorization({ commit });
    await wrapper(QiitaModule.actions);

    expect(commit.mock.calls).toEqual([["setIsCancelingCategorization"]]);
  });

  it("should be able to categorize", async () => {
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

  it("should be able to categorize", async () => {
    const mockAxios: any = axios;
    mockAxios.delete.mockResolvedValue({});
    const commit = jest.fn();

    const categorizedStockId = 1;
    const wrapper = (actions: any) =>
      actions.cancelCategorization({ commit }, categorizedStockId);
    await wrapper(QiitaModule.actions);

    expect(commit.mock.calls).toEqual([
      ["removeCategorizedStocksById", categorizedStockId]
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
      ["resetData"],
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

    expect(commit.mock.calls).toEqual([["saveDisplayCategoryId", categoryId]]);
  });
});
