export interface ILoginState {
  authorizationCode: string;
  accessToken: string;
  permanentId: string;
  isLoggedIn: boolean;
  categories: ICategory[];
}

export interface ICategory {
  id: string;
  name: string;
}
