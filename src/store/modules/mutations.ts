import { MutationTree } from "vuex";
import { IQiitaState } from "@/types/qiita";
import {
  ICategorizedStock,
  ICategory,
  IPage,
  IUncategorizedStock
} from "@/domain/qiita";

export const mutations: MutationTree<IQiitaState> = {
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
  updateStockCategory: (
    state,
    payload: { stockArticleIds: string[]; category: ICategory }
  ) => {
    state.stocks.map(stock => {
      if (payload.stockArticleIds.includes(stock.article_id)) {
        stock.category = payload.category;
      }
    });
  },
  updateStockCategoryName: (state, category: ICategory) => {
    state.stocks.map(stock => {
      if (stock.category && stock.category.categoryId === category.categoryId) {
        stock.category = category;
      }
    });
  },
  removeCategoryFromStock: (state, categoryId: number) => {
    state.stocks.map(stock => {
      if (stock.category && stock.category.categoryId == categoryId) {
        stock.category = undefined;
      }
    });
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
  removeCategorizedStocksById: (state, id: number) => {
    state.categorizedStocks = state.categorizedStocks.filter(
      categorizedStock => categorizedStock.id !== id
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
  setIsCancelingCategorization: state => {
    state.isCancelingCategorization = !state.isCancelingCategorization;
  },
  resetData: state => {
    state.isCategorizing = false;
    state.isCancelingCategorization = false;
    state.displayCategoryId = 0;
    state.currentPage = 1;
  },
  setIsLoading: (state, isLoading: boolean) => {
    state.isLoading = isLoading;
  },
  checkStock: (state, { stock, isChecked }) => {
    stock.isChecked = isChecked;
  },
  checkCategorizedStock: (state, { stock, isChecked }) => {
    stock.isChecked = isChecked;
  },
  uncheckStock: state => {
    state.stocks
      .filter(stock => stock.isChecked)
      .map(stock => (stock.isChecked = !stock.isChecked));
  }
};
