import { ICategory} from "@/domain/qiita";

export interface IQiitaState {
  authorizationCode: string;
  accessToken: string;
  permanentId: string;
  isLoggedIn: boolean;
  categories: ICategory[];
}
