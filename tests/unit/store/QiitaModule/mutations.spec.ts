import { IQiitaState } from "@/types/qiita";
import { QiitaModule } from "@/store/modules/qiita";
import {
  ICategorizedStock,
  ICategory,
  IPage,
  IUncategorizedStock
} from "@/domain/qiita";

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
      isCancelingCategorization: false,
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
    const wrapper = (mutations: any) => mutations.addCategory(state, category);
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

  it("should be able to update stock category name", () => {
    state.stocks = [
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

    const changedCategory = { categoryId: 1, name: "changedCategoryName" };
    const wrapper = (mutations: any) =>
      mutations.updateStockCategoryName(state, changedCategory);
    wrapper(QiitaModule.mutations);

    expect(state.stocks[0].category).toEqual(changedCategory);
  });

  it("should be able to remove category from stock", () => {
    state.stocks = [
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

    const wrapper = (mutations: any) =>
      mutations.removeCategoryFromStock(state, 1);
    wrapper(QiitaModule.mutations);

    expect(state.stocks[0].category).toEqual(undefined);
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

  it("should be able to remove categorized stocks by id", () => {
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
    const id = 1;

    state.categorizedStocks = categorizedStocks;
    const wrapper = (mutations: any) =>
      mutations.removeCategorizedStocksById(state, id);
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

  it("should be able to save isCancelingCategorization", () => {
    const wrapper = (mutations: any) =>
      mutations.setIsCancelingCategorization(state);
    wrapper(QiitaModule.mutations);
    expect(state.isCancelingCategorization).toEqual(true);
  });

  it("should be able to reset data", () => {
    const wrapper = (mutations: any) => mutations.resetData(state);
    wrapper(QiitaModule.mutations);
    expect(state.isCategorizing).toEqual(false);
    expect(state.isCancelingCategorization).toEqual(false);
    expect(state.displayCategoryId).toEqual(0);
    expect(state.currentPage).toEqual(1);
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
