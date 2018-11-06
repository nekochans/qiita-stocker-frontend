import { AxiosResponse, AxiosError } from "axios";
import QiitaStockerApi from "@/infrastructure/api/qiitaStockerApi";
import QiitaApi from "@/infrastructure/api/qiitaApi";

export const STORAGE_KEY_AUTH_STATE = "authorizationState";
export const STORAGE_KEY_ACCOUNT_ACTION = "accountAction";
export const STORAGE_KEY_SESSION_ID = "sessionId";

const qiitaStockerApi = new QiitaStockerApi();
const qiitaApi = new QiitaApi();

export interface IQiitaStockerSessionStorage {
  save(key: string, value: string): void;
  load(key: string): any;
  remove(key: string): void;
}

export interface IQiitaStockerApi {
  createAccount(
    request: ICreateAccountRequest
  ): Promise<ICreateAccountResponse>;
  cancelAccount(request: ICancelAccountRequest): Promise<void>;
  issueLoginSession(
    request: IIssueLoginSessionRequest
  ): Promise<IIssueLoginSessionResponse>;
}

export interface IQiitaApi {
  issueAccessToken(
    request: IIssueAccessTokensRequest
  ): Promise<IIssueAccessTokensResponse>;
  fetchAuthenticatedUser(
    request: IFetchAuthenticatedUserRequest
  ): Promise<IFetchAuthenticatedUserResponse>;
}

export interface IAuthorizationRequest {
  clientId: string;
  state: string;
}

export interface IAuthorizationResponse {
  code: string;
  callbackState: string;
  localState?: string;
}

export interface IIssueAccessTokensRequest {
  client_id: string;
  client_secret: string;
  code: string;
}

export interface IIssueAccessTokensResponse {
  client_id: string;
  scopes: string[];
  token: string;
}

export interface IFetchAuthenticatedUserRequest {
  accessToken: string;
}

export interface IFetchAuthenticatedUserResponse {
  permanent_id: string;
}

export interface ICreateAccountRequest {
  apiUrlBase: string;
  permanentId: string;
  accessToken: string;
}

export interface ICreateAccountResponse {
  accountId: string;
  _embedded: { sessionId: string };
}

export interface IIssueLoginSessionRequest {
  apiUrlBase: string;
  permanentId: string;
  accessToken: string;
}

export interface IIssueLoginSessionResponse {
  sessionId: string;
}

export interface ICancelAccountRequest {
  apiUrlBase: string;
  sessionId: string;
}

interface IQiitaStockerErrorData {
  code: number;
  message: string;
}

export interface IQiitaStockerError extends AxiosError {
  response: AxiosResponse<IQiitaStockerErrorData>;
}

// TODO 適切な値に修正する
export interface ICategory {
  id: number;
  name: string;
}

export const requestToAuthorizationServer = (
  authorizationRequest: IAuthorizationRequest
) => {
  location.href = `http://qiita.com/api/v2/oauth/authorize?client_id=${
    authorizationRequest.clientId
  }&scope=read_qiita&state=${authorizationRequest.state}`;
};

export const issueAccessToken = async (
  request: IIssueAccessTokensRequest
): Promise<IIssueAccessTokensResponse> => {
  return await qiitaApi.issueAccessToken(request);
};

export const fetchAuthenticatedUser = async (
  request: IFetchAuthenticatedUserRequest
): Promise<IFetchAuthenticatedUserResponse> => {
  return await qiitaApi.fetchAuthenticatedUser(request);
};

export const createAccount = async (
  request: ICreateAccountRequest
): Promise<ICreateAccountResponse> => {
  return await qiitaStockerApi.createAccount(request);
};

export const issueLoginSession = async (
  request: IIssueLoginSessionRequest
): Promise<IIssueLoginSessionResponse> => {
  return await qiitaStockerApi.issueLoginSession(request);
};

export const cancelAccount = async (
  request: ICancelAccountRequest
): Promise<void> => {
  return await qiitaStockerApi.cancelAccount(request);
};

export const matchState = (responseState: string, state: string): boolean => {
  if (responseState !== state) {
    return false;
  }
  return true;
};

export const stateNotMatchedMessage = (): string => {
  return "不正なリクエストが行われました。再度、ホーム画面よりやり直してください。";
};

export const unauthorizedMessage = (): string => {
  return "認証に失敗しました。再度、ホーム画面よりやり直してください。";
};
