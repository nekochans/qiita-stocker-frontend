import axios, { AxiosResponse, AxiosError } from "axios";
import {
  IFetchAccessTokensRequest,
  IFetchAccessTokensResponse
} from "@/domain/Qiita";

export const QiitaAPI = {
  fetchAccessTokens: async (
    request: IFetchAccessTokensRequest
  ): Promise<IFetchAccessTokensResponse> => {
    return await axios
      .post<IFetchAccessTokensResponse>(
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
