import { QiitaAPI } from "@/api/qiita";

const clientId: any = process.env.VUE_APP_QIITA_CLIENT_ID;
const clientSecret: any = process.env.VUE_APP_QIITA_CLIENT_SECRET;

export interface IFetchAccessTokensRequest {
  client_id: string;
  client_secret: string;
  code: string;
}

export interface IFetchAccessTokensResponse {
  client_id: string;
  scopes: string[];
  token: string;
}

export const requestToAuthorizationServer = () => {
  location.href = `http://qiita.com/api/v2/oauth/authorize?client_id=${clientId}&scope=read_qiita`;
};

export const fetchAccessTokens = async (
  authorizationCode: string
): Promise<IFetchAccessTokensResponse> => {
  const request: IFetchAccessTokensRequest = {
    client_id: clientId,
    client_secret: clientSecret,
    code: authorizationCode
  };

  return await QiitaAPI.fetchAccessTokens(request);
};
