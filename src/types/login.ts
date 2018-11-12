export interface LoginState {
  authorizationCode: string;
  accessToken: string;
  permanentId: string;
  isLoggedIn: boolean;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
}
