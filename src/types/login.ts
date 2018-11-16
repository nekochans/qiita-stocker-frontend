import { ICategory} from "@/domain/Qiita";

export interface ILoginState {
  authorizationCode: string;
  accessToken: string;
  permanentId: string;
  isLoggedIn: boolean;
  categories: ICategory[];
}
