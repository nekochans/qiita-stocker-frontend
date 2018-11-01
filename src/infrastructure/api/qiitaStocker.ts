import axios, { AxiosResponse } from "axios";
import {
  ICreateAccountRequest,
  ICreateAccountResponse,
  IIssueLoginSessionRequest,
  IIssueLoginSessionResponse,
  IQiitaStockerError,
  ICancelAccountRequest
} from "@/domain/Qiita";

export const QiitaStockerAPI = {
  createAccount: async (
    request: ICreateAccountRequest
  ): Promise<ICreateAccountResponse> => {
    return await axios
      .post<ICreateAccountResponse>(
        `${request.apiUrlBase}/api/accounts`,
        request,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  },
  cancelAccount: async (request: ICancelAccountRequest): Promise<void> => {
    return await axios
      .delete(`${request.apiUrlBase}/api/accounts`, {
        headers: {
          Authorization: `Bearer ${request.sessionId}`
        }
      })
      .then(() => {
        return Promise.resolve();
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  },
  issueLoginSession: async (
    request: IIssueLoginSessionRequest
  ): Promise<IIssueLoginSessionResponse> => {
    return await axios
      .post<IIssueLoginSessionResponse>(
        `${request.apiUrlBase}/api/login-sessions`,
        request,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data);
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError);
      });
  }
};
