import { IQiitaState } from "@/types/qiita";
import { ICategorizedStock, IPage, IUncategorizedStock } from "@/domain/qiita";
import { QiitaModule } from "@/store/modules/qiita";

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
      isCancelingCategorization: false,
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
    const categories: IQiitaState["categories"] = wrapper(QiitaModule.getters);

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

  it("should be able to get isCancelingCategorization", () => {
    const wrapper = (getters: any) => getters.isCancelingCategorization(state);
    const isCancelingCategorization: IQiitaState["isCancelingCategorization"] = wrapper(
      QiitaModule.getters
    );

    expect(isCancelingCategorization).toEqual(state.isCancelingCategorization);
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
