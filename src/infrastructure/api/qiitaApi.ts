import axios, { AxiosResponse, AxiosError } from "axios";
import {
  IQiitaApi,
  IIssueAccessTokensRequest,
  IIssueAccessTokensResponse,
  IFetchAuthenticatedUserResponse,
  IFetchAuthenticatedUserRequest
} from "@/domain/qiita";

export default class QiitaApi implements IQiitaApi {
  async issueAccessToken(
    request: IIssueAccessTokensRequest
  ): Promise<IIssueAccessTokensResponse> {
    return await axios
      .post<IIssueAccessTokensResponse>(
        `https://qiita.com/api/v2/access_tokens`,
        request
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: AxiosError) => {
        return Promise.reject(axiosError);
      });
  }

  async fetchAuthenticatedUser(
    request: IFetchAuthenticatedUserRequest
  ): Promise<IFetchAuthenticatedUserResponse> {
    return await axios
      .get<IFetchAuthenticatedUserResponse>(
        `https://qiita.com/api/v2/authenticated_user`,
        {
          headers: { Authorization: `Bearer ${request.accessToken}` }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: AxiosError) => {
        return Promise.reject(axiosError);
      });
  }
}
