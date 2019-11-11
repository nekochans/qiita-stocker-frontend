import axios, { AxiosResponse, AxiosError } from 'axios'
import { Api } from '../domain/qiitaApiInterface'
import {
  IssueAccessTokensRequest,
  IssueAccessTokensResponse,
  FetchAuthenticatedUserResponse,
  FetchAuthenticatedUserRequest
} from '../domain/auth'

export default class QiitaApi implements Api {
  /**
   * @param request
   * @return {Promise<any | never>}
   */
  issueAccessToken(
    request: IssueAccessTokensRequest
  ): Promise<IssueAccessTokensResponse> {
    return axios
      .post<IssueAccessTokensResponse>(
        `https://qiita.com/api/v2/access_tokens`,
        request
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      })
  }

  /**
   * @param request
   * @return {Promise<any | never>}
   */
  fetchAuthenticatedUser(
    request: FetchAuthenticatedUserRequest
  ): Promise<FetchAuthenticatedUserResponse> {
    return axios
      .get<FetchAuthenticatedUserResponse>(
        `https://qiita.com/api/v2/authenticated_user`,
        {
          headers: { Authorization: `Bearer ${request.accessToken}` }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      })
  }
}
