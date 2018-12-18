import { ICategory, IPage, IStock } from "@/domain/qiita";

export interface IQiitaState {
  authorizationCode: string;
  accessToken: string;
  qiitaAccountId: string;
  permanentId: string;
  sessionId: string;
  categories: ICategory[];
  stocks: IStock[];
  paging: IPage[];
}
