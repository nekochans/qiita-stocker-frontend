import axios, { AxiosResponse, AxiosError } from "axios";
import { ICreateAccountRequest, ICreateAccountResponse } from "@/domain/Qiita";

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
            // "application/json"を指定すると以下のエラーとなるので、いったん"application/x-www-form-urlencoded"を指定する
            // Response to preflight request doesn't pass access control check
            // "Content-Type": "application/json"
            "Content-Type": "application/x-www-form-urlencoded"
          }
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
