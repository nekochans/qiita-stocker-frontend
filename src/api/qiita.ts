import axios, { AxiosResponse, AxiosError } from "axios";
import {
  IIssueAccessTokensRequest,
  IIssueAccessTokensResponse
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
  }
};
