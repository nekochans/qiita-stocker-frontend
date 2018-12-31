import {
  ICategory,
  IPage,
  IUncategorizedStock,
  ICategorizedStock
} from "@/domain/qiita";

export interface IQiitaState {
  authorizationCode: string;
  accessToken: string;
  qiitaAccountId: string;
  permanentId: string;
  sessionId: string;
  categories: ICategory[];
  stocks: IUncategorizedStock[];
  categorizedStocks: ICategorizedStock[];
  currentPage: number;
  paging: IPage[];
  isCategorizing: boolean;
  isLoading: boolean;
}
