import { ICategory, IPage, IUncategorizedStock } from "@/domain/qiita";

export interface IQiitaState {
  authorizationCode: string;
  accessToken: string;
  qiitaAccountId: string;
  permanentId: string;
  sessionId: string;
  categories: ICategory[];
  stocks: IUncategorizedStock[];
  paging: IPage[];
  isCategorizing: boolean;
}
