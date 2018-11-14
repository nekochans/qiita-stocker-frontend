export interface ILoginState {
  authorizationCode: string;
  accessToken: string;
  permanentId: string;
  isLoggedIn: boolean;
  categories: ICategory[];
}

export interface ICategory {
  categoryId: number;
  name: string;
}
