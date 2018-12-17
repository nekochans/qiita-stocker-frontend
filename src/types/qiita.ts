import { ICategory } from "@/domain/qiita";

export interface IQiitaState {
  authorizationCode: string;
  accessToken: string;
  qiitaAccountId: string;
  permanentId: string;
  sessionId: string;
  categories: ICategory[];
}
