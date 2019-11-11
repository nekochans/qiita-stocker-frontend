import {
  FetchAuthenticatedUserRequest,
  FetchAuthenticatedUserResponse,
  IssueAccessTokensRequest,
  IssueAccessTokensResponse
} from './auth'

export type Api = {
  issueAccessToken(
    request: IssueAccessTokensRequest
  ): Promise<IssueAccessTokensResponse>
  fetchAuthenticatedUser(
    request: FetchAuthenticatedUserRequest
  ): Promise<FetchAuthenticatedUserResponse>
}
