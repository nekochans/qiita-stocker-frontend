import axios, { AxiosResponse, AxiosError } from "axios";
import {
  IIssueAccessTokensRequest,
  IIssueAccessTokensResponse,
  IFetchAuthenticatedUserResponse,
  IFetchAuthenticatedUserRequest
} from "@/domain/Qiita";

export const QiitaAPI = {
  issueAccessToken: async (
    request: IIssueAccessTokensRequest
  ): Promise<IIssueAccessTokensResponse> => {
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
  },
  fetchAuthenticatedUser: async (
    request: IFetchAuthenticatedUserRequest
  ): Promise<IFetchAuthenticatedUserResponse> => {
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
};
