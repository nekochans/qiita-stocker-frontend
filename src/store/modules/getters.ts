import { GetterTree } from "vuex";
import { IQiitaState } from "@/types/qiita";
import { RootState } from "@/store";
import { IPage } from "@/domain/qiita";

export const getters: GetterTree<IQiitaState, RootState> = {
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
  displayCategories: (state): IQiitaState["categories"] => {
    return state.categories.filter(
      category => category.categoryId !== state.displayCategoryId
    );
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
  isCancelingCategorization: (
    state
  ): IQiitaState["isCancelingCategorization"] => {
    return state.isCancelingCategorization;
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
    }
    return { page: 0, perPage: 0, relation: "" };
  },
  prevPage: (state): IPage => {
    const page: IPage | undefined = state.paging.find(page => {
      return page.relation === "prev";
    });

    if (page !== undefined) {
      return page;
    }
    return { page: 0, perPage: 0, relation: "" };
  },
  nextPage: (state): IPage => {
    const page: IPage | undefined = state.paging.find(page => {
      return page.relation === "next";
    });

    if (page !== undefined) {
      return page;
    }
    return { page: 0, perPage: 0, relation: "" };
  },
  lastPage: (state): IPage => {
    const page: IPage | undefined = state.paging.find(page => {
      return page.relation === "last";
    });

    if (page !== undefined) {
      return page;
    }
    return { page: 0, perPage: 0, relation: "" };
  }
};
