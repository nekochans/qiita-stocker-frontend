import { ICategory} from "@/domain/Qiita";

export interface IQiitaState {
  authorizationCode: string;
  accessToken: string;
  permanentId: string;
  isLoggedIn: boolean;
  categories: ICategory[];
}
