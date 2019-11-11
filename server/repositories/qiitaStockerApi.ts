import axios, { AxiosResponse } from 'axios'
import { Api } from '../domain/qiitaStockerApiInterface'
import {
  CreateAccountRequest,
  CreateAccountResponse,
  QiitaStockerError,
  IssueLoginSessionRequest,
  IssueLoginSessionResponse
} from '../domain/auth'
import { CancelAccountRequest, LogoutRequest } from '../domain/qiita'

export default class QiitaStockerApi implements Api {
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    return axios
      .post<CreateAccountResponse>(
        `${request.apiUrlBase}/api/accounts`,
        {
          qiitaAccountId: request.qiitaAccountId,
          permanentId: request.permanentId,
          accessToken: request.accessToken
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError)
      })
  }

  issueLoginSession(
    request: IssueLoginSessionRequest
  ): Promise<IssueLoginSessionResponse> {
    return axios
      .post<IssueLoginSessionResponse>(
        `${request.apiUrlBase}/api/login-sessions`,
        {
          qiitaAccountId: request.qiitaAccountId,
          permanentId: request.permanentId,
          accessToken: request.accessToken
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError)
      })
  }

  cancelAccount(request: CancelAccountRequest): Promise<void> {
    return axios
      .delete(`${request.apiUrlBase}/api/accounts`, {
        headers: {
          Authorization: `Bearer ${request.sessionId}`
        }
      })
      .then(() => {
        return Promise.resolve()
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError)
      })
  }

  logout(request: LogoutRequest): Promise<void> {
    return axios
      .delete(`${request.apiUrlBase}/api/login-sessions`, {
        headers: {
          Authorization: `Bearer ${request.sessionId}`
        }
      })
      .then(() => {
        return Promise.resolve()
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError)
      })
  }
}
