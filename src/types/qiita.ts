import { ICategory, IPage, IUncategorizedStock } from "@/domain/qiita";

export interface IQiitaState {
  authorizationCode: string;
  accessToken: string;
  qiitaAccountId: string;
  permanentId: string;
  sessionId: string;
  categories: ICategory[];
  stocks: IUncategorizedStock[];
  currentPage: number;
  paging: IPage[];
  isCategorizing: boolean;
  isLoading: boolean;
}
