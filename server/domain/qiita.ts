import QiitaStockerApiFactory from '../factroy/api/qiitaStockerApiFactory'
import { apiUrlBase } from '../constants/envConstant'

const qiitaStockerApi = QiitaStockerApiFactory.create()

export type CancelAccountRequest = {
  apiUrlBase: string
  sessionId: string
}
export type LogoutRequest = {
  apiUrlBase: string
  sessionId: string
}

export const cancelAccount = (sessionId: string): Promise<void> => {
  const cancelAccountRequest: CancelAccountRequest = {
    apiUrlBase: apiUrlBase(),
    sessionId
  }

  return qiitaStockerApi.cancelAccount(cancelAccountRequest)
}

export const logout = (sessionId: string): Promise<void> => {
  const logoutRequest: LogoutRequest = {
    apiUrlBase: apiUrlBase(),
    sessionId
  }

  return qiitaStockerApi.logout(logoutRequest)
}
