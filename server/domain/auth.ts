import url from 'url'
import uuid from 'uuid'
import { AxiosResponse, AxiosError } from 'axios'
import QiitaApiFactory from '../factroy/api/qiitaApiFactory'
import QiitaStockerApiFactory from '../factroy/api/qiitaStockerApiFactory'
import {
  clientId,
  clientSecret,
  apiUrlBase,
  appUrl
} from '../constants/envConstant'

const qiitaApi = QiitaApiFactory.create()
const qiitaStockerApi = QiitaStockerApiFactory.create()

export const COOKIE_AUTH_STATE = 'authorizationState'
export const COOKIE_ACCOUNT_ACTION = 'accountAction'
export const COOKIE_SESSION_ID = 'sessionId'
export type accountAction = 'signUp' | 'login'

type QiitaStockerErrorData = {
  code: number
  message: string
}

export type QiitaStockerError = AxiosError & {
  response: AxiosResponse<QiitaStockerErrorData>
}

export type IssueAccessTokensRequest = {
  client_id: string
  client_secret: string
  code: string
}

export type IssueAccessTokensResponse = {
  client_id: string
  scopes: string[]
  token: string
}

export type FetchAuthenticatedUserRequest = {
  accessToken: string
}

export type FetchAuthenticatedUserResponse = {
  id: string
  permanent_id: string
}

export type CreateAccountRequest = {
  apiUrlBase: string
  qiitaAccountId: string
  permanentId: string
  accessToken: string
}

export type CreateAccountResponse = {
  accountId: string
  _embedded: { sessionId: string }
}

export type IssueLoginSessionRequest = {
  apiUrlBase: string
  qiitaAccountId: string
  permanentId: string
  accessToken: string
}

export type IssueLoginSessionResponse = {
  sessionId: string
}

/**
 * @return {string}
 */
export const createAuthorizationState = (): string => {
  return uuid.v4()
}

/**
 * @param authorizationState
 * @return {string}
 */
export const createAuthorizationUrl = (authorizationState: string): string => {
  return url.format({
    protocol: 'https',
    host: 'qiita.com',
    pathname: '/api/v2/oauth/authorize',
    query: {
      client_id: clientId(),
      scope: 'read_qiita',
      state: authorizationState
    }
  })
}

export const redirectAppUrl = (): string => {
  return `${appUrl()}/stocks/all`
}

export const redirectAppErrorUrl = (): string => {
  return `${appUrl()}/error`
}

/**
 * @param authorizationCode
 * @param accountAction
 * @return {Promise<string>}
 */
export const fetchSessionId = async (
  authorizationCode: string,
  accountAction: accountAction
): Promise<string> => {
  const issueAccessTokensRequest: IssueAccessTokensRequest = {
    client_id: clientId(),
    client_secret: clientSecret(),
    code: authorizationCode
  }

  const issueAccessTokenResponse = await qiitaApi.issueAccessToken(
    issueAccessTokensRequest
  )

  const fetchAuthenticatedUserRequest: FetchAuthenticatedUserRequest = {
    accessToken: issueAccessTokenResponse.token
  }

  const authenticatedUser = await qiitaApi.fetchAuthenticatedUser(
    fetchAuthenticatedUserRequest
  )

  let sessionId = ''

  switch (accountAction) {
    case 'signUp':
      sessionId = await createAccount(
        issueAccessTokenResponse.token,
        authenticatedUser
      )
      break
    case 'login':
      sessionId = await issueLoginSession(
        issueAccessTokenResponse.token,
        authenticatedUser
      )
      break
    default:
      const _: never = accountAction
      sessionId = _
      break
  }
  return sessionId
}

const createAccount = async (
  token: string,
  authenticatedUser: FetchAuthenticatedUserResponse
): Promise<string> => {
  const createAccountRequest: CreateAccountRequest = {
    apiUrlBase: apiUrlBase(),
    qiitaAccountId: authenticatedUser.id,
    permanentId: authenticatedUser.permanent_id,
    accessToken: token
  }

  const createAccountResponse = await qiitaStockerApi.createAccount(
    createAccountRequest
  )

  return createAccountResponse._embedded.sessionId
}

const issueLoginSession = async (
  token: string,
  authenticatedUser: FetchAuthenticatedUserResponse
): Promise<string> => {
  const issueLoginSessionRequest: IssueLoginSessionRequest = {
    apiUrlBase: apiUrlBase(),
    qiitaAccountId: authenticatedUser.id,
    permanentId: authenticatedUser.permanent_id,
    accessToken: token
  }

  const issueLoginSessionResponse = await qiitaStockerApi.issueLoginSession(
    issueLoginSessionRequest
  )
  return issueLoginSessionResponse.sessionId
}
