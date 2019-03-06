import { IQiitaState } from "@/types/qiita";
import { STORAGE_KEY_SESSION_ID } from "@/domain/qiita";
import LocalStorageFactory from "@/factory/repository/LocalStorageFactory";
const localStorage = LocalStorageFactory.create();

export const state: IQiitaState = {
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
  isCancelingCategorization: false,
  isLoading: true
};
